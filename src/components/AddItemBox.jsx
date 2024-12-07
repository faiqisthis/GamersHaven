import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { FaXmark, FaTrash } from "react-icons/fa6";
import { addProduct } from "../context/product/ProductActions";
import ProductContext from "../context/product/ProductContext";
import UploadImage from "../utils/UploadImage";
function AddItemBox({ setAddBox, addBox }) {
  const { upload_loading,dispatch } = useContext(ProductContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleCloseClick = () => {
    setAddBox(false); // Hide the box when "Close" is clicked
  };
  const handleFormSubmit = async () => {
    const data = {
      name: name,
      category: category,
      price: price,
      stock: stock,
      brand: brand,
      description: description,
      features: features,
      images: imageUrls
    };
    console.log(data)
      const response=await addProduct(data)
      
      if(response.success){
          dispatch({type:'ADD_PRODUCT',payload:data})
          handleCloseClick()
      }
  };

  // Add a new feature input
  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  // Handle input change for features
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  // Optional: Remove feature input
  const handleRemoveFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };
  return (
    addBox && (
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
            overflowY:'auto',
            zIndex: 1001,
          }}
        >
          <div className="">
            <h3 className=" text-center text-3xl font-bold p-2 ">
              Add Product
            </h3>
            <div className="p-4">
              <label htmlFor="name" className="p-3 text-xl">
                Name
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary my-2"
              />
              <br />
              <label htmlFor="category" className="p-3 text-xl">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id="category"
                className="select select-bordered w-full max-w-xs my-2" 
              >
                <option value="" disabled selected>
                  Category
                </option>
                <option value="console">Console</option>
                <option value="game">Game</option>
                <option value="accessory">Accessory</option>
              </select>
              <br />
              <label htmlFor="price" className="p-3 text-xl">
                Price
              </label>
              <input
                required
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary my-2"
              />
              <br />
              <label htmlFor="stock" className="p-3 text-xl">
                Stock
              </label>
              <input
                required
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary my-2"
              />
              <br />
              <label htmlFor="brand" className="p-3 text-xl">
                Brand
              </label>
              <input
                required
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary my-2"
              />
              <br />
              <label htmlFor="description" className="p-3 text-xl">
                Description
              </label>
              <input
                required
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary my-2"
              />
              <br />
              <label htmlFor="Images" className="p-3 text-xl">
                Images
              </label>
              <UploadImage imageUrls={imageUrls} setImageUrls={setImageUrls}/>
              <br />
              <label htmlFor="features" className="p-3 text-xl">Features</label>
              {features.map((feature, index) => (
               <>
                  <input
                    type="text"
                    placeholder='Type here'
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className={`input w-full max-w-md input-primary ${index>0&& 'ml-[100px]'} mt-3 `}
                    />
                    <FaTrash size={20} onClick={() => handleRemoveFeature(index)} color="white" className="inline-block cursor-pointer ml-5" />
               </>
              ))}
            
              <button type="button" className={`btn btn-accent btn-sm  ${features.length>0&&'mt-2 ml-[100px]'} ` } onClick={handleAddFeature}>
                Add
              </button>
              <br/>
              <div className="flex items-center justify-center">
              <button
                disabled={upload_loading?true:false}
                onClick={() => handleFormSubmit()}
                className="btn-secondary btn btn-md"
                >
                Save
              </button>
             
                </div>
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
              <FaXmark color="whitek" size={22} />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default AddItemBox;
