import product from "../../api/product";

// Add a new product
export const addProduct = async (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Valid product data is required to add a product.");
  }

  try {
    const response = await product.post('/api/v1/products', data);
    return response?.data || null;
  } catch (error) {
    console.error("Error adding product:", error.message);
    throw new Error("Failed to add product. Please try again.");
  }
};

// Get products in the "console" category
export const getConsoles = async () => {
  try {
    const response = await product.get('/api/v1/products?category=console');
    return response || null;
  } catch (error) {
    console.error("Error fetching consoles:", error.message);
    throw new Error("Failed to fetch console products. Please try again.");
  }
};

// Update a product
export const updateProduct = async (id, updatedData) => {
  if (!id) {
    throw new Error("Product ID is required for update.");
  }
  if (!updatedData || typeof updatedData !== "object") {
    throw new Error("Valid updated product data is required.");
  }

  try {
    const response = await product.put(`/api/v1/products/${id}`, updatedData);
    return response || null;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error.message);
    throw new Error("Failed to update product. Please try again.");
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const response = await product.get('/api/v1/products');
    return response || null;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Failed to fetch products. Please try again.");
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  if (!id) {
    throw new Error("Product ID is required for deletion.");
  }

  try {
    const response = await product.delete(`/api/v1/products/${id}`);
    return response || null;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error.message);
    throw new Error("Failed to delete product. Please try again.");
  }
};

// Get a single product by ID
export const getProduct = async (id) => {
  if (!id) {
    throw new Error("Product ID is required to fetch a product.");
  }

  try {
    const response = await product.get(`/api/v1/products/${id}`);
    return response || null;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error.message);
    throw new Error("Failed to fetch product. Please try again.");
  }
};
