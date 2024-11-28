export type User = {
  id: string; 
  name: string;
  email: string;
};
export type UserState = {
    user: null | { name: string; email: string, id:string }; 
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  };
  
 export const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };