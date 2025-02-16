import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_EXPRESS_SERVER_URL,
  headers: { "Content-Type": "application/json" },
});


export default axiosInstance;
