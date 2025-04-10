"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Toast from "../Toast";

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a message in localStorage on page load
    const storedMessage = localStorage.getItem("toastMessage");
    if (storedMessage) {
      setMessage(storedMessage);
      localStorage.removeItem("toastMessage"); // Remove message after loading
    }
  }, []);

  const showToast = (msg: string) => {
    setMessage(msg);
    localStorage.setItem("toastMessage", msg);
    setTimeout(() => setMessage(null), 3000); // Hide after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {message && <Toast message={message} />}
      {children}
    </ToastContext.Provider>
  );
};
