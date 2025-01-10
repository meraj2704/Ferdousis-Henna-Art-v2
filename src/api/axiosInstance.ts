import axios from "axios";

export const url = "https://api.ferdousishenna.cfd/api/";

const axiosInstance = axios.create({
  baseURL: url,
});

export default axiosInstance;
