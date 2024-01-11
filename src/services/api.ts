import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL || 'http://localhost:4000',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('access-token');
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default axiosInstance;
