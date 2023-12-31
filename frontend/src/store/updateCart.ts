import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../components/Types/Types";
import { fetchUrl } from "../helper/environmentVariable";

interface CartFetchConfig {
  url: string;
  method: string;
  body?: any;
}

export const fetchUpdateCart = createAsyncThunk(
  "cart/updateCart",
  async (cartItem: CartItem, thunkAPI) => {
    const config: CartFetchConfig = {
      url: `${fetchUrl}/cart`,
      method: "POST",
      body: cartItem,
    };

    try {
      const responsePostItem = await fetch(config.url, {
        method: config.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config.body),
      });

      if (!responsePostItem.ok) {
        throw new Error("Failed to update cart");
      }

      const data = await responsePostItem.json();

      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.error = null;
      })
      .addCase(fetchUpdateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
