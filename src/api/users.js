import axios from "axios";

// Create an Axios instance
const users = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the Authorization header dynamically
users.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token is missing. Please log in.");
    }
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default users