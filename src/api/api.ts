import axiosInstance from "./axiosInstance";

// Helper function to add Authorization header if token is provided
const getAuthHeaders = (token?: string) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiGet = async (endPoint: string, token?: string) => {
  const headers = getAuthHeaders(token);
  const { data } = await axiosInstance.get(endPoint, { headers });
  return data?.data;
};

export const apiPost = async (
  endPoint: string,
  payLoad: any,
  token?: string
) => {
  const headers = getAuthHeaders(token);
  const { data } = await axiosInstance.post(endPoint, payLoad, { headers });
  return data;
};

export const apiPut = async (
  endPoint: string,
  payLoad: any,
  token?: string
) => {
  const headers = getAuthHeaders(token);
  const { data } = await axiosInstance.put(endPoint, payLoad, { headers });
  return data;
};

export const apiDelete = async (endPoint: string, token?: string) => {
  const headers = getAuthHeaders(token);
  const { data } = await axiosInstance.delete(endPoint, { headers });
  return data;
};
