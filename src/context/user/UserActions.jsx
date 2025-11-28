import user from "../../api/user";
import axios from "axios";

// Fetch the current logged-in user
export const getCurrentUser = async () => {
  try {
    const response = await user.get("api/v1/auth/me");
    return response?.data;
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    throw new Error("Failed to fetch the current user. Please try again.");
  }
};

// Login a user
export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required for login.");
  }
  const credentials = { email, password };

  try {
    const response = await user.post("/api/v1/auth/login", credentials);
    if (response?.data?.success) {

      localStorage.setItem("authToken", response.data.token);
      user.defaults.headers["Authorization"] = `Bearer ${response.data.token}`; // Update Axios header immediately
    }
    return response?.data?.success || false;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw new Error(
      "Failed to login. Please check your credentials and try again."
    );
  }
};

// Register a new user
export const registerUser = async (firstName, lastName, email, password) => {
  if (!firstName || !lastName || !email || !password) {
    throw new Error(
      "All fields (firstName, lastName, email, password) are required for registration."
    );
  }
  const credentials = { firstName, lastName, email, password, role: "user" };

  try {
    const response = await user.post("/api/v1/auth/register", credentials);
    console.log(response.data);
    if (response?.data?.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response?.data?.token || null;
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw new Error("Failed to register. Please try again.");
  }
};

// Add an item to the cart
export const addToCart = async (productId, quantity) => {
  if (!productId || !quantity || quantity <= 0) {
    throw new Error(
      "Product ID and a valid quantity are required to add to the cart."
    );
  }

  try {
    const response = await user.post("/api/v1/auth/cart", {
      productId,
      quantity,
    });
    return response?.data || null;
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    throw new Error("Failed to add to cart. Please try again.");
  }
};

// Update cart with new data
export const updateCart = async (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Valid cart data is required for update.");
  }

  try {
    const response = await user.put("/api/v1/auth/cart", { data });
    return response?.data || null;
  } catch (error) {
    console.error("Error updating cart:", error.message);
    throw new Error("Failed to update cart. Please try again.");
  }
};

// Submit an order
export const submitOrder = async (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Valid order data is required to submit an order.");
  }

  try {
    const response = await user.post("/api/v1/auth/checkout", data);
    if (response?.data?.success) {
      return response.data;
    }
    throw new Error("Order submission failed.");
  } catch (error) {
    console.error("Error during checkout:", error.message);
    throw error;
  }
};

// Logout a user
export const logoutUser = async () => {
  try {
    localStorage.removeItem("authToken");
    user.defaults.headers["Authorization"] = null;
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Error during logout:", error.message);
    throw new Error("Failed to log out. Please try again.");
  }
};
