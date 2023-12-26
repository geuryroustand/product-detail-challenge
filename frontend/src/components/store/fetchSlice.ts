import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchConfig {
  url: string;
  method: string;
  body?: any;
}

const fetchApiData = createAsyncThunk(
  "fetch/fetchApiData",
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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  data: null as null,
  loading: false,
  error: null as null,
};

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as null;
      });
  },
});

export default fetchSlice.reducer;
export { fetchApiData };
