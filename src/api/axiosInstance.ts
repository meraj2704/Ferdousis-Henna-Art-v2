import axios from "axios";

// export const url = "https://api.ferdousishenna.cfd/api/";
export const url = "http://localhost:4040/api/";

const axiosInstance = axios.create({
  baseURL: url,
});

export default axiosInstance;
