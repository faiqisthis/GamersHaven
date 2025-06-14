import axios from 'axios';

const orders = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
orders.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token
    }
    return config; // Return updated config
  },
  (error) => Promise.reject(error) // Handle errors
);

export default orders;
