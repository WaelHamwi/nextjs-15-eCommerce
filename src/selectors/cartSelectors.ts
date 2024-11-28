import { createSelector } from "reselect";
import { CartState } from "@/types/carts";
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectProductDetails = (state: CartState) => state.cart.productDetails;
export const selectTotalQuantity = createSelector(
  [selectCartItems],
  (items) => Object.values(items).reduce((acc, quantity) => acc + quantity, 0)
);
export const selectProductsInCart = createSelector(
  [selectCartItems, selectProductDetails],
  (cartItems, productDetails) => {
    return Object.entries(cartItems).map(([id, quantity]) => {
      const product = productDetails.find((prod) => prod.id === Number(id));
      if (product) {
        return { ...product, quantity };
      }
      return null;
    }).filter(Boolean); 
  }
);
export const selectUniqueItemCount = createSelector(
  [selectCartItems],
  (items) => Object.keys(items).length
);
