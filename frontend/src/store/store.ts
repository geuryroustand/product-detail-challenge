import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productDetailsSlice from "./productDetailsSlice";
import cartSlice from "./updateCart";
import cartItemsSlice from "./cartItemsSlice";
import userSlice from "./userSlice";
import storageCartSlice from "./updateStorageCart";

const reducers = combineReducers({
  fetch: productDetailsSlice,
  productDetails: cartSlice,
  cart: cartItemsSlice,
  user: userSlice,
  storageCart: storageCartSlice,
});

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
