import React from "react";

const InputFileReduxFormComponent = ({
  input: { onChange: reduxOnChange, ...inputProps },
  meta,
}) => {
  const handleChange = (e) => {
    // Call the redux-form onChange handler with the selected file
    reduxOnChange(e.target.files[0]);
  };
  return (
    <input
      type="file"
      onChange={handleChange}
      {...inputProps}
      className="w-[126px]"
    />
  );
};

export default InputFileReduxFormComponent;
