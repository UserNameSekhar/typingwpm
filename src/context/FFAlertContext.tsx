import React, { createContext, ReactNode, useState } from "react";
import FFAlert from "../components/common/alert/FFAlert";

// Define a global variable for showAlert
let globalShowAlert: (
  message: string,
  type?: "default" | "success" | "error" | "warning" | "info",
  duration?: number,
  directions?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
) => void;

// Alert Context
interface AlertContextType {
  showAlert: (
    message: string,
    type?: "default" | "success" | "error" | "warning" | "info",
    duration?: number,
    directions?:
      | "top-left"
      | "top-center"
      | "top-right"
      | "bottom-left"
      | "bottom-center"
      | "bottom-right"
  ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<
    {
      id: number;
      message: string;
      type?: string;
      duration?: number;
      directions?: string;
    }[]
  >([]);

  const showAlert = (
    message: string,
    type = "default",
    duration = 3000,
    directions = "top-right"
  ) => {
    const id = Date.now();
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { id, message, type, duration, directions },
    ]);
  };

  const removeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  // Assign showAlert to the global variable
  globalShowAlert = showAlert;

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="fixed z-50 space-y-16">
        {alerts.map((alert) => (
          <FFAlert
            key={alert.id}
            type={
              alert.type as "default" | "success" | "error" | "warning" | "info"
            }
            directions={
              alert.directions as
                | "top-left"
                | "top-center"
                | "top-right"
                | "bottom-left"
                | "bottom-center"
                | "bottom-right"
            }
            message={alert.message}
            duration={alert.duration}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

// Custom hook (optional, for components that still prefer using useAlert)
export const useAlert = () => {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

// Export the global showAlert function
export const showAlert = (
  message: string,
  type?: "default" | "success" | "error" | "warning" | "info",
  duration?: number,
  directions?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
) => {
  if (globalShowAlert) {
    globalShowAlert(message, type, duration, directions);
  } else {
    console.warn(
      "showAlert is not initialized. Make sure AlertProvider is used at the root."
    );
  }
};
