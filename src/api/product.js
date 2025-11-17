// src/api/product.js

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
  // Change: Only add the header if the token exists. Do NOT throw an error.
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  // No 'else { throw new Error(...) }' block.
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default product