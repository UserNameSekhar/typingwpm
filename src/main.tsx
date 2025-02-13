import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import "./index.css";
import store, { persistor } from "./redux/store.ts";
import { ModalProvider } from "./context/ModalContext.tsx";
import { AlertProvider } from "./context/FFAlertContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID || ""}
        >
          <AlertProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </AlertProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
