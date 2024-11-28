import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialCartState } from "@/types/carts";
import { Product } from "@/types/products";
import { selectTotalQuantity, selectUniqueItemCount } from "@/selectors/cartSelectors";

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ id: string; quantity: number; product: Product }>
    ) => {
      const { id, quantity, product } = action.payload;
      state.items[id] = (state.items[id] || 0) + quantity;
      if (!state.productDetails.find((p) => p.id === id)) {
        state.productDetails.push(product);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.items[id];
      state.productDetails = state.productDetails.filter((p) => p.id !== id);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      if (quantity > 0) {
        state.items[id] = quantity;
      } else {
        delete state.items[id];
        state.productDetails = state.productDetails.filter((p) => p.id !== id);
      }
    },
    clearCart: (state) => {
      state.items = {};
      state.productDetails = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export { selectTotalQuantity, selectUniqueItemCount };

export default cartSlice.reducer;
