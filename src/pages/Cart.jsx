import React, { useContext, useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import UserContext from "../context/user/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

function Cart() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    if (!user) {
      navigate("/signin", { state: { from: "/" } });
    }
    console.log("Inside cart use effect")
    if (user!==null && user.cart !== null) {
     
      let bill = 0;
      user.cart.items.forEach((item) => {
        bill += item.productId.price * item.quantity;
      });
      setSubtotal(bill);
    }
  }, [user,user.cart.items]);

  return (
    <div className="min-h-screen">
      <div className="mt-5">
        {user && user.cart.items.length > 0 ? (
          user.cart.items.map((item, index) => <CartCard item={item} setSubtotal={setSubtotal} />)
        ) : (
          <p>No Items in the Cart</p>
        )}
      </div>
      {
        user && user.cart.items.length > 0 && (
        <div className="text-2xl font-bold float-right mr-5">
        Subtotal:{" "}
        <span className={subtotal && "font-normal"}>${subtotal}</span>
        </div>
        )
      }
      </div> 
        
  );
}

export default Cart;
