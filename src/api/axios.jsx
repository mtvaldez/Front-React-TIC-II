import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

// Req Inteceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Resp Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // O invalid token
    if (error.response?.status === 500) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
