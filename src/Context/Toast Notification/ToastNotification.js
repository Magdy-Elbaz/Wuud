import { createContext, useCallback, useContext, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import checkBoxAnimation from "../../Assets/loding/lottieflow-loading-checkBox.json";
import xmarkAnimation from "../../Assets/loding/lottieflow-loading-xmark.json";
import "./ToastNotification.css";
import { useTheme } from "../ThemeContext";

const ToastContext = createContext({});

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState([]);
  const theme = useTheme();

  const addToast = useCallback((massage, type = "success") => {
    const id = Date.now();
    setToast((prev) => [...prev, { id, massage, type }]);

    setTimeout(() => {
      setToast((prev) => prev.filter((toast) => toast.id !== id));
    }, 8000);
  }, []);

  return (
    <div className=" overflow-hidden">
      <ToastContext.Provider value={{ addToast }}>
        <div className="toast-container d-flex align-items-end flex-column gap-3">
          {toast.map((toast) => (
            <div
              key={toast.id}
              className={`toast-item ${theme === "light" ? "bg-light-card" : "bg-dark-card text-light"} rounded-3 overflow-hidden`}
            >
              <div
                key={toast.id}
                className={`p-2 toast-content ${toast.type} d-flex align-items-center gap-2 `}
              >
                <DotLottieReact
                  data={
                    toast.type === "success"
                      ? checkBoxAnimation
                      : xmarkAnimation
                  }
                  width={"15px"}
                  height={"15px"}
                  loop={false}
                  segment={[0, toast.type === "success" ? 60 : 70]}
                  autoplay
                />
                {toast.massage}
              </div>
              <div className={`progress-toast ${toast.type}`} />
            </div>
          ))}
        </div>
        {children}
      </ToastContext.Provider>
    </div>
  );
}

export const useToast = () => useContext(ToastContext);
