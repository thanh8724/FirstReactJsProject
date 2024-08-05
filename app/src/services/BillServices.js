import axios from "axios";

export const getBills = async () => {
  const API_URL = `http://localhost:3080/bills`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
