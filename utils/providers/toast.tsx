import {
  toast,
  ToastOptions as ToastOptions_TP,
  ToastPosition,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions: ToastOptions_TP = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
};

const STYLES = {
  success: "text-[#06d644] fixed z-[99999]",
  error: "bg-mainRed text-[#e74c3c] fixed z-[99999]",
  info: "bg-blue-300 text-[#171717] fixed z-[99999]",
};

type ToastType = keyof typeof STYLES;

export const notify = (
  type: ToastType = "success",
  msg?: string,
  position: ToastPosition = "top-right"
) => {
  let message = msg || "Successful operation";

  if (type === "error" && !!!msg) {
    message = "Something went wrong";
  }
  const className = STYLES[type];

  toast[type](message, {
    ...toastOptions,
    className,
    position,
  });
};
