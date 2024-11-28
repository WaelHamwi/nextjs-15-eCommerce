import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products/slice";
import cartSlice from "./carts/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderSlice from "./orders/slice";
import userReducer from './users/slice';


const rootReducer = combineReducers({
  products: productsSlice,
  cart: cartSlice,
  orders: orderSlice,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
