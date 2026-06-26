import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./Pages/Auth/AuthOperations/Auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-image-gallery/styles/image-gallery.css";
import MenueProvider from "./Context/MenueContext";
import WindowProvider from "./Context/WindowContext";
import ChangeAllProvider from "./Context/ChangeAllContext";
import ToastProvider from "./Context/Toast Notification/ToastNotification";
import UserProvider from "./Context/UserContext";
import ThemeProvider from "./Context/ThemeContext";
import "./Components/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <MenueProvider>
          <WindowProvider>
            <ChangeAllProvider>
              <UserProvider>
                <ThemeProvider>
                  <App />
                </ThemeProvider>
              </UserProvider>
            </ChangeAllProvider>
          </WindowProvider>
        </MenueProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
