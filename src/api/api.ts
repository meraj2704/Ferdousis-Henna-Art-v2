import axios from "axios";
import axiosInstance, { url } from "./axiosInstance";

export const apiGet = async (endPoint: string) => {
  const { data } = await axiosInstance.get(endPoint);
  return data;
};

export const apiPost = async (endPoint: string, payLoad: any) => {
  const { data } = await axiosInstance.post(endPoint, payLoad);
  return data;
};

export const apiPut = async (endPoint: string, payLoad: any) => {
  const { data } = await axiosInstance.put(endPoint, payLoad);
  return data;
};

export const apiDelete = async (endPoint: string) => {
  const { data } = await axiosInstance.delete(endPoint);
  return data;
};

export const getAlProducts = async () => {
  try {
    const response = await axios.get(`${url}api/product/all-products`);

    return response.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAlProductsHome = async () => {
  try {
    const response = await axios.get(`/products.json`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAlOrders = async () => {
  try {
    const response = await axios.get(`/orders.json`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllPhotos = async () => {
  try {
    const response = await axios.get(`/photos.json`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllMessages = async () => {
  try {
    const response = await axios.get(`/messages.json`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllReviews = async () => {
  try {
    const response = await axios.get(`/reviews.json`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`/posts.json`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
