import axios from "axios";
const API_URL = "http://localhost:3080/";

export const dataHome = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
