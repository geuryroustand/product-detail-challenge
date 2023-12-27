import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productDetailsSlice from "./productDetailsSlice";
import cartSlice from "./updateCart";
import cartItemsSlice from "./cartItemsSlice";

const reducers = combineReducers({
  fetch: productDetailsSlice,
  productDetails: cartSlice,
  cart: cartItemsSlice,
});

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
