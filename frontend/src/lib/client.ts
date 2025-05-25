import axios from "axios";
import { useAuthStore } from "../../store/store";

export const client = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      
    }
    return Promise.reject(error);
  }
);
