import {Product} from "@/types/products";
export interface CartState {
    items: Record<string, number>;
    productDetails: Product[];
  }
  
  export const initialCartState: CartState = {
    items: {},
    productDetails: [],
  };
  