import axios from "axios";

export const getDataShopById = async (idCate) => {
  const API_URL = `http://localhost:3080/shop/${idCate}`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getDataShopByKeyword = async (keyword) => {
  const API_URL = `http://localhost:3080/search?keyword=${keyword}`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
