import { createAsyncThunk } from "@reduxjs/toolkit";
import { SendOtpPayload, VerifyOtpPayload } from "../../models/auth/authTypes";
import {
  googleOAuthService,
  sendOtpService,
  updateProfileService,
  verifyOtpService,
} from "../../services/authServices/authServices";

export const sendOtpThunk = createAsyncThunk(
  "auth/sendOtp",
  async (data: SendOtpPayload, { rejectWithValue }) => {
    try {
      return await sendOtpService(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error sending OTP");
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async (data: VerifyOtpPayload, { rejectWithValue }) => {
    try {
      return await verifyOtpService(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error verifying OTP");
    }
  }
);

export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async (token: string, { rejectWithValue }) => {
    try {
      return await googleOAuthService(token);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Google Login failed");
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async (updatedData: any, { rejectWithValue }) => {
    try {
      return await updateProfileService(updatedData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Profile update failed");
    }
  }
);
