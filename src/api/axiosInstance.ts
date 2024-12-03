import axios from "axios";

export const url = "https://ferdousis-henna-art-backend.vercel.app/api/";

const axiosInstance = axios.create({
  baseURL: url,
});

export default axiosInstance;
