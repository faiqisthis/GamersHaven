import React, { useContext, useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import UserContext from "../context/user/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Cart() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    if (!user || user===undefined ||user===null) {
      navigate("/signin", { state: { from: "/" } });
    }
  
    if (user !== null && user.cart !== null) {
      let bill = 0;
      user.cart.items.forEach((item) => {
        bill = parseFloat(
          (bill + item.productId.price * item.quantity).toFixed(2)
        );
      });
      setSubtotal(bill);
    }
  }, [user, user?.cart?.items]);

  return (
    <div className="min-h-screen">
      <div className="mt-5">
        {user && user.cart.items.length > 0 ? (
          user.cart.items.map((item, index) => (
            <CartCard item={item} setSubtotal={setSubtotal} />
          ))
        ) : (
          <p>No Items in the Cart</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Subtotal Section */}
        <div className="md:col-start-3">
          {user && user.cart.items.length > 0 && (
            <div className="text-2xl font-bold float-right mr-5">
              Subtotal:{" "}
              <span className={subtotal && "font-normal"}>${subtotal}</span>
            </div>
          )}
        </div>

        {/* Checkout Button */}
        {user && user.cart.items.length > 0 && (
        <div className="col-span-1 md:col-start-3 flex justify-center md:justify-end md:mr-5">
          <Link
            to="/checkout"
            className="btn btn-md btn-primary w-[90%] md:w-[60%] mt-2 mb-2"
          >
            Checkout
          </Link>
        </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
