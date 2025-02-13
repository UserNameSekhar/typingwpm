export interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  token: string | null;
  user: IUserResp;
  error: string | null;
}

export interface SendOtpPayload {
  email?: string;
  mobile?: string;
}

export interface VerifyOtpPayload {
  email?: string;
  mobile?: string;
  otp: string;
}

export interface IUserResp {
  _id: string;
  email?: string;
  mobile?: string;
  firstName?: string;
  lastName?: string;
  isVerified: boolean;
  profilePicture?: string;
  gender?: string;
  loginType: string;
}
