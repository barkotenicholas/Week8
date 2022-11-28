import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddProduct, DeleteProduct, GetAllProducts } from "../../services/producr.service";
import { setMessage } from './messageSlice.js';

const URL = "https://reactauth-9ca0e-default-rtdb.firebaseio.com/Products.json";
const initialState = {
  allProducts: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts ",
  async (token,thunkAPI) => {
    try {
      const response = await GetAllProducts()
    
      return response;
    } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
      console.log(message);
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/fetchProducts",
  async (product, thunkAPI) => {
    try {
      const response = await AddProduct(product)
      thunkAPI.dispatch(setMessage(response.message))
      return response.message;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/fetchProducts",
  async (id, thunkAPI) => {
    try {

      const reponse = await DeleteProduct(id)
      return reponse.data;

    } catch (error) {

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state, action) => {
      state.allProducts = []
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeed";

        state.allProducts = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }).addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export const getProductsStatus = (state) => state.product?.status;
export const getProductsError = (state) => state.product?.error;
export const getAllProducts = (state) => state.product?.allProducts;

export const { clearProducts } = productSlice.actions;

const postReducer = productSlice.reducer;
export default postReducer;
