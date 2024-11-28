import { createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "@/types/products";
import { fetchProducts } from "./asyncActions";

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  productCount: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productCount = state.products.length;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length > 0) {
          state.products = action.payload;
          state.productCount = action.payload.length;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!";
      });
  },
});

export default productsSlice.reducer;
