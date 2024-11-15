import React, { useState, useEffect } from "react";

// Dummy API interaction functions
const fetchProducts = () => {
  // Simulate an API call to fetch products
  return [
    {
      id: 1,
      name: "Xbox Series X",
      price: 500,
      category: "Consoles",
      description: "Powerful gaming console",
      image: "link-to-image",
    },
    // Add more sample products here
  ];
};

function AdminProductManagement() {
  const [products, setProducts] = useState([]); // List of products
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  // Fetch products from the API on component mount
  useEffect(() => {
    setProducts(fetchProducts());
  }, []);

  // Handle form input changes (pure function)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Logic to add a new product (pure function)
  const handleAddProduct = (e) => {
    e.preventDefault();

    // Validation
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.image
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newProductData = {
      ...newProduct,
      id: products.length + 1, // Auto-generate ID for the example
    };

    // Add product to the list (immutably)
    setProducts((prevProducts) => [...prevProducts, newProductData]);
    // Simulate API call

    // Reset form
    setNewProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
    });
  };

  // Logic to edit a product (pure function)
  const handleEditProduct = (id) => {
    const updatedProduct = prompt(
      "Enter new details (comma separated): Name, Price, Description"
    );
    if (!updatedProduct) return;

    const [name, price, description] = updatedProduct.split(",");
    const updatedProductData = { name, price, description };

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProductData } : product
      )
    );
    // Simulate API call
  };

  // Logic to delete a product (pure function)
  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      // Simulate API call
    }
  };

  return (
    <>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Downloads</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Users</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
        </div>
        <br/>
        <div className="flex">
        <div className="card ml-5 bg-base-200 w-72 shadow-xl transform transition-transform duration-300 hover:scale-105">
          <div className="card-body">
            <h2 className="card-title text-primary text-center">Total Sales</h2>
            <h2 className="text-3xl font-bold text-center">$ 67,845</h2>
            <p className=" text-accent text-center">↗︎ 12,890 (22%)</p>
          </div>
        </div>
        <div className="card ml-5 bg-base-200 w-72 shadow-xl transform transition-transform duration-300 hover:scale-105">
          <div className="card-body">
            <h2 className="card-title text-primary text-center">Total Profit</h2>
            <h2 className="text-3xl font-bold text-center">$ 45,845</h2>
            <p className=" text-accent text-center">↗︎ 10,368 (29%)</p>
          </div>
        </div>
        <div className="card ml-5 bg-base-200 w-72 shadow-xl transform transition-transform duration-300 hover:scale-105">
          <div className="card-body">
            <h2 className="card-title text-primary text-center">Total Customers </h2>
            <h2 className="text-3xl font-bold text-center">50</h2>
            <p className=" text-red-800 text-center"> ↘︎ 90 (14%)</p>
           
          </div>
        </div>
        <div className="card ml-5 bg-base-200 w-72 shadow-xl transform transition-transform duration-300 hover:scale-105">
          <div className="card-body">
            <h2 className="card-title text-primary text-center">Total Products </h2>
            <h2 className="text-3xl font-bold text-center">75</h2>
          </div>
        </div>
        </div>
      <div className="admin-page p-8">
        <h1 className="text-3xl font-bold mb-6">Product Management</h1>

        {/* Add New Product Section */}
        <div className="add-product-section mb-10">
          <h2 className="text-2xl mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="block w-full p-2 border"
            />
            <input
              type="text"
              name="price"
              placeholder="Price (in $)"
              value={newProduct.price}
              onChange={handleInputChange}
              className="block w-full p-2 border"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="block w-full p-2 border"
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="block w-full p-2 border"
            ></textarea>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={handleInputChange}
              className="block w-full p-2 border"
            />
            <button type="submit" className="btn btn-primary mt-2 ">
              Add Product
            </button>
          </form>
        </div>

        {/* List of Existing Products */}
        <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <h2 className="text-2xl mb-4 col-span-full">Manage Products</h2>
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="product-item  p-4 rounded-lg shadow-2xl border-2"
              >
                <h3 className="text-xl font-semibold">
                  {product.name} - ${product.price}
                </h3>
                <p className="text-gray-600">{product.description}</p>
                <div className="mt-4">
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="btn btn-secondary bg-yellow-500 text-white py-1 px-3 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="btn btn-danger bg-red-500 text-white py-1 px-3 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default AdminProductManagement;
