import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductProps } from "../components/Types/Types";

export interface FetchConfig {
  url: string;
  method: string;
  body?: any;
}

const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (config: FetchConfig, thunkAPI) => {
    const { url, method, body } = config;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
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

interface FetchSliceState {
  data: ProductProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: FetchSliceState = {
  data: null,
  loading: false,
  error: null,
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productDetailsSlice.reducer;
export { fetchProductDetails };
