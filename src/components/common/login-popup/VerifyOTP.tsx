import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import icons from "../../../assets/icons/icons";
import {
  sendOtpThunk,
  verifyOtpThunk,
} from "../../../redux/actions/authActions";
import { AppDispatch, RootState, useAppDispatch } from "../../../redux/store";
import { showAlert } from "../../../context/FFAlertContext";
import { VerifyOtpPayload } from "../../../models/auth/authTypes";

const ImgContainer = (props: any) => {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ userSelect: "none" }}
    >
      <motion.img
        src={props.src}
        alt={props.alt || "icon"}
        className="w-32 md:w-56 h-auto object-contain transform transition-all ease-in-out duration-500 hover:scale-125 cursor-pointer"
      />
    </motion.div>
  );
};

interface LoginViewProps {
  loginView: string;
  loginId: string;
  setIsOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyOTP: React.FC<LoginViewProps> = ({
  loginId,
  loginView,
  setIsOtpSent,
  setShowLogin,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // Initialize OTP state
  const dispatch: AppDispatch = useAppDispatch();
  const [timer, setTimer] = useState<number>(30);
  const [isResendAvailable, setIsResendAvailable] = useState<boolean>(false);

  const { isLoading } = useSelector((state: RootState) => state.auth);

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendAvailable(true);
    }
  }, [timer]);

  const startTimer = () => {
    setTimer(30);
    setIsResendAvailable(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on the next input field if available
      if (index < 5) {
        (e.target.nextSibling as HTMLInputElement)?.focus();
      }
    } else if (value === "") {
      // Handle backspace (empty value)
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Focus on the previous input field if available
      if (index > 0) {
        (e.target.previousSibling as HTMLInputElement)?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      showAlert("Please enter a valid 6-digit OTP", "error");
      return;
    }

    // Check if the user is logging in with email or mobile and prepare the payload
    const payload: VerifyOtpPayload = {
      otp: otpValue,
    };

    if (loginView === "email") {
      payload.email = loginId; // Add email to payload
    } else if (loginView === "mobile") {
      payload.mobile = loginId; // Add mobile to payload
    }

    try {
      const response = await dispatch(verifyOtpThunk(payload));
      const result: any = response.payload;
      if (result.success) {
        showAlert(result.message, "success");
        setShowLogin(false);
      } else {
        showAlert(result.error, "warning");
      }
    } catch (error: any) {
      showAlert(error.message || "Failed to verify OTP", "error");
    }
  };

  const handleResendOtp = async () => {
    // Clear the OTP input fields
    setOtp(Array(6).fill(""));
    startTimer();
    try {
      let response;
      if (loginView === "email") {
        if (!/\S+@\S+\.\S+/.test(loginId)) {
          toast.error("Invalid email format");
          return;
        }
        response = await dispatch(sendOtpThunk({ email: loginId }));
      } else if (loginView === "mobile") {
        if (loginId.length !== 10) {
          toast.error("Mobile number must be 10 digits");
          return;
        }
        response = await dispatch(sendOtpThunk({ mobile: loginId }));
      }

      const result: any = response?.payload;
      if (result.success) {
        showAlert(result.message, "success");
      } else {
        showAlert(result.error, "warning");
      }
    } catch (err: any) {
      showAlert(err.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="mt-0 md:mt-2 pt-0 p-2 grid grid-cols-1 md:grid-cols-2 h-[75%]">
      {/* Left Column */}
      <motion.div
        className="hidden md:flex flex-col items-center justify-center w-full h-full px-4 md:px-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center h-auto">
          <ImgContainer src={icons.fingertouch} />
        </div>
      </motion.div>

      {/* Right Column */}
      <motion.div
        className="flex flex-col items-start justify-start w-full h-full"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mt-12 md:mt-4 flex flex-col gap-3 md:gap-4 justify-start md:justify-center text-light-textPrimary dark:text-dark-textPrimary max-w-md mx-auto w-full h-full">
          <ArrowLeft
            onClick={() => setIsOtpSent(false)}
            className="cursor-pointer text-light-textSecondary dark:text-dark-textSecondary hover:text-light-textPrimary dark:hover:text-dark-textPrimary transform hover:-translate-x-1 transition-all duration-500 ease-in-out"
          />
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <label
                htmlFor="otp"
                className="block text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-3"
              >
                Enter OTP sent to your {loginView} -{" "}
                <span className="text-green-600 dark:text-green-400">
                  {loginId}
                </span>
              </label>
              <div className="flex gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    maxLength={1}
                    type="text"
                    name="otp"
                    id="otp"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    className={`w-full px-2 py-2 md:py-3 text-center text-lg md:text-xl font-primary bg-transparent text-light-textPrimary dark:text-dark-textPrimary  backdrop-blur-md border dark:border-gray-700 rounded-lg focus:ring-2 hover:ring-2 hover:ring-indigo-200 dark:hover:ring-orange-300 focus:ring-indigo-600 dark:focus:ring-orange-600 focus:ring-opacity-50 focus:outline-none outline-none transition-all duration-300`}
                    required
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className={`w-full p-2 md:p-3 rounded-lg text-center font-medium text-white bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-600 mt-3 md:mt-4 bg-[length:200%_200%] ${
                isLoading
                  ? "animate-gradient-move"
                  : "hover:bg-[position:100%_50%] transition-[background-position] duration-500 ease-in-out"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Verify Otp"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm text-gray-600">
            {isResendAvailable ? (
              <div className="flex flex-col gap-2">
                <span className="text-orange-500">
                  {timer === 0 && "OTP expired. Click Resend to get a new OTP."}
                </span>
                <button
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            ) : (
              <p>
                Enter and Verify the OTP in{" "}
                <span className="font-bold text-red-600">{timer}s</span>.{" "}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
