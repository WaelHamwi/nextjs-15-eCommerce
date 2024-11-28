
export interface Product {
    id: string;
    name: string;
    price: number;
    stock:number;
    description: string;
    image?: string;
  }
  
  export interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
    productCount: number,
  }
  