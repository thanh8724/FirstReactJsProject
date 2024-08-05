import React from "react";

const TexteraReduxComponent = ({
  input,
  label,
  meta: { touched, error, invalid },
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[15px] font-semibold">{label}</label>
      <textarea
        {...input}
        placeholder={label}
        className={`pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-[#00d8be] focus:outline-none focus:transition-shadow py-3 px-5 resize-none ${
          touched && invalid && error && "formError"
        }`}
      ></textarea>
      {touched && invalid && error && (
        <span>
          {
            <span className="text-sm text-[#dc362e] font-semibold">
              {error}
            </span>
          }
        </span>
      )}
    </div>
  );
};

export default TexteraReduxComponent;
