export interface Order {
    id: number; 
    userId: number; 
    total: number; 
    createdAt: string; 
  }

  export interface OrderDetail {
    id: number; 
    orderId: number; 
    productId: number; 
    quantity: number; 
  }