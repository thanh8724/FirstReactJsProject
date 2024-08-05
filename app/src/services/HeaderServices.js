import axios from "axios";
const API_URL = "http://localhost:3080/headerData";

export const headerService = async (jwt) => {
  try {
    const response = await axios.post(API_URL, { jwt });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
