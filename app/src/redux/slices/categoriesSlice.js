import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/** create the thunk */
const API = "http://localhost:3080";
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(`${API}/categories`);
    return response.data;
  }
);
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("nameCategory", categoryData.nameCategory);
      formData.append("descriptionCategory", categoryData.descriptionCategory);
      formData.append("imageCategory", categoryData.imageCategory);
      await axios.post(`${API}/createCategory`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const response = await axios.get(`${API}/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (data) => {
    await axios.delete(
      `${API}/deleteCategories/${data.idCategory}/${encodeURIComponent(
        data.imageCategory
      )}`
    );
    const response = await axios.get(`${API}/categories`);
    return response.data;
  }
);
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (data) => {
    await axios.patch(`http://localhost:3080/updateCategory`, data);
    const response = await axios.get(`http://localhost:3080/categories`);
    return response.data;
  }
);
const initialState = {
  categories: [],
  loading: false,
  isError: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: { hidden: () => {} },
  extraReducers: (builder) => {
    /** fectch data */
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
    /** create new data */
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
    /** delete  data */
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.isError = false;
    });
    /** update  data */
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.isError = false;
    });
  },
});

export const { hidden } = categoriesSlice.actions;
export default categoriesSlice.reducer;
