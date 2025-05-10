import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const continueAsGuest = createAsyncThunk(
  "auth/continueAsGuest",
  async (_, { rejectWithValue }) => {
    try {
      const guestUser = {
        id: `guest-${Date.now()}`,
        email: "",
        userName: "Guest User",
        isVerified: true,
        role: "guest",
        isGuest: true,
      };

      // localStorage.setItem('guestUser', JSON.stringify(guestUser));

      return {
        success: true,
        user: guestUser,
        message: "Guest session started",
      };
    } catch (error) {
      return rejectWithValue({
        message: "Failed to create guest session",
        error: error.message,
      });
    }
  }
);

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const verifyAccount = createAsyncThunk(
  "/auth/verify-account",
  async (token) => {
    const response = await axios.get(
      `http://localhost:5000/api/auth/verify-account?token=${token}`,
      token,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData) => {
    const response = await axios.post(
      "https://e-commerce-api-red.vercel.app/api/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  "/auth/reset-password",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/reset-password",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const sendForgotPasswordMail = createAsyncThunk(
  "/auth/forgot-password",
  async (formData) => {
    const response = await axios.get(
      `http://localhost:5000/api/auth/forgot-password?email=${formData?.email}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(
      "https://e-commerce-api-red.vercel.app/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(verifyAccount.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(continueAsGuest.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(sendForgotPasswordMail.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(sendForgotPasswordMail.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(sendForgotPasswordMail.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(resetPassword.pending,(state,action) =>{
        state.isLoading = true
      })
      .addCase(resetPassword.rejected,(state,action) =>{
        state.isLoading = false
      })
      .addCase(resetPassword.fulfilled,(state,action) =>{
        state.isLoading = false
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
