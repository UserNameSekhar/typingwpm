import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { motion } from "framer-motion";
import {
  BadgeX,
  Camera,
  ChevronRight,
  Edit,
  Save,
  Trash,
  Verified,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import icons from "../../assets/icons/icons";
import { showAlert } from "../../context/FFAlertContext";
import { updateProfileThunk } from "../../redux/actions/authActions";
import { AppDispatch, RootState, useAppDispatch } from "../../redux/store";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useAppDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const [imageUrl, setImageUrl] = useState<string>(user.profilePicture || "");
  const [isPictureEditing, setIsPictureEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME || "";
  const cld = new Cloudinary({ cloud: { cloudName } });

  const path = location.pathname.replace("/", "");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    mobile: user.mobile || "",
    profilePicture: user.profilePicture || "",
    gender: user.gender || "",
  });

  // State to track if the email/mobile is disabled based on login method
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const [isMobileDisabled, setIsMobileDisabled] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        profilePicture: user.profilePicture || "",
        gender: user.gender || "",
      });

      // Check login method and disable appropriate fields
      if (
        user.email &&
        (user.loginType === "email" || user.loginType === "oauth")
      ) {
        setIsEmailDisabled(true);
      } else if (user.mobile && user.loginType === "mobile") {
        setIsMobileDisabled(true);
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        setLoading(true);
        try {
          const uploadedImageUrl = await uploadToCloudinary(file);
          setImageUrl(uploadedImageUrl);
          setIsPictureEditing(true);
        } catch (error) {
          showAlert("Failed to upload image. Please try again.", "error");
        } finally {
          setLoading(false);
        }
      }
    };
    input.click();
  };

  const handleSaveProfilePicture = async () => {
    if (!imageUrl) {
      showAlert("Please upload an image before saving.");
      return;
    }
    try {
      // Dispatch the thunk to save the image URL to the server
      const response = await dispatch(
        updateProfileThunk({ profilePicture: imageUrl })
      );

      const result: any = response.payload;

      if (result.success) {
        setImageUrl(imageUrl);
        showAlert("Profile picture updated successfully!", "success");
        setIsPictureEditing(false);
      } else {
        showAlert(
          result.message || "Failed to update profile picture!",
          "warning"
        );
      }
    } catch (error) {
      showAlert("Failed to save profile picture. Please try again.", "error");
    }
  };

  const handleRemoveProfilePicture = async () => {
    if (!imageUrl) {
      showAlert("Please upload an image before removing image.");
      return;
    }
    try {
      // Dispatch the thunk to save the image URL to the server
      const response = await dispatch(
        updateProfileThunk({ profilePicture: null })
      );

      const result: any = response.payload;

      if (result.success) {
        setImageUrl("");
        showAlert("Profile picture removed successfully!", "success");
        setIsPictureEditing(false);
      } else {
        showAlert(result.message, "warning");
      }
    } catch (error) {
      showAlert("Failed to save profile picture. Please try again.", "error");
    }
  };

  const defaultImage = icons.cameraColored;

  const cldImage = imageUrl
    ? cld
        .image(imageUrl.split("/").pop()!)
        .resize(auto().gravity(autoGravity()).width(150).height(150))
    : null; // Use null if no image URL is available

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateProfileThunk(formData));
      const result: any = response.payload;

      if (result.success) {
        showAlert(result.message, "success");
        setIsEditing(false);
      } else {
        showAlert(result.message || "Something went wrong!", "warning");
      }
    } catch (error: any) {
      showAlert(error.message, "error");
      console.log("An error occurred while updating the profile", error);
    }
  };

  const VerificationBadge = (props: any) => {
    return (
      <>
        <div
          className={`px-2 sm:px-3 p-0.5 sm:p-1 rounded-lg bg-gray-100 dark:bg-gray-800 ${props.className}`}
        >
          {user.loginType === props.type && user.isVerified ? (
            <span className="flex gap-1 items-center text-green-600 dark:text-green-500 text-[10px] md:text-[13px] font-medium">
              <Verified className="w-3 h-3 sm:w-4 sm:h-4" /> Verified
            </span>
          ) : (
            <span className="flex gap-1 items-center text-red-600 dark:text-red-500 text-[10px] md:text-[13px] font-medium">
              <BadgeX className="w-3 h-3 sm:w-4 sm:h-4" />
              Not Verified
            </span>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="bg-gradient-to-b from-light-bg via-light-card to-light-bg dark:from-dark-bg dark:via-dark-card dark:to-dark-bg text-light-textPrimary dark:text-dark-textPrimary min-h-[calc(100vh-120px)]">
      <div className="container mx-auto p-6 py-4 md:py-6 flex flex-col gap-6 md:gap-8">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-light-textSecondary dark:text-dark-textSecondary mb-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center hover:text-light-textPrimary dark:hover:text-dark-textPrimary transition-all ease-in-out duration-200"
            >
              Home
            </button>
            <ChevronRight size={12} className="mx-2" />
            <button className="flex items-center text-light-textPrimary capitalize dark:text-dark-textPrimary cursor-default">
              {path}
            </button>
          </div>

          {/* Header */}
          <header className="mb-2 text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-primary font-semibold text-light-textPrimary dark:text-dark-textPrimary">
              Profile
            </h1>
          </header>
        </div>

        <div className="border-b-0 border-gray-200 pb-8 dark:border-gray-600 border-dashed">
          {/* Profile Info Section */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 ">
            {/* Profile Picture */}
            <div className="flex flex-col w-full lg:w-[25%] bg-light-bg dark:bg-dark-bg rounded-lg py-4 px-5 md:p-6">
              <div className="flex justify-between items-center h-auto pb-4 md:pb-2 lg:pb-0">
                <p className="text-lg md:text-xl font-semibold ">
                  Profile Picture
                </p>
                {imageUrl && (
                  <>
                    {isPictureEditing ? (
                      <button
                        className=" bg-light-primary text-white px-3 py-1 text-sm rounded-lg filter hover:brightness-90 dark:hover:brightness-110 transition-all duration-300 flex items-center gap-2"
                        onClick={handleSaveProfilePicture}
                      >
                        {isLoading ? "Updating..." : "Update"}
                      </button>
                    ) : (
                      <Trash
                        size={20}
                        className="text-dark-buttonDanger cursor-pointer text-sm rounded-lg filter hover:brightness-90 dark:hover:brightness-110 transition-all duration-300"
                        onClick={handleRemoveProfilePicture}
                      />
                    )}
                  </>
                )}
              </div>
              <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative group">
                    {loading ? (
                      // Loading Spinner
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex justify-center items-center bg-gray-200">
                        <svg
                          className="animate-spin h-8 w-8 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                      </div>
                    ) : cldImage ? (
                      // Show Cloudinary Image
                      <AdvancedImage
                        cldImg={cldImage}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-transparent ring-2 ring-gray-300 dark:ring-gray-700 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-800 object-top"
                      />
                    ) : (
                      // Show Default Image
                      <img
                        src={imageUrl || defaultImage}
                        alt="Default Profile"
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-transparent ring-2 ring-gray-300 dark:ring-gray-700 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-800 object-top"
                      />
                    )}

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="sm:hidden group-hover:flex absolute bottom-0 right-0 md:bottom-1 md:right-1 bg-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100 transition-all duration-300 ease-in-out delay-75 rounded-full p-2 cursor-pointer"
                      onClick={handleUploadImage}
                    >
                      <Camera size={25} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="w-full lg:w-[75%] bg-light-bg dark:bg-dark-bg rounded-lg p-4 px-5 md:p-6">
              <div className="flex flex-col gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-dashed border-gray-200 dark:border-gray-700 pb-2">
                    <h2 className="text-lg md:text-xl font-semibold">
                      Personal Information
                    </h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-primary dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light flex items-center gap-2"
                    >
                      {isEditing ? (
                        <div className="flex gap-1.5 items-center text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500 transition-all duration-200 ease-in-out">
                          <X size={18} /> <span>Cancel</span>{" "}
                        </div>
                      ) : (
                        <div className="flex gap-1.5 items-center text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-500 transition-all duration-200 ease-in-out">
                          <Edit size={18} />
                          Edit
                        </div>
                      )}
                    </button>
                  </div>
                  <div className="space-y-3 sm:space-y-5 lg:space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span className="text-light-textSecondary dark:text-dark-textSecondary font-semibold">
                        First Name:
                      </span>
                      <span className="font-normal">
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            autoFocus
                            name="firstName"
                            className="bg-transparent border-b border-dashed focus:outline-none focus:ring-0 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:border-gray-500 dark:focus:border-gray-500 text-light-textPrimary dark:text-dark-textPrimary"
                          />
                        ) : (
                          formData.firstName
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span className="text-light-textSecondary dark:text-dark-textSecondary font-semibold">
                        Last Name:
                      </span>
                      <span className="font-normal">
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            name="lastName"
                            className="bg-transparent border-b border-dashed focus:outline-none focus:ring-0 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:border-gray-500 dark:focus:border-gray-500 text-light-textPrimary dark:text-dark-textPrimary"
                          />
                        ) : (
                          formData.lastName
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between">
                      <div className="flex gap-2 items-center ">
                        <span className="text-light-textSecondary dark:text-dark-textSecondary font-semibold">
                          Email:
                        </span>
                        {user.email && (
                          <VerificationBadge
                            type="email"
                            className="flex sm:hidden"
                          />
                        )}
                      </div>
                      <div className="flex items-center">
                        <div className="flex flex-row-reverse sm:flex-row gap-3">
                          {user.email && (
                            <VerificationBadge
                              type={
                                user.loginType === "email" ? "email" : "oauth"
                              }
                              className="hidden sm:flex"
                            />
                          )}
                          <span className="font-normal">
                            {isEditing ? (
                              <input
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                disabled={isEmailDisabled}
                                className="bg-transparent border-b border-dashed focus:outline-none focus:ring-0 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:border-gray-500 dark:focus:border-gray-500 text-light-textPrimary dark:text-dark-textPrimary"
                              />
                            ) : (
                              formData.email
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between">
                      <div className="flex gap-2 items-center">
                        <span className="text-light-textSecondary dark:text-dark-textSecondary font-semibold">
                          Mobile:
                        </span>
                        {user.mobile && (
                          <VerificationBadge
                            type="mobile"
                            className="flex sm:hidden"
                          />
                        )}
                      </div>
                      <div className="flex items-center">
                        <div className="flex flex-row-reverse sm:flex-row gap-3">
                          {user.mobile && (
                            <VerificationBadge
                              type="mobile"
                              className="hidden sm:flex"
                            />
                          )}
                          <span className="font-normal">
                            {isEditing ? (
                              <input
                                type="text"
                                value={formData.mobile}
                                onChange={handleChange}
                                name="mobile"
                                disabled={isMobileDisabled}
                                className="bg-transparent border-b border-dashed focus:outline-none focus:ring-0 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:border-gray-500 dark:focus:border-gray-500 text-light-textPrimary dark:text-dark-textPrimary"
                              />
                            ) : (
                              formData.mobile
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <span className="text-light-textSecondary dark:text-dark-textSecondary font-semibold">
                        Gender:
                      </span>
                      <span className="capitalize font-normal">
                        {isEditing ? (
                          <div className="flex items-center gap-4">
                            <label className="cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                                className="mr-2"
                              />
                              Male
                            </label>
                            <label className="cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                                className="mr-2"
                              />
                              Female
                            </label>
                          </div>
                        ) : (
                          formData.gender
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Save Button */}
          {isEditing && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-light-primary text-white px-6 py-2 rounded-lg filter hover:brightness-90 dark:hover:brightness-110 transition-all duration-300 flex items-center gap-2"
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
