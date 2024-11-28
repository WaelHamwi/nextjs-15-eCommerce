import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store";

// Typed useDispatch hook for AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed useSelector hook for RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrderDetails = (state: RootState) => state.orders.orderDetails;