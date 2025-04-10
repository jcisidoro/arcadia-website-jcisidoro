"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error") => void;
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
  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    localStorage.setItem("toastMessage", message);
    localStorage.setItem("toastType", type);

    toast(message, {
      type,
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Slide,
      style:
        type === "success"
          ? { backgroundColor: "#326333", color: "white" }
          : { backgroundColor: "#d70404", color: "white" },
      onClose: () => {
        localStorage.removeItem("toastMessage");
        localStorage.removeItem("toastType");
      },
    });
  };

  useEffect(() => {
    const storedMessage = localStorage.getItem("toastMessage");
    const storedType = localStorage.getItem("toastType");

    if (storedMessage && storedType) {
      showToast(storedMessage, storedType as "success" | "error");
    }
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
      {children}
    </ToastContext.Provider>
  );
};
