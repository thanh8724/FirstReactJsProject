import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./Input.css";

const InputNameComponent = forwardRef((props, ref) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState({ status: false, message: "" });
  useImperativeHandle(ref, () => ({
    inputUsernameError: name === "" ? true : nameError.status,
  }));
  const handleNameBlur = (event) => {
    const nameValue = event.target.value;
    if (!nameValue) {
      setNameError({ status: true, message: "Vui lòng điền tên!" });
    } else {
      setNameError({ status: false, message: "" });
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError({ status: false, message: "" });
  };
  return (
    <div
      className={`form__group flex flex-col gap-2 relative ${
        nameError.status ? "formError" : ""
      }`}
    >
      <input
        type="text"
        name="name"
        value={name}
        onBlur={handleNameBlur}
        onInput={handleNameChange}
        onChange={props.handleForm}
        className="w-full input focus:outline-none 
        transition-colors duration-300 focus:border-[#008080]"
        placeholder="Username"
      />
      <span className="text-sm text-red-800">{nameError.message}</span>
      <ion-icon name="person-outline"></ion-icon>
    </div>
  );
});

export default InputNameComponent;
