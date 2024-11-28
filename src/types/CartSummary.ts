
export interface CartItem {
    [id: string]: number; 
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  export interface CartSummaryProps {
    cartItems: CartItem;
    products: Product[];
    calculateTotalPrice: () => number;
  }
  