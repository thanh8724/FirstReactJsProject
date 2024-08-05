import React, { useState, useEffect } from "react";
import ToastErrorComponent from "./ToastErrorComponent";
import ToastSuccessComponent from "./ToastSuccesComponent";
import ToastWarningComponent from "./ToastWarningComponent";

const ContainerToastComponent = ({ toastInfo }) => {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    if (toastInfo.length > 0) {
      const newToast = toastInfo[toastInfo.length - 1];
      setToasts((prevToasts) => [...prevToasts, newToast]);
      setTimeout(() => {
        removeToast(newToast.id);
      }, 4000);
    }
  }, [toastInfo]);

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className="absolute top-[170px] right-[14px] overflow-hidden z-[10000]">
      {toasts.map((toast) => {
        if (toast.type === "error") {
          return (
            <ToastErrorComponent
              key={toast.id}
              toastInfo={toast}
              removeToast={() => removeToast(toast.id)}
            />
          );
        } else if (toast.type === "success") {
          return (
            <ToastSuccessComponent
              key={toast.id}
              toastInfo={toast}
              removeToast={() => removeToast(toast.id)}
            />
          );
        } else if (toast.type === "warning") {
          return (
            <ToastWarningComponent
              key={toast.id}
              toastInfo={toast}
              removeToast={() => removeToast(toast.id)}
            />
          );
        }
      })}
    </div>
  );
};

export default ContainerToastComponent;
