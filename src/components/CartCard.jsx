import React, { useContext, useState,useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import UserContext from "../context/user/UserContext";
import {updateCart } from "../context/user/UserActions";
function CartCard({ item,setSubtotal }) {
  const [quantity, setQuantity] = useState(item?.quantity);
  const { user, userDispatch } = useContext(UserContext);
  useEffect(() => {
   
  },[quantity])
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
  const handleItemUpdate=async(quantity)=>{
    let data=user;
    let updatedCart=data.cart.items.map((i)=>{
      if(i.productId._id===item.productId._id){
        i.quantity=quantity
      }
      return i
    })
    data.cart.items=updatedCart
    const response =await updateCart(updatedCart)
    console.log(response)
    if(response.success){
      userDispatch({
        type:"SET_CART",
        payload:data
      })
 
    }
  }

  return (
    <div className="grid grid-cols-4 md:grid-cols-3">
      <div className="col-span-2 md:col-span-1 flex">
        <img
          className="w-[170px] h-[150px]  ml-3 object-fill flex-shrink-0"
          src={item?.productId.images[0]}
        />
        <div className="card ">
          <div className="p-3">
            <div className="card-title">{item?.productId.name}</div>
            <div className="card-normal text-balance mt-1">
              {item?.productId.brand}
            </div>
          </div>
        </div>
      </div>
     <div className="flex justify-center">

      <div className="text-lg font-bold flex flex-col">
        <p>{item?.productId.price}</p>
          <FaTrash onClick={handleItemDelete}  className="cursor-pointer mt-2" size={18} />
      </div>
     </div>

      <div className="">
        <div className="flex justify-center">
          <div className="btn justify-around btn-circle btn-lg w-[60%] md:w-[45%]">
            <button
              onClick={() => {
                setQuantity(quantity - 1)
                handleItemUpdate(quantity-1)
              }}
              disabled={quantity === 1 ? true : false}
              className=" text-3xl"
            >
              -
            </button>
            <p className="">{quantity}</p>
            <button
              onClick={() => 
                {
                  setQuantity(quantity + 1)
                  handleItemUpdate(quantity+1)
                }}
              className=" text-2xl"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <br/>
    </div>

  );
}

export default CartCard;
