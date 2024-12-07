import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../context/product/ProductActions";
import ProductContext from "../context/product/ProductContext";
import { addToCart } from "../context/user/UserActions";
import UserContext from "../context/user/UserContext";

function ProductDetails() {
  const [product, setProduct] = useState(null); // Initially, product is null
  const [selectedImage, setSelectedImage] = useState(""); // Initialize selectedImage as empty string
  const { id } = useParams(); // Get product ID from URL
  const { loading, dispatch } = useContext(ProductContext);
  const [quantity, setQuantity] = useState(1);
  const {user,userDispatch}=useContext(UserContext)
  const navigate=useNavigate()
  const location=useLocation()

  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
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
      type: "SET_LOADING",
      payload: false,
    });
    
  }, [id,user]);

  const { name, price, description, features, images } = product || {};

  // Set the first image as selectedImage only if images exist
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]); // Re-run when images change

  const handleCartAddition = async () => {
    const productId = id;
    if(user){
      const response =await addToCart(productId,quantity)
      if(response){
        userDispatch({type:"SET_CART",payload:response.data})
        alert("Added to Cart Successfully")
      }
    }
    else{
      navigate('/signin',{state:{from:location.pathname}})
    }
  
  };

  if (loading)
    return <span className="loading loading-spinner loading-lg"></span>; // Render loading state while product is being fetched

  return (
    <div className="hero w-full min-h-screen items-center">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col-reverse lg:flex-row md:items-center lg:items-start">
          <div className="flex flex-row lg:flex-col lg:space-y-2  lg:ml-5 ml-2 justify-center">
            {images &&
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product Image"
                  className={`object-cover lg:h-20 lg:w-16 h-12 mb-2  cursor-pointer transition-opacity duration-300 ${
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
          <p className="mt-5 lg:w-[70%] w-[90%] text-justify">
            {description || ""}
          </p>
          <h1 className="text-2xl mt-3 font-bold">{`$ ${price}` || ""}</h1>
          <hr className="mt-4 border-t-2 border-gray-400" />
          <div className="flex">
            <button
              onClick={() => handleCartAddition(id)}
              className="mt-5 btn btn-secondary btn-md w-[30%] btn-circle"
            >
              Add to Cart
            </button>
            <div className="flex ml-5 mt-5 btn btn-circle btn-md sm:w-[20%] w-[35%] ">
              <button
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 0 ? true : false}
                className="sm:text-5xl text-3xl mr-3 sm:mr-5"
              >
                -
              </button>
              <p className="text-xl sm:text-2xl my-auto">{quantity}</p>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="sm:text-3xl text-2xl ml-3 sm:ml-5"
              >
                +
              </button>
            </div>
          </div>
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
