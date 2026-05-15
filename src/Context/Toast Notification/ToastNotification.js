import { createContext, useCallback, useContext, useState } from "react";
import "./ToastNotification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

const ToastContext = createContext({});

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState([]);

  const addToast = useCallback((massage, type = "success") => {
    const id = Date.now();
    setToast((prev) => [...prev, { id, massage, type }]);

    setTimeout(() => {
      setToast((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="toast-container d-flex align-items-end flex-column gap-1">
        {toast.map((toast) => (
          <div
            key={toast.id}
            className={`toast-item ${toast.type} d-flex align-items-center gap-2`}
          >
            <FontAwesomeIcon
              icon={toast.type === "error" ? faCircleXmark : faCircleCheck}
            />
            {toast.massage}
          </div>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
