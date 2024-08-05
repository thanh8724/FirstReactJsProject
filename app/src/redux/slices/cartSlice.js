import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/** create the thunk */
export const fectchCarByIdUser = createAsyncThunk(
  "cart/fectchCarByIdUser",
  async (idUser, thunkAPI) => {
    const response = await axios.get(`http://localhost:3080/cart/${idUser}`);
    return response.data;
  }
);
export const addToCartAndUpdateData = createAsyncThunk(
  "cart/addToCartAndUpdateData",
  async (data, thunkAPI) => {
    try {
      /** trường hợp người dùng đã có giỏ hàng */
      if (data.idCart) {
        await axios.post(`http://localhost:3080/addToCart`, data);
        const response = await axios.get(
          `http://localhost:3080/cart/${data.idUser}`
        ); // trả lại data cart để cập nhật store cart
        return response.data;
      } else {
        /** trường hợp người dùng chưa có giỏ hàng */
        await axios.post(`http://localhost:3080/createCart`, data);
        const getCartResponse = await axios.get(
          `http://localhost:3080/cart/${data.idUser}`
        );
        return getCartResponse.data;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);
export const deleteItemCart = createAsyncThunk(
  "cart/DeleteItemCart",
  async (data, thunkAPI) => {
    try {
      if (data.cartStore.length > 1) {
        await axios.post(`http://localhost:3080/deleteItemCart`, data);
      }
      if (data.cartStore.length === 1) {
        await axios.post(`http://localhost:3080/deleteCart`, {
          idCart: data.cartStore[0].idCart,
        });
      }
      const response = await axios.get(
        `http://localhost:3080/cart/${data.idUser}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);
export const handleChangeQuantity = createAsyncThunk(
  "cart/handleChangeQuantity",
  async (data, thunkAPI) => {
    try {
      if (data.type === "increment") {
        await axios.patch(`http://localhost:3080/changeQuantityItemCart`, {
          newQuantity: data.quantityCurrent + 1,
          idCartItem: data.idCartItem,
        });
      }
      if (data.type === "decrement") {
        await axios.patch(`http://localhost:3080/changeQuantityItemCart`, {
          newQuantity: data.quantityCurrent - 1,
          idCartItem: data.idCartItem,
        });
      }
      const response = await axios.get(
        `http://localhost:3080/cart/${data.idUser}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (data, thunkAPI) => {
    try {
      await axios.post(`http://localhost:3080/deleteCart`, {
        idCart: data.cartStore.idCart,
      });
      const response = await axios.get(
        `http://localhost:3080/cart/${data.idUser}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);
const initialState = {
  listProducts: [],
  loading: false,
  isError: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartNone: (state, action) => {
      state.listProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fectchCarByIdUser.pending, (state, action) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(fectchCarByIdUser.fulfilled, (state, action) => {
      state.listProducts = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(fectchCarByIdUser.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
    /** */
    builder.addCase(addToCartAndUpdateData.pending, (state, action) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(addToCartAndUpdateData.fulfilled, (state, action) => {
      state.listProducts = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(addToCartAndUpdateData.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
    /** */
    builder.addCase(deleteItemCart.pending, (state, action) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(deleteItemCart.fulfilled, (state, action) => {
      state.listProducts = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.listProducts = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(deleteItemCart.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
    /** */
    builder.addCase(handleChangeQuantity.pending, (state, action) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(handleChangeQuantity.fulfilled, (state, action) => {
      state.listProducts = action.payload;
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(handleChangeQuantity.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export const { setCartNone } = cartSlice.actions;
export default cartSlice.reducer;
