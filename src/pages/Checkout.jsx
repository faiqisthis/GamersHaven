import React, { useContext, useState, useEffect } from "react";
import { FaGamepad, FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser, submitOrder, updateCart } from "../context/user/UserActions";
import UserContext from "../context/user/UserContext";
import OrderSummary from "../components/OrderSummary";

const CheckoutPage = () => {
  const { user, userDispatch } = useContext(UserContext);
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
  const navigate=useNavigate()
  let tempCart;
  useEffect(() => {
    user?.cart &&
      (tempCart = user.cart.items.map((item) => {
        return {
          productId: item.productId._id,
          quantity: item.quantity,
        };
      }));
    setCart({
      items: tempCart,
      subtotal,
    });

    user?.email && setEmail(user.email);
    user?.id && setUserId(user._id);
  }, [user?.cart, user?.email, user?.id]);

  const handleCheckoutSubmit = async () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      apartment.trim() === "" ||
      city.trim() === "" ||
      postalCode.trim() === "" ||
      phone.trim() === ""
    ) {
      alert("Please fill all the required fields in Contact Form");
    
      return;
    } else if (billingAddress === "different") {
      if (
        fullName.trim() === "" ||
        billingaddress.trim() === "" ||
        billingCity.trim() === "" ||
        billingPostalCode.trim() === "" ||
        billingPhone.trim() === ""
      ) {
        alert("Please fill all the required fields in Billing Form");
        
        return;
      }
    } else if (cart === null || cart === undefined) {
      alert("Your cart is empty");
      
      return;
    }

    // Construct the data object
    const data = {
      userId,
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

    const response=await submitOrder(data)
    if(response.success){
      let newCart=user.cart.items
      newCart=newCart.filter(item=> !cart.items.some((orderedItem) => orderedItem.productId === item.productId._id))
      const newUser={
        ...user,
        cart:{
          items:newCart
        }
      }
      userDispatch({
        type: "SET_USER",
        payload: newUser
      })
      const response=await updateCart(newCart)
      if(response.success){
        alert("Order submitted successfully");
        navigate('/')
      }
    }
  };

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
  }, []);

  // Calculate subtotal
  const subtotal = parseFloat(
    user?.cart?.items
      .reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
      .toFixed(2)
  );

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
              <label className="block text-sm font-medium mb-1">
                Delivery Address
              </label>
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
                  defaultChecked
                />
                Cash on Delivery (COD)
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
            <button
              onClick={handleCheckoutSubmit}
              className="w-full mt-6 btn btn-primary  text-black py-3 rounded-md"
            >
              Pay now
            </button>
          </div>
        </div>

        {/* Collapsible Order Summary for Mobile */}
        <div
          onClick={() => setContentShow(!contentShow)}
          className="collapse collapse-arrow bg-base-200 md:hidden"
        >
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            {!contentShow
              ? "Click to View Order Summary"
              : "Click to Hide Order Summary"}
          </div>
          <div className="collapse-content">
            {contentShow && (
              <OrderSummary
                cartItems={user?.cart?.items || []}
                subtotal={`$ ${subtotal}`}
              />
            )}
          </div>
        </div>

        {/* Order Summary for Desktop */}
        <div className="hidden md:block w-full md:w-1/2">
          <OrderSummary
            cartItems={user?.cart?.items || []}
            subtotal={`$ ${subtotal}`}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
