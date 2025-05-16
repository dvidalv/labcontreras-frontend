import { toast, Toaster as HotToaster } from "react-hot-toast";

export const defaultToastStyles = {
  duration: 3000,
  position: "top-center",
  style: {
    background: "#363636",
    color: "#fff",
    fontSize: "16px",
    padding: "16px 24px",
    maxWidth: "500px",
    width: "fit-content",
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  success: {
    style: {
      background: "#22c55e",
      color: "#fff",
      fontSize: "16px",
      padding: "16px 24px",
      maxWidth: "500px",
      width: "fit-content",
      textAlign: "center",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#22c55e",
    },
  },
  error: {
    style: {
      background: "#ef4444",
      color: "#fff",
      fontSize: "16px",
      padding: "16px 24px",
      maxWidth: "500px",
      width: "fit-content",
      textAlign: "center",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#ef4444",
    },
  },
};

const customToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      ...defaultToastStyles,
      ...defaultToastStyles.success,
      ...options,
    });
  },

  error: (message, options = {}) => {
    return toast.error(message, {
      ...defaultToastStyles,
      ...defaultToastStyles.error,
      ...options,
    });
  },

  warning: (message, options = {}) => {
    return toast(message, {
      ...defaultToastStyles,
      style: {
        ...defaultToastStyles.style,
        background: "#f59e0b",
      },
      icon: "⚠️",
      ...options,
    });
  },

  info: (message, options = {}) => {
    return toast(message, {
      ...defaultToastStyles,
      style: {
        ...defaultToastStyles.style,
        background: "#3b82f6",
      },
      icon: "ℹ️",
      ...options,
    });
  },
};

export { HotToaster as Toaster };
export default customToast;
