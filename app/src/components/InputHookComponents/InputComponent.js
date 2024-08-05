import React from "react";
import { useController } from "react-hook-form";

const InputComponent = ({ control, name, label, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[15px] font-semibold">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-[#00d8be] focus:outline-none focus:transition-shadow py-3 px-5 ${
          props.error && "formError"
        }`}
      />
      {props.error && (
        <span className="text-sm text-[#dc362e] font-semibold">
          {props.error.message}
        </span>
      )}
    </div>
  );
};

export default InputComponent;
