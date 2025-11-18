import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../context/product/ProductActions";
import ProductContext from "../context/product/ProductContext";
import { addToCart } from "../context/user/UserActions";
import UserContext from "../context/user/UserContext";
import { Star, ShoppingCart, Heart, Share2,Truck,Shield,RotateCcw,Award } from "lucide-react";
function ProductDetails() {
  const [product, setProduct] = useState(null); // Initially, product is null
  const [selectedImage, setSelectedImage] = useState(""); // Initialize selectedImage as empty string
  const { id } = useParams(); // Get product ID from URL
  const { loading, dispatch } = useContext(ProductContext);
  const [quantity, setQuantity] = useState(1);
  const { user, userDispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    const fetchProduct = async (id) => {
      try {
        const response = await getProduct(id);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchProduct(id);
  }, [id]);

  const { name, price, description, features, images, stock } = product || {};

  // Set the first image as selectedImage only if images exist
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]); // Re-run when images change

  const handleCartAddition = async () => {
    const productId = id;
    if (user) {
      const response = await addToCart(productId, quantity);
      if (response) {
        userDispatch({ type: "SET_CART", payload: response.data });
        alert("Added to Cart Successfully");
      }
    } else {
      navigate("/signin", { state: { from: location.pathname } });
    }
  };
  const handleShare = () => {
    const url = window.location.href; // current product URL

    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy link");
      });
  };

  if (loading)
    return <span className="loading loading-spinner loading-lg"></span>; // Render loading state while product is being fetched

  return (
    <div className="bg-[#fefae0]">
      <div className="lg:p-[64px] max-w-[1440px] mx-auto p-[40px] min-h-screen">
        <div className="flex flex-col lg:flex-row lg:gap-[40px]">
          <div className="flex flex-col-reverse gap-[20px] w-1/2 ">
            <div className="flex flex-row w-full gap-[15px] overflow-x-auto whitespace-nowrap ">
              {images &&
                images.map((image, index) => (
                  <div className="aspect-square rounded-lg overflow-hidden "
                  style={{border:selectedImage === image ? " 2px solid #606c38" : " 2px solid transparent"}}
                  >
                  <img
                    key={index}
                    src={image}
                    alt="Product Image"
                    className={`w-full h-full max-h-[150px] max-w-[150px] object-cover cursor-pointer `}
                    
                    onClick={() => setSelectedImage(image)} // Update selected image on click
                    />
                    </div>
                ))}
            </div>
            <div className="aspect-square rounded-lg max-h-[450px] overflow-hidden border">
              <img
                src={selectedImage}
                alt="Selected product"
                className="w-full h-full object-cover"
                style={{ borderColor: 'rgba(96, 108, 56, 0.2)'}}
              />
            </div>
          </div>
          <div className=" w-1/2 flex flex-col">
            <h1 className="text-[20px] text-[#4d4d4d]">{name || ""}</h1>
            {/* Rating */}
            <div className="flex items-center gap-[10px] mt-[8px]">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => {
                  const fillPercent = Math.min(Math.max(4.5 - i, 0), 1); // value between 0 and 1

                  return (
                    <div key={i} className="relative h-5 w-5">
                      {/* Empty star (background) */}
                      <Star className="h-5 w-5 text-muted" />

                      {/* Filled star (overlay + clipped by width) */}
                      <div
                        className="absolute top-0 left-0 h-full overflow-hidden"
                        style={{ width: `${fillPercent * 100}%` }}
                      >
                        <Star className="h-5 w-5 fill-[#dda15e] text-[#dda15e]" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-black">4.5</p>
              <p className="text-[#606c38]">(120 Reviews)</p>
            </div>

            <p className="  w-[90%] text-justify text-[#606c38] py-[15px]">
              {description || ""}
            </p>
            <h1 className="text-[30px] mt-3 font-semibold text-[#606c38]">
              {`$${price}` || ""}
            </h1>

            {/* Stock Status */}
            <div className="flex items-center gap-2 my-[20px]">
              {stock > 0 ? (
                <>
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-[#4d4d4d]">In Stock</span>
                </>
              ) : (
                <>
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-[#4d4d4d]">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 ">
                <label style={{ color: "#283618" }}>Quantity:</label>
                <div
                  className="flex items-center border rounded-lg text-[#283618] "
                  style={{ borderColor: "rgba(96, 108, 56, 0.2)" }}
                >
                  <button
                    className="hover:bg-gray-200 rounded-md px-4 py-1 ]"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-8">{quantity}</span>
                  <button
                    className="hover:bg-gray-200 rounded-md px-4 py-1"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="w-full flex py-[10px] justify-center rounded-lg"
                  style={{ backgroundColor: '#606c38', color: '#fefae0' }}
                  onClick={handleCartAddition}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setLiked(!liked)}
                  className="border rounded-lg px-[10px] flex items-center justify-center"
                  style={{ borderColor: "#606c38" }}
                >
                  <Heart
                    className={`h-5 w-5 transition-all duration-200 ${
                      liked ? "text-red-500 fill-red-500" : "text-[#606c38]"
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="border rounded-lg px-[10px]"
                  style={{ borderColor: "#606c38", color: "#606c38" }}
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* <div className="flex">
              <button
                onClick={handleCartAddition}
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
            </div> */}

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t" style={{ borderColor: 'rgba(96, 108, 56, 0.2)' }}>
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: '#606c38' }} />
                <div>
                  <p className="text-sm" style={{ color: '#283618' }}>Free Shipping</p>
                  <p className="text-xs" style={{ color: '#606c38' }}>On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: '#606c38' }} />
                <div>
                  <p className="text-sm" style={{ color: '#283618' }}>1 Year Warranty</p>
                  <p className="text-xs" style={{ color: '#606c38' }}>Manufacturer guarantee</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: '#606c38' }} />
                <div>
                  <p className="text-sm" style={{ color: '#283618' }}>30-Day Returns</p>
                  <p className="text-xs" style={{ color: '#606c38' }}>Hassle-free returns</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: '#606c38' }} />
                <div>
                  <p className="text-sm" style={{ color: '#283618' }}>Authentic Products</p>
                  <p className="text-xs" style={{ color: '#606c38' }}>100% genuine</p>
                </div>
              </div>
            </div>
  
            {/* <h1 className="text-2xl mt-5 font-bold text-black">Features</h1>
            <ul className="list-none list-inside mt-5 mb-5 text-gray-400">
              {features ? (
                features.map((feature, index) => (
                  <li key={index} className="text-lg text-black">
                    {feature || ""}
                  </li>
                ))
              ) : (
                <p>No features available</p>
              )}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
