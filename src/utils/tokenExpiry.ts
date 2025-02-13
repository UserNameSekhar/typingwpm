import { jwtDecode, JwtPayload } from "jwt-decode";

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (!decodedToken.exp) return true; // If no expiry, consider it invalid
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime; // Expired if expiry time is less than current time
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Consider the token expired if decoding fails
  }
};

// Helper function to verify token
export const verifyToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authorization token not found. Please login again.");
  }

  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp < currentTime) {
      throw new Error("Authorization token has expired. Please login again.");
    }
    return token;
  } catch (error) {
    throw new Error("Invalid authorization token. Please login again.");
  }
};
