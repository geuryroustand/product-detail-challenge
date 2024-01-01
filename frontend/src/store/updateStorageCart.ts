import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../components/Types/Types";

interface CartState {
  storageCart: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  storageCart: [],
  loading: false,
  error: null,
};

const storageCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updatedWithLocalStorage: (state, action) => {
      state.storageCart = JSON.parse(action.payload);
    },
  },
});

export const { updatedWithLocalStorage } = storageCartSlice.actions;
export default storageCartSlice.reducer;
