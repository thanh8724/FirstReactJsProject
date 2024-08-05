import axios from "axios";

export const ProductService = async (idCate, id) => {
  const API_URL = `http://localhost:3080/product/${idCate}/${id}`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
