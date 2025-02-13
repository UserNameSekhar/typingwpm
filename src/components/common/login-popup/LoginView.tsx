import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import icons from "../../../assets/icons/icons";
import { showAlert } from "../../../context/FFAlertContext";
import { sendOtpThunk } from "../../../redux/actions/authActions";
import { AppDispatch, RootState, useAppDispatch } from "../../../redux/store";
import VerifyOTP from "./VerifyOTP";

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
        className="w-44 md:w-56 h-auto object-contain transform transition-all ease-in-out duration-500 hover:scale-125 cursor-pointer"
      />
    </motion.div>
  );
};

interface LoginViewProps {
  loginView: string;
  setLoginView: React.Dispatch<React.SetStateAction<string>>;
  isOtpSent: boolean;
  setIsOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginView: React.FC<LoginViewProps> = ({
  loginView,
  isOtpSent,
  setIsOtpSent,
  setShowLogin,
}) => {
  const [formData, setFormData] = useState({ email: "", mobile: "", otp: "" });
  const dispatch: AppDispatch = useAppDispatch();

  const [loginId, setLoginId] = useState<string>("");

  const { isLoading } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (loginView === "email") {
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          toast.error("Invalid email format");
          return;
        }
        response = await dispatch(sendOtpThunk({ email: formData.email }));
      } else if (loginView === "mobile") {
        if (formData.mobile.length !== 10) {
          toast.error("Mobile number must be 10 digits");
          return;
        }
        response = await dispatch(sendOtpThunk({ mobile: formData.mobile }));
      }

      const result: any = response?.payload;
      if (result.success) {
        setIsOtpSent(true);
        setLoginId(loginView === "email" ? formData.email : formData.mobile);
        showAlert(result.message, "success");
      } else {
        showAlert(result.error, "warning");
      }
    } catch (err: any) {
      showAlert(err.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <>
      {!isOtpSent ? (
        <div className="mt-0 md:mt-2 pt-0 p-2 grid grid-cols-1 md:grid-cols-2 h-[75%]">
          {/* Left Column */}
          <motion.div
            className="mt-4 md:mt-0 md:flex flex-col items-center justify-center w-full h-full px-4 md:px-8 "
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center h-auto">
              <ImgContainer src={icons.gmailOne} />
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="flex flex-col items-start justify-start w-full h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className=" md:mt-4 flex flex-col gap-3 md:gap-4 justify-start md:justify-center text-light-textPrimary dark:text-dark-textPrimary max-w-md mx-auto w-full h-full">
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-600 dark:text-gray-400 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`form-input`}
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-light-textSecondary dark:text-dark-textSecondary" />
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
                  {isLoading ? "Processing..." : "Send Otp"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      ) : (
        <VerifyOTP
          loginView={loginView}
          loginId={loginId}
          setIsOtpSent={setIsOtpSent}
          setShowLogin={setShowLogin}
        />
      )}
    </>
  );
};

export default LoginView;
