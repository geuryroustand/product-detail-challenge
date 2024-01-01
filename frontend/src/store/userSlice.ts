import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUrl } from "../helper/environmentVariable";
import { User } from "../components/Types/Types";

export interface UserProps {
  username?: string;
  email?: string;
  password?: string;
}

export interface ErrorProps {
  message: string;
  errors: UserProps;
}

interface loginError {
  errors: UserProps;
  errorLog: {
    email?: string | null;
    password?: string | null;
  };
}

interface UserState {
  user: UserProps | null;
  loading: boolean;
  error: string | null;
  errors: UserProps | null;
  errorLog: {
    email?: string | null;
    password?: string | null;
  };
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  errors: null,
  errorLog: {
    email: "",
    password: "",
  },
};

export const userSignup = createAsyncThunk(
  "user/signup",
  async (userData: UserProps, thunkAPI) => {
    try {
      const response = await fetch(`${fetchUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData: ErrorProps = await response.json();
        throw errorData;
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch(`${fetchUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData: loginError = await response.json();
        throw errorData;
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // logoutUser: (state) => {
    //   state.user = null;
    //   state.loading = false;
    //   state.error = null;
    // },
    clearStore: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.errorLog = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.errors = null;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        const errorPayload = action.payload as ErrorProps;
        state.error = errorPayload.message;
        state.errors = errorPayload.errors;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        const userData = action.payload as User;

        state.user = userData.user;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as
          | { password?: string; email?: string }
          | undefined;

        state.errorLog.password = payload?.password || null;
        state.errorLog.email = payload?.email || null;
      });
  },
});

export const { clearStore } = userSlice.actions;

export default userSlice.reducer;
