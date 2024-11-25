import axios from "axios";

//? Environment Check

// let url = "http://103.219.160.253:5454/drug-website";

//? Get product details

export const getAlProducts = async () => {
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
