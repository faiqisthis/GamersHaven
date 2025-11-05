import React, { useContext, useState, useEffect } from "react";
import { FaGamepad, FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser, updateCart } from "../context/user/UserActions";
import { createOrder } from "../context/orders/OrdersActions";
import UserContext from "../context/user/UserContext";
import OrderSummary from "../components/OrderSummary";
import OrdersContext from "../context/orders/OrdersContext";

// Stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

const CheckoutPage = () => {
  const { user, userDispatch } = useContext(UserContext);
  const {ordersDispatch}=useContext(OrdersContext)
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
    (user?.cart?.items?.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) || 0).toFixed(2)
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
      alert("Please fill all the required fields in Contact Form");
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
        alert("Please fill all the required fields in Billing Form");
        return false;
      }
    }
    if (cart === null || cart === undefined || !cart.items || cart.items.length === 0) {
      alert("Your cart is empty");
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
      newCart = newCart.filter((item) => !cart.items.some((orderedItem) => orderedItem.productId === item.productId._id));
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
        alert("Order submitted successfully");
        navigate("/");
      }
    } else {
      alert("Failed to submit order");
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

      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/stripe/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountCents, currency: "usd" }),
      });

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
        provider = 'mock';
        finalStatus = 'succeeded';
        paymentIntentId = 'mock_intent';
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
        provider = 'stripe';
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
        paymentStatus: finalStatus || 'succeeded',
        paymentReference: paymentIntentId,
        paymentProvider: provider || 'stripe',
        paidAt: finalStatus === 'succeeded' ? new Date().toISOString() : undefined,
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
        newCart = newCart.filter((item) => !cart.items.some((orderedItem) => orderedItem.productId === item.productId._id));
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
          alert("Order submitted successfully");
          navigate("/");
        }
      } else {
        alert("Failed to submit order");
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
                  color: "#ffffff",
                  fontSize: "16px",
                  "::placeholder": { color: "#bfbfbf" },
                  iconColor: "#ffffff",
                },
                invalid: {
                  color: "#ff4d4f",
                },
              },
            }}
          />
        </div>
        <div>{status}</div>
        <button type="submit" className="w-full mt-2 btn btn-primary text-black py-3 rounded-md" disabled={!stripe}>
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
    <div className="min-h-screen">
      {/* Navbar */}
      <div className="navbar bg-black">
        <div className="flex-1">
          <div className="flex items-center space-y-4 md:space-y-0 space-x-2 mb-4 md:mb-0 ml-4 lg:ml-[135px] md:ml-[35px]">
            <FaGamepad title="Gamepad" className=" text-2xl mt-4 md:mt-0" />
            <Link to="/" className=" md:text-xl text-lg font-bold">
              Gamer's Haven
            </Link>
          </div>
        </div>
        <div className="flex-none">
          <Link to={user ? `/user/${user._id}/cart` : "/"}>
            <FaShoppingBag size={25} className="mr-2" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col-reverse md:flex-row md:justify-between p-4 md:p-8">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 lg:ml-[100px] p-4 rounded-md shadow-md mb-10">
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <div className="space-y-4">
            {/* Delivery Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Delivery Address</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={firstName}
                  className="border rounded-md input input-primary"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  className="border rounded-md input input-primary"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <input
                type="text"
                value={apartment}
                className="w-full border rounded-md input mt-4 input-primary"
                placeholder="Apartment, suite, etc."
                onChange={(e) => setApartment(e.target.value)}
              />
              <input
                type="text"
                value={nearestLandmark}
                className="w-full border rounded-md input mt-4 input-primary"
                placeholder="Nearest Landmark (optional)"
                onChange={(e) => setNearestLandmark(e.target.value)}
              />
              <input
                type="text"
                value={city}
                className="w-full border rounded-md input mt-4 input-primary"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                value={postalCode}
                className="w-full border rounded-md input mt-4 input-primary"
                placeholder="Postal Code"
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <input
                type="text"
                value={phone}
                className="w-full border rounded-md input mt-4 input-primary"
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
              <label className="block bg-black p-3 rounded-md shadow-sm cursor-pointer">
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
              <label className="block bg-black p-3 rounded-md shadow-sm cursor-pointer">
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
            <h2 className="text-xl font-semibold mt-6 mb-4">Billing Address</h2>
            <div className="">
              <label className="block bg-black p-3 rounded-md shadow-sm cursor-pointer mb-4">
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
              <label className="block bg-black p-3 rounded-md shadow-sm cursor-pointer">
                <input
                  type="radio"
                  name="billing"
                  value="different"
                  className="mr-2"
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
                    className=" overflow-hidden rounded-md shadow-md bg-black"
                  >
                    <div className="space-y-4 mt-3 mb-3 flex flex-col items-center ">
                      <input
                        type="text"
                        value={fullName}
                        placeholder="Full Name"
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-[95%] input border input-secondary rounded-md"
                      />
                      <input
                        type="text"
                        value={billingaddress}
                        placeholder="Address"
                        onChange={(e) => setBillingaddress(e.target.value)}
                        className="w-[95%] input border input-secondary rounded-md"
                      />

                      <div className="w-[95%] flex gap-4">
                        <input
                          type="text"
                          value={billingCity}
                          placeholder="City"
                          onChange={(e) => setBillingCity(e.target.value)}
                          className="flex-1 input border input-secondary rounded-md"
                        />
                        <input
                          type="text"
                          value={billingPostalCode}
                          placeholder="Postal Code"
                          onChange={(e) => setBillingPostalCode(e.target.value)}
                          className="flex-1 input border input-secondary rounded-md"
                        />
                      </div>

                      <input
                        type="text"
                        value={billingPhone}
                        placeholder="Phone Number"
                        onChange={(e) => setBillingPhone(e.target.value)}
                        className="w-[95%] input border input-secondary rounded-md"
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
              <button onClick={handleCODSubmit} className="w-full mt-6 btn btn-primary  text-black py-3 rounded-md">
                Pay now
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Order Summary for Mobile */}
        <div onClick={() => setContentShow(!contentShow)} className="collapse collapse-arrow bg-base-200 md:hidden">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            {!contentShow ? "Click to View Order Summary" : "Click to Hide Order Summary"}
          </div>
          <div className="collapse-content">
            {contentShow && <OrderSummary cartItems={user?.cart?.items || []} subtotal={`$ ${subtotal}`} />}
          </div>
        </div>

        {/* Order Summary for Desktop */}
        <div className="hidden md:block w-full md:w-1/2">
          <OrderSummary cartItems={user?.cart?.items || []} subtotal={`$ ${subtotal}`} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
