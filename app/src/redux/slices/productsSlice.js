import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = "http://localhost:3080";
/** create the thunk */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(`http://localhost:3080/products`);
    return response.data;
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("nameProduct", data.nameProduct);
      formData.append("priceProduct", data.priceProduct);
      formData.append("descriptionProduct", data.descriptionProduct);
      formData.append("category", data.category);
      formData.append("imageProduct", data.imageProduct[0]);
      for (let i = 0; i < data.imageDetailProduct.length; i++) {
        formData.append("imageDetailProduct", data.imageDetailProduct[i]);
      }
      await axios.post(`${API}/createProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const response = await axios.get(`${API}/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`http://localhost:3080/deleteProduct/${id}`);
    const response = await axios.get(`http://localhost:3080/products`);
    return response.data;
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data) => {
    await axios.patch(`http://localhost:3080/updateProduct`, data);
    const response = await axios.get(`http://localhost:3080/products`);
    return response.data;
  }
);
const initialState = {
  products: [],
  loading: false,
  isError: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    hidden: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
    /** */
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.isError = false;
    });
    /** */
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.isError = false;
    });
    /** */
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.isError = false;
    });
  },
});

export const { hidden } = productsSlice.actions;
export default productsSlice.reducer;
