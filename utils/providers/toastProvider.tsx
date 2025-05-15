"use client";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative flex p-1 text-darkprimary min-h-10 rounded-lg  justify-between bg-white overflow-hidden cursor-pointer"
        }
        bodyClassName={() =>
          "text-sm  font-meduim  flex items-center flex-wrap rounded-lg py-5 px-4"
        }
        position="bottom-left"
        autoClose={3000}
      />
    </>
  );
}
