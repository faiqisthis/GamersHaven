import React, { useContext, useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import UserContext from "../context/user/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";

function Cart() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState(0);

  const shipping = subtotal >= 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  useEffect(() => {
    if (!user || user === undefined || user === null) {
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

  // if user has no items in cart
  if (user && user.cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link to="/explore">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white">
        <div className="  bg-[#f0f1f2] border-b">
          <div className="max-w-[1440px] mx-auto  md:p-[64px] py-[48px] px-[20px]">
            <h1 className="text-[#0a0a0a] text-[24px] font-semibold">
              Shopping Cart
            </h1>
            <p className="mt-2 text-[#8f9fbc]">
              Review your items and proceed to checkout
            </p>
          </div>
        </div>
      </div>
      <div className="lg:min-h-screen grid grid-cols-1 lg:grid-cols-3 lg:p-[64px] md:-[48px] p-[30px] gap-[30px] max-w-[1440px] mx-auto">
        <div className="lg:col-span-2">
          {user && user.cart.items.length > 0 ? (
            user.cart.items.map((item, index) => (
              <CartCard item={item} setSubtotal={setSubtotal} />
            ))
          ) : (
            <p></p>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-16 space-y-6">
            <div className="border rounded-lg p-6 bg-card space-y-4">
              <h3>Order Summary</h3>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {subtotal >= 50 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$10.00`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg">
                <span>Total</span>
                <span className="font-semibold text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Link to="/checkout">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 group mt-3"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Promo Code */}
            <div className="border rounded-lg p-6 bg-card space-y-3">
              <h4>Have a Promo Code?</h4>
              <div className="flex gap-2">
                <Input placeholder="Enter code" />
                <Button variant="outline">Apply</Button>
              </div>
            </div>

            {/* Info Box */}
            <div className="border rounded-lg p-6 bg-muted/50 space-y-2">
              <div className="flex items-start gap-3">
                <ShoppingBag className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Free Shipping</p>
                  <p className="text-muted-foreground">
                    {subtotal >= 50
                      ? "You've qualified for free shipping!"
                      : `Add $${(50 - subtotal).toFixed(
                          2
                        )} more to get free shipping`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
