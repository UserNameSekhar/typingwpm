export const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName: string =
      import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME || "";
    const cloudPreset: string =
      import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET || "";
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudPreset);
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to upload to Cloudinary");
      }
  
      const data = await response.json();
      return data.secure_url; // Use secure_url for the uploaded image
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };
  