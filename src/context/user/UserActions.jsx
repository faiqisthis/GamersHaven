import user from "../../api/user";
export const getCurrentUser = async () => {
  const response = await user.get("api/v1/auth/me");
  if (response) {
    return response.data;
  }
};
export const loginUser = async (email, password) => {
  const credentials = { email, password };
  const response = await user.post("/api/v1/auth/login", credentials);
  if (response.data.success) {
    localStorage.setItem("authToken", response.data.token);
  }
  return response.data.success;
};
export const registerUser = async (firstName, lastName, email, password) => {
  const credentials = { firstName, lastName, email, password, role: "user" };
  const response = await user.post("/api/v1/auth/register", credentials);
  console.log(response.data);
  if (response.data.token) {
    localStorage.setItem("authToken", response.data.token);
  }
  return response.data.token;
};
export const addToCart = async (productId, quantity) => {
  const response = await user.post("/api/v1/auth/cart", {
    productId,
    quantity,
  });
  if (response) {
    return response.data;
  }
};
export const updateCart = async (data) => {
  const response = await user.put("/api/v1/auth/cart", { data });
  if (response) {
    return response.data;
  }
};
export const submitOrder = async (data) => {
  try {
    const response = await user.post("/api/v1/auth/checkout", data);
    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    console.error("Error during API call:", error);
    alert("An error occurred during checkout. Please try again.");
  }
};

export const logoutUser = async () => {
  localStorage.removeItem("authToken");
  const response = await user.get("/api/v1/auth/logout");
};
