import axios from "axios";
const API_URL = "http://localhost:3080";

export const loginAccount = async (dataFormLogin) => {
  try {
    const response = await axios.post(`${API_URL}/login`, dataFormLogin);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const register = async (dataFormRegister) => {
  try {
    const response = await axios.post(`${API_URL}/register`, dataFormRegister);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
