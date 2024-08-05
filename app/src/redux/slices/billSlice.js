import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = "http://localhost:3080";
/** create the thunk */
export const fetchBills = createAsyncThunk("biils/fetchBills", async () => {
  const response = await axios.get(`${API}/bills`);
  return response.data;
});
export const updateBill = createAsyncThunk("biils/updateBill", async (data) => {
  await axios.patch(`${API}/updateBill`, data);
  const response = await axios.get(`${API}/bills`);
  return response.data;
});
export const createBill = createAsyncThunk(
  "bills/createBill",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      await axios.post(`${API}/createBill`, data);
      // return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  bills: [],
  loading: false,
  isError: false,
};

const productsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    hidden: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBills.pending, (state, action) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(fetchBills.fulfilled, (state, action) => {
      state.bills = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(createBill.fulfilled, (state, action) => {
      state.bills = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(fetchBills.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
    // update
    builder.addCase(updateBill.fulfilled, (state, action) => {
      state.bills = action.payload;
      state.loading = false;
      state.isError = false;
    });
  },
});

export const { hidden } = productsSlice.actions;
export default productsSlice.reducer;
