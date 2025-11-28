import React, { useContext, useState, useEffect } from "react";
import { X } from "lucide-react";

import UserContext from "../context/user/UserContext";
import { updateCart } from "../context/user/UserActions";
function CartCard({ item }) {
  const [quantity, setQuantity] = useState(item?.quantity);
  const { user, userDispatch } = useContext(UserContext);

  const handleItemDelete = async () => {
    let data = user;
    data = data.cart.items.filter(
      (i) => i.productId._id !== item.productId._id
    );
    const response = await updateCart(data);

    if (response.success) {
      let finaldata = user;
      finaldata.cart.items = data;
      userDispatch({
        type: "SET_CART",
        payload: finaldata,
      });
    }
  };
  const handleItemUpdate = async (quantity) => {
    let data = user;
    let updatedCart = data.cart.items.map((i) => {
      if (i.productId._id === item.productId._id) {
        i.quantity = quantity;
      }
      return i;
    });
    data.cart.items = updatedCart;
    const response = await updateCart(updatedCart);
    console.log(response);
    if (response.success) {
      userDispatch({
        type: "SET_CART",
        payload: data,
      });
    }
  };

  return (
    <div className="flex justify-between w-full border p-[10px] rounded-lg">
      <div className="flex ">
        <img
          className=" h-[80px] w-[80px] sm:h-[130px] sm:w-[130px] object-cover flex-shrink-0 rounded-lg"
          src={item?.productId.images[0]}
        />
        <div className="card flex flex-col gap-[2px] ml-4">
          <div className="card-title">{item?.productId.name}</div>
          <div className="card-normal text-balance mt-1">
            {item?.productId.brand}
          </div>

          <div className=" flex justify-between border-2 mt-4 rounded-lg items-center md:w-[120px] w-[90px] sm:w-[100px]">
            <button
              onClick={() => {
                setQuantity(quantity - 1);
                handleItemUpdate(quantity - 1);
              }}
              disabled={quantity === 1 ? true : false}
              className="text-3xl hover:bg-gray-300 px-2 rounded-md"
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              onClick={() => {
                setQuantity(quantity + 1);
                handleItemUpdate(quantity + 1);
              }}
              className="text-3xl hover:bg-gray-300 px-1 rounded-md"
            >
              +
            </button>
          </div>
        </div>
      </div>
      {/* Desktop layout */}
      <div className="flex flex-col justify-between items-end">
        <button className="hover:bg-gray-300 p-2 rounded-lg group  " onClick={handleItemDelete}>
          <X className="h-4 w-4 group-hover:text-red-500" />
        </button>
        <p className="text-lg font-semibold">${item?.productId.price}</p>
      </div>
    </div>
  );
}

export default CartCard;
