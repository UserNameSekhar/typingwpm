import { SendOtpPayload, VerifyOtpPayload } from "../../models/auth/authTypes";
import axiosInstance from "../../utils/axiosInstance";
import { verifyToken } from "../../utils/tokenExpiry";

export const sendOtpService = async (data: SendOtpPayload) => {
  const response = await axiosInstance.post("/auth/send-otp", data);
  return response.data;
};

export const verifyOtpService = async (data: VerifyOtpPayload) => {
  const response = await axiosInstance.post("/auth/verify-otp", data);
  return response.data;
};

export const googleOAuthService = async (token: string) => {
  const response = await axiosInstance.post("/auth/google-login", { token });
  return response.data;
};

export const updateProfileService = async (userDetails: any) => {
  const token = verifyToken(); 
  const response = await axiosInstance.put("/user/update", userDetails, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
