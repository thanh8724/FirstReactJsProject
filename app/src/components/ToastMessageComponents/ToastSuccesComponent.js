import React from "react";

const ToastSuccesComponent = (props) => {
  return (
    <div
      className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50"
      id="toast"
    >
      <div className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
        <div className="flex gap-2">
          <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
          <div>
            <p className="text-[#3cbd94] text-sm">{props.toastInfo.title}</p>
            <p className="text-gray-300">{props.toastInfo.message}</p>
          </div>
        </div>
        <button
          className="text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
          onClick={props.removeToast}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ToastSuccesComponent;
