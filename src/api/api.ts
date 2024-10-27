import axios from "axios";

//? Environment Check

// let url = "http://103.219.160.253:5454/drug-website";

//? Get product details

export const getProductsHome = async () => {
  try {
    const response = await axios.get(`/homeProducts.json`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
