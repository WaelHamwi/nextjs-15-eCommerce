import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { Product } from "@/types/products";

export const fetchProducts = createAsyncThunk<Product[], any>(
  "products/fetchProducts",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Product[]>("/api/products", { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchProductImage = createAsyncThunk(
  "products/fetchProductImage",
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/products/${productId}`);
      return response.data.image;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);