// src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://your-backend-url.com", // 🔁 실제 백엔드 URL로 교체
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 등 필요한 경우
});

export default axiosInstance;
