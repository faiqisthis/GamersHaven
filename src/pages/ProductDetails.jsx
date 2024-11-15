import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../context/product/ProductActions";
import ProductContext from "../context/product/ProductContext";

function ProductDetails() {
  const [product, setProduct] = useState(null); // Initially, product is null
  const [selectedImage, setSelectedImage] = useState(""); // Initialize selectedImage as empty string
  const { id } = useParams(); // Get product ID from URL
  const {loading,dispatch}=useContext(ProductContext)

  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      payload: true
    })
    const fetchProduct = async (id) => {
      try {
        const response = await getProduct(id);
        setProduct(response.data.data); // Set the product data
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct(id);
    dispatch({
      type:"SET_LOADING",
      payload:false
    })
  }, [id]); // Re-run when `id` changes

  const { name, price, description, features, images } = product || {};

  // Set the first image as selectedImage only if images exist
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]); // Re-run when images change

  if (loading) return <span className="loading loading-spinner loading-lg"></span>; // Render loading state while product is being fetched

  return (
    <div className="hero w-full min-h-screen items-center">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col-reverse lg:flex-row md:items-center lg:items-start">
          <div className="flex flex-row lg:flex-col lg:space-y-2 justify-around lg:ml-5 ml-2 overflow-x-auto">
            {images &&
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product Image"
                  className={`object-cover lg:h-20 lg:w-16  cursor-pointer transition-opacity duration-300 ${
                    selectedImage === image ? "opacity-100" : "opacity-40"
                  }`}
                  onClick={() => setSelectedImage(image)} // Update selected image on click
                />
              ))}
          </div>
          <div>
            <img
              src={selectedImage}
              alt="Selected product"
              className="lg:ml-4 mt-3 lg:m-0 sm:mx-auto ml-2 w-full max-w-[500px] h-auto aspect-square object-contain"
            />
          </div>
        </div>
        <div className="px-6 lg:ml-7">
          <h1 className="text-4xl font-bold md:mt-0 mt-5">{name || ""}</h1>
          <p className="mt-5 lg:w-[70%] w-[90%] text-justify">{description || ""}</p>
          <h1 className="text-2xl mt-3 font-bold">{`$ ${price}` || ""}</h1>
          <hr className="mt-4 border-t-2 border-gray-400" />
          <button className="mt-5 btn btn-secondary btn-md w-[30%] btn-circle">
            Add to Cart
          </button>
          <h1 className="text-2xl mt-5 font-bold">Features</h1>
          <ul className="list-none list-inside mt-5 mb-5 text-gray-400">
            {features ? (
              features.map((feature, index) => (
                <li key={index} className="text-lg">
                  {feature || ""}
                </li>
              ))
            ) : (
              <p>No features available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
