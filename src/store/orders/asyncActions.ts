import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { Order, OrderDetail } from '@/types/orders';

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<{ orders: Order[]; orderDetails: OrderDetail[] }>(`/api/orders?userId=${userId}`);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ order, orderDetails }: { order: Order; orderDetails: OrderDetail[] }) => {
    try {
      
      const response = await axiosInstance.post('/api/orders', { order, orderDetails });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create order');
    }
  }
);
