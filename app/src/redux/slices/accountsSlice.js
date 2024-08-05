import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/** create the thunk */
export const fetchAccounts = createAsyncThunk(
  "cart/fetchAccounts",
  async () => {
    const response = await axios.get(`http://localhost:3080/accounts`);
    return response.data;
  }
);
const initialState = {
  accounts: [],
  loading: false,
  isError: false,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: { hidden: () => {} },
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.pending, (state, action) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(fetchAccounts.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
    /** */
  },
});

export const { hidden } = accountsSlice.actions;
export default accountsSlice.reducer;
