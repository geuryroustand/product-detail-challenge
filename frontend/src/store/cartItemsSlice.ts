import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchUrl } from "../helper/environmentVariable";
import { CartItem } from "../components/Types/Types";

interface CartFetchConfig {
  url: string;
  method: string;
}

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, thunkAPI) => {
    const config: CartFetchConfig = {
      url: `${fetchUrl}/cart`,
      method: "GET",
    };

    try {
      const response = await fetch(config.url, {
        method: config.method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

interface CartItemsState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartItemsState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.error = null;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartItemsSlice.reducer;
