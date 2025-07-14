import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://your-backend-url.com", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
