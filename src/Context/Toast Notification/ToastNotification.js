import { createContext, useCallback, useContext, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import checkBoxAnimation from "../../Assets/loding/lottieflow-loading-checkBox.json";
import xmarkAnimation from "../../Assets/loding/lottieflow-loading-xmark.json";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ToastNotification.css";

const ToastContext = createContext({});

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState([]);
  const theme = useTheme();
  const { i18n } = useTranslation();
  console.log(theme);

  const addToast = useCallback((massage, type = "success") => {
    const id = Date.now();
    setToast((prev) => [...prev, { id, massage, type }]);

    setTimeout(() => {
      setToast((prev) => prev.filter((toast) => toast.id !== id));
    }, 10000);
  }, []);

  const handleCloseToast = (id) => {
    setToast((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {toast.length > 0 && document.querySelector(".bg-light") && (
        <div className="toast-container overflow-hidden d-flex align-items-end flex-column gap-3">
          {toast.map((toast) => (
            <div
              key={toast.id}
              className={` ${theme === "light" ? "bg-light-card" : "bg-dark-card text-light"} rounded-3 overflow-hidden`}
            >
              <div
                className={`p-2 toast-content ${toast.type} d-flex align-items-center gap-2`}
                dir={i18n.language === "ar" ? "ltr" : "rtl"}
              >
                <div>
                  <DotLottieReact
                    data={
                      toast.type === "success"
                        ? checkBoxAnimation
                        : xmarkAnimation
                    }
                    width={"13px"}
                    height={"13px"}
                    loop={false}
                    segment={[0, toast.type === "success" ? 60 : 70]}
                    autoplay
                  />
                </div>
                <p className="m-0">{toast.massage}</p>
                <div
                  className={`cursor-pointer ${theme === "light" ? "text-dark" : "text-light"}`}
                  onClick={() => handleCloseToast(toast.id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
              <div className={`progress-toast ${toast.type}`} />
            </div>
          ))}
        </div>
      )}
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
