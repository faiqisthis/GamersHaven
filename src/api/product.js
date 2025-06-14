import axios from "axios";

// Create an Axios instance
const product = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to dynamically add Authorization header
product.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authorization token is missing. Please log in.");
  }
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default product