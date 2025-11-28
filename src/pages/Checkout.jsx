import { useContext, useState, useEffect } from "react";
import { CreditCard, Truck, Lock, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser, updateCart } from "../context/user/UserActions";
import { createOrder } from "../context/orders/OrdersActions";
import UserContext from "../context/user/UserContext";
import OrderSummary from "../components/OrderSummary";
import OrdersContext from "../context/orders/OrdersContext";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { toast } from "react-hot-toast";

// Stripe imports
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

const CheckoutPage = () => {
  const { user, userDispatch } = useContext(UserContext);
  const { ordersDispatch } = useContext(OrdersContext);
  const [contentShow, setContentShow] = useState(false);
  const [billingAddress, setBillingAddress] = useState("same");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [apartment, setApartment] = useState("");
  const [nearestLandmark, setNearestLandmark] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [billingaddress, setBillingaddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingPostalCode, setBillingPostalCode] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [cart, setCart] = useState(user?.cart?.items);
  const [email, setEmail] = useState(user?.email);
  const [userId, setUserId] = useState(user?._id);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' or 'card'
  const navigate = useNavigate();
  let tempCart;

  // Calculate subtotal (moved above useEffect that uses it)
  const subtotal = parseFloat(
    (
      user?.cart?.items?.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
      ) || 0
    ).toFixed(2)
  );

  useEffect(() => {
    if (user?.cart?.items) {
      const items = user.cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));
      setCart({ items, subtotal });
    }
    user?.email && setEmail(user.email);
    user?._id && setUserId(user._id);
  }, [user]);

  const validateForms = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      apartment.trim() === "" ||
      city.trim() === "" ||
      postalCode.trim() === "" ||
      phone.trim() === ""
    ) {
   toast.error("Please fill all the required fields in Contact Form", { position: "top-center" });
      return false;
    }
    if (billingAddress === "different") {
      if (
        fullName.trim() === "" ||
        billingaddress.trim() === "" ||
        billingCity.trim() === "" ||
        billingPostalCode.trim() === "" ||
        billingPhone.trim() === ""
      ) {
toast.error("Please fill all the required fields in Billing Form", { position: "top-center" });
        return false;
      }
    }
    if (
      cart === null ||
      cart === undefined ||
      !cart.items ||
      cart.items.length === 0
    ) {
toast.error("Your cart is empty", { position: "top-center" });
      return false;
    }
    return true;
  };

  // existing COD flow (slightly refactored)
  const handleCODSubmit = async () => {
    if (!validateForms()) return;

    const data = {
      userId, // will be overridden by backend from auth
      firstName,
      lastName,
      apartment,
      nearestLandmark,
      city,
      postalCode,
      phone,
      email,
      subtotal,
      cart,
      paymentMethod: "cod",
      paymentStatus: "pending",
      paymentProvider: "cod",
      ...(billingAddress === "different" && {
        billingAddress: {
          fullName,
          address: billingaddress,
          city: billingCity,
          postalCode: billingPostalCode,
          phone: billingPhone,
          email,
        },
      }),
    };

    const response = await createOrder(ordersDispatch, data);
    if (response.success) {
      let newCart = user.cart.items;
      newCart = newCart.filter(
        (item) =>
          !cart.items.some(
            (orderedItem) => orderedItem.productId === item.productId._id
          )
      );
      const newUser = {
        ...user,
        cart: {
          items: newCart,
        },
      };
      userDispatch({
        type: "SET_USER",
        payload: newUser,
      });
      const updateResp = await updateCart(newCart);
      if (updateResp.success) {
     toast.success("Order submitted successfully", { position: "top-center" });
        navigate("/");
      }
    } else {
      toast.error("Failed to submit order", { position: "top-center" });
    }
  };

  // Card payment form component (uses Stripe Elements)
  function CardPaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [status, setStatus] = useState("");

    const handleCardPayment = async (e) => {
      e.preventDefault();
      if (!validateForms()) return;
      if (!stripe || !elements) {
        setStatus("Stripe not loaded");
        return;
      }
      setStatus("Creating payment intent...");

      // amount in cents
      const amountCents = Math.round(subtotal * 100);

      const resp = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/stripe/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amountCents, currency: "usd" }),
        }
      );

      const data = await resp.json();

      // if server returned a mock response (dev), treat as success
      const clientSecret = data?.clientSecret;
      if (!clientSecret) {
        setStatus(data?.error || "Failed to create payment intent");
        return;
      }

      let paymentIntentId = undefined;
      let finalStatus = undefined;
      let provider = undefined;

      if (data.mock || clientSecret === "mock_client_secret") {
        setStatus("Mock payment succeeded (dev)");
        provider = "mock";
        finalStatus = "succeeded";
        paymentIntentId = "mock_intent";
      } else {
        setStatus("Confirming card...");
        const card = elements.getElement(CardElement);
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card },
        });

        if (result.error) {
          setStatus(result.error.message);
          return;
        }
        if (result.paymentIntent?.status !== "succeeded") {
          setStatus("Payment not completed: " + result.paymentIntent?.status);
          return;
        }
        setStatus("Payment succeeded");
        provider = "stripe";
        finalStatus = result.paymentIntent?.status;
        paymentIntentId = result.paymentIntent?.id;
      }

      // build order payload and submit
      const orderData = {
        userId, // backend will use auth id
        firstName,
        lastName,
        apartment,
        nearestLandmark,
        city,
        postalCode,
        phone,
        email,
        subtotal,
        cart,
        paymentMethod: "card",
        paymentStatus: finalStatus || "succeeded",
        paymentReference: paymentIntentId,
        paymentProvider: provider || "stripe",
        paidAt:
          finalStatus === "succeeded" ? new Date().toISOString() : undefined,
        ...(billingAddress === "different" && {
          billingAddress: {
            fullName,
            address: billingaddress,
            city: billingCity,
            postalCode: billingPostalCode,
            phone: billingPhone,
            email,
          },
        }),
      };

      const response = await createOrder(ordersDispatch, orderData);
      if (response.success) {
        let newCart = user.cart.items;
        newCart = newCart.filter(
          (item) =>
            !cart.items.some(
              (orderedItem) => orderedItem.productId === item.productId._id
            )
        );
        const newUser = {
          ...user,
          cart: {
            items: newCart,
          },
        };
        userDispatch({
          type: "SET_USER",
          payload: newUser,
        });
        const updateResp = await updateCart(newCart);
        if (updateResp.success) {
        toast.success("Order submitted successfully", { position: "top-center" });
          navigate("/");
        }
      } else {
        toast.error("Failed to submit order", { position: "top-center" });
      }
    };

    return (
      <form onSubmit={handleCardPayment} className="space-y-4">
        <div className="p-4 border rounded-md">
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  color: "#000000",
                  fontSize: "16px",
                  "::placeholder": { color: "#bfbfbf" },
                  iconColor: "#000000",
                },
                invalid: {
                  color: "#ff4d4f",
                },
              },
            }}
          />
        </div>
        
        <button
          type="submit"
          className="w-full mt-2 btn btn-primary bg-black text-white py-3 rounded-md"
          disabled={!stripe}
        >
          Pay {subtotal ? `$${subtotal}` : ""}
        </button>
      </form>
    );
  }

  const handleBillingChange = (e) => {
    setBillingAddress(e.target.value);
  };

  useEffect(() => {
    const checkUser = async () => {
      if (localStorage.getItem("authToken") && user === null) {
        try {
          const response = await getCurrentUser();
          response &&
            userDispatch({
              type: "SET_USER",
              payload: response.data,
            });
        } catch (error) {
          console.log("Error fetching user: ", error);
        }
      }
    };
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="  bg-[#f0f1f2] border-b">
          <div className="max-w-[1440px] mx-auto  md:p-[64px] py-[48px] px-[20px]">
            <h1 className="text-[#0a0a0a] text-[24px] font-semibold">
              Checkout
            </h1>
            <p className="mt-2 text-[#8f9fbc]">
              Complete your purchase by providing the details below
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-[#f9f9f]">
        {/* Content */}
        <div className="flex flex-col-reverse md:flex-row md:justify-between  lg:p-[64px] gap-[30px] p-[20px] max-w-[1440px] mx-auto">
          {/* Left Side: Form */}
          <div className="w-full md:w-2/3 p-[20px] rounded-lg border ">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="h-6 w-6 text-primary" />
              <h2>Shipping Information</h2>
            </div>
            <div className="space-y-4">
              {/* Delivery Address */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex-col md:flex-row flex">

                  <input
                    type="text"
                    value={firstName}
                    className="px-2 py-2 rounded-lg w-full"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                    </div>
                  <input
                    type="text"
                    value={lastName}
                    className="px-2 py-2 rounded-lg w-full"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                    </div>
               
                <input
                  type="text"
                  value={apartment}
                  className="w-full px-2 py-2 rounded-lg"
                  placeholder="Apartment, suite, etc."
                  onChange={(e) => setApartment(e.target.value)}
                />
                <input
                  type="text"
                  value={nearestLandmark}
                  className="w-full px-2 py-2 rounded-lg"
                  placeholder="Nearest Landmark (optional)"
                  onChange={(e) => setNearestLandmark(e.target.value)}
                />
                <input
                  type="text"
                  value={city}
                  className="w-full px-2 py-2 rounded-lg"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  value={postalCode}
                  className="w-full px-2 py-2 rounded-lg"
                  placeholder="Postal Code"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <input
                  type="text"
                  value={phone}
                  className="w-full px-2 py-2 rounded-lg"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="mt-3">
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Email me with news and offers
                  </label>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
              <div className="space-y-4">
                <label className="block bg-white p-3 rounded-md shadow-sm cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    className="mr-2"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Cash on Delivery (COD)
                </label>
                <label className="block bg-white p-3 rounded-md shadow-sm cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    className="mr-2"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  Pay with Card
                </label>
              </div>

              {/* Billing Address */}
              <h2 className="text-xl font-semibold mt-6 mb-4">
                Billing Address
              </h2>
              <div className="">
                <label className="block bg-white p-3 rounded-md shadow-sm cursor-pointer mb-4">
                  <input
                    type="radio"
                    name="billing"
                    value="same"
                    className="mr-2"
                    checked={billingAddress === "same"}
                    onChange={handleBillingChange}
                  />
                  Same as shipping address
                </label>
                <label className="block bg-white p-3 rounded-md shadow-sm cursor-pointer">
                  <input
                    type="radio"
                    name="billing"
                    value="different"
                    className="mr-2 "
                    checked={billingAddress === "different"}
                    onChange={handleBillingChange}
                  />
                  Use a different billing address
                </label>

                {/* Conditionally Render Billing Address Form */}
                <AnimatePresence>
                  {billingAddress === "different" && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className=" overflow-hidden rounded-md shadow-md bg-whitw"
                    >
                      <div className=" flex flex-col items-center p-[20px] gap-[15px] ">
                        <input
                          type="text"
                          value={fullName}
                          placeholder="Full Name"
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full rounded-lg px-2 py-2"
                        />
                        <input
                          type="text"
                          value={billingaddress}
                          placeholder="Address"
                          onChange={(e) => setBillingaddress(e.target.value)}
                          className="w-full rounded-lg px-2 py-2"
                        />

                        <div className="w-full flex md:flex-row flex-col gap-4">
                          <input
                            type="text"
                            value={billingCity}
                            placeholder="City"
                            onChange={(e) => setBillingCity(e.target.value)}
                            className="flex-1 rounded-lg px-2 py-2"
                          />
                          <input
                            type="text"
                            value={billingPostalCode}
                            placeholder="Postal Code"
                            onChange={(e) =>
                              setBillingPostalCode(e.target.value)
                            }
                            className="flex-1 rounded-lg px-2 py-2"
                          />
                        </div>

                        <input
                          type="text"
                          value={billingPhone}
                          placeholder="Phone Number"
                          onChange={(e) => setBillingPhone(e.target.value)}
                          className="w-full rounded-lg px-2 py-2"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Payment UI: show card form when card selected, otherwise COD button */}
              {paymentMethod === "card" ? (
                <Elements stripe={stripePromise}>
                  <CardPaymentForm />
                </Elements>
              ) : (
                <button
                  onClick={handleCODSubmit}
                  className="w-full mt-6 btn btn-primary  text-white bg-black py-3 rounded-md"
                >
                  Pay now
                </button>
              )}
            </div>
          </div>

          {/* Collapsible Order Summary for Mobile */}
          <Accordion type="single" collapsible className="md:hidden w-full px-[10px] border rounded-lg">
  <AccordionItem value="order-summary">
    <AccordionTrigger className="text-lg font-semibold mb-4">
      Order Summary
    </AccordionTrigger>

    <AccordionContent>
      <OrderSummary
        cartItems={user?.cart?.items || []}
        subtotal={`$ ${subtotal}`}
      />
    </AccordionContent>
  </AccordionItem>
</Accordion>

          {/* Order Summary for Desktop */}
          <div className="hidden md:block w-full md:w-1/3">
            <OrderSummary
              cartItems={user?.cart?.items || []}
              subtotal={`$ ${subtotal}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
