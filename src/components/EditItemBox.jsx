import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { updateProduct } from "../context/product/ProductActions";
import ProductContext from "../context/product/ProductContext";
function EditItemBox({setShowBox, item }) {
  const {dispatch}=useContext(ProductContext)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  useEffect(() => {
    setSelectedProduct(item);
    setName(item.name)
    setCategory(item.category)
    setPrice(item.price)
    setStock(item.stock)
  }, []);


  const handleCloseClick = () => {
    setShowBox(false); // Hide the box when "Close" is clicked
    setSelectedProduct(null);
  };
  const handleFormSubmit=async(item)=>{
    const data={
      ...selectedProduct,
      name:name,
      category:category,
      price:price,
      stock:stock,
    }
      const response=await updateProduct(item._id,data)
      if(response.data.success){
          dispatch({type:'UPDATE_PRODUCT',payload:data})
          handleCloseClick()
      }
  }
  return (
    selectedProduct && (
      <div>
        {/* Overlay */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            zIndex: 1000,
          }}
          onClick={handleCloseClick} // Close modal when clicking outside the box
        ></div>

        {/* Modal Box */}
        <div
          className="bg-black"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "500px",
            borderRadius: "10px",
            border: "2px solid white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
            zIndex: 1001,
          }}
        >
          <div className="">
            <h3 className=" text-center text-3xl font-bold p-2 ">Edit Box</h3>
            <div className="p-4" >
              <label htmlFor="name" className="p-3 text-xl">
                Name
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary"
              /><br/>
              <label htmlFor="category" className="p-3 text-xl">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id="category"
                className="select select-bordered w-full max-w-xs"
              >
                <option value="" disabled selected>
                  Category
                </option>
                <option value="console">Console</option>
                <option value="game">Game</option>
                <option value="accessory">Accessory</option>
              </select><br/>
              <label htmlFor="price" className="p-3 text-xl">
                Price
              </label>
              <input
                required
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary"
              /><br/>
              <label htmlFor="stock" className="p-3 text-xl">
                Stock
              </label>
              <input
                required
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary"
              /><br/>
              <button onClick={()=>handleFormSubmit(item)} className="btn-secondary btn btn-md">
                   Save
              </button>
            </div>
            <button
              onClick={handleCloseClick}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <FaXmark color="black" size={22} />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditItemBox;
