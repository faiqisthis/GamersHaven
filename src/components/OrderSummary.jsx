import React from "react";

const OrderSummary = ({ cartItems, subtotal }) => {
  return (
    <div className="w-full p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        {cartItems?.map((item) => (
          <div key={item.productId._id} className="flex justify-between">
            <div>
              <p className="text-sm font-medium">{item.productId.name}</p>
              <p className="text-xs text-gray-500">{item.productId.brand}</p>
            </div>
            <p className="text-sm">{item.productId.price}</p>
          </div>
        ))}
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-sm font-medium">Subtotal</p>
        <p className="text-sm">{subtotal}</p>
      </div>
      <div className="flex justify-between mt-4">
        <input
          type="text"
          className="border rounded-md p-2 w-full mr-2 input-primary"
          placeholder="Discount code"
        />
        <button className="bg-black text-white px-4 py-2 rounded-md">
          Apply
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
