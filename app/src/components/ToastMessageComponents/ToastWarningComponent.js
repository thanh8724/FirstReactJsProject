import React from "react";

const ToastWarningComponent = (props) => {
  return (
    <div
      className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50"
      id="toast"
    >
      <div className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
        <div className="flex gap-2 items-center">
          <div className="text-yellow-500 bg-white/5 backdrop-blur-xl p-1 rounded-lg w-8 h-8">
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 flex-shrink-0 mr-2 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-yellow-400 text-sm">{props.toastInfo.title}</p>
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

export default ToastWarningComponent;
