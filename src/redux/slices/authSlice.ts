import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { AuthState, IUserResp } from "../../models/auth/authTypes";
import {
  googleLoginThunk,
  sendOtpThunk,
  updateProfileThunk,
  verifyOtpThunk,
} from "../actions/authActions";

interface TokenPayload {
  exp: number; // Token expiration timestamp
  [key: string]: any;
}

const authToken = localStorage.getItem("token");

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded: TokenPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: isTokenValid(authToken),
  token: isTokenValid(authToken) ? authToken : null,
  user: {} as IUserResp,
  error: null,
};

// Automatically log out if the token is invalid
if (!isTokenValid(authToken)) {
  localStorage.removeItem("token");
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      try {
        // Perform logout logic
        state.isLoggedIn = false;
        state.token = null;
        state.user = {} as IUserResp;
        localStorage.removeItem("token");

        // Set success response
        action.payload = { success: true, message: "Successfully logged out" };
      } catch (error) {
        // Set error response
        action.payload = {
          success: false,
          message: "Logout failed. Please try again.",
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder

      //Send OTP
      .addCase(sendOtpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOtpThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendOtpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to send OTP";
      })

      //Verify OTP
      .addCase(verifyOtpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.user = {} as IUserResp;
        state.error = action.error.message || "Failed to verify OTP";
      })

      // Google Login
      .addCase(googleLoginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.user = {} as IUserResp;
        state.error = action.error.message || "Google login failed";
      })

      // Update Profile
      .addCase(updateProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update profile";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
