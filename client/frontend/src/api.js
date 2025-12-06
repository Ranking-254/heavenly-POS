import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// INTERCEPTOR: Automatically adds the Token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // We send it as "Bearer <token>"
    config.headers.token = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;