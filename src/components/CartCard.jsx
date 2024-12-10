import React, { useContext, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
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
    <div className="grid grid-cols-4 md:grid-cols-3">
      <div className="col-span-4 md:col-span-1 flex">
        <img
          className="md:w-[170px] h-[170px] w-[140px] ml-3 object-fill flex-shrink-0"
          src={item?.productId.images[0]}
        />
        <div className="card flex flex-col">
          <div className="p-3 ml-5">
            <div className="card-title">{item?.productId.name}</div>
            <div className="card-normal text-balance mt-1">
              {item?.productId.brand}
            </div>
          </div>

          {/* Mobile-only layout */}
          <div className="flex flex-col items-start gap-2 md:hidden">
            <p className="text-lg font-bold ml-7">${item?.productId.price}</p>
            <FaTrash
              onClick={handleItemDelete}
              className="cursor-pointer ml-7"
              size={18}
            />
            <div className="btn btn-circle btn-lg w-[130px] flex justify-around ml-3 ">
              <button
                onClick={() => {
                  setQuantity(quantity - 1);
                  handleItemUpdate(quantity - 1);
                }}
                disabled={quantity === 1 ? true : false}
                className="text-5xl"
              >
                -
              </button>
              <p className="">{quantity}</p>
              <button
                onClick={() => {
                  setQuantity(quantity + 1);
                  handleItemUpdate(quantity + 1);
                }}
                className="text-2xl"
              >
                +
              </button>
            </div>
            <br />
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex justify-center mt-3">
        <div className="text-lg font-bold flex flex-col">
          <p>${item?.productId.price}</p>
          <FaTrash
            onClick={handleItemDelete}
            className="cursor-pointer mt-2"
            size={18}
          />
        </div>
      </div>

      <div className="hidden md:flex justify-center">
        <div className="btn btn-circle btn-lg w-[50%] lg:w-[35%] flex justify-around">
          <button
            onClick={() => {
              setQuantity(quantity - 1);
              handleItemUpdate(quantity - 1);
            }}
            disabled={quantity === 1 ? true : false}
            className="text-5xl"
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            onClick={() => {
              setQuantity(quantity + 1);
              handleItemUpdate(quantity + 1);
            }}
            className="text-3xl"
          >
            +
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}

export default CartCard;
