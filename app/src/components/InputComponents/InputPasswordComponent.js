import React, { useState, forwardRef, useImperativeHandle } from "react";

const InputPasswordComponent = forwardRef((props, ref) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    status: false,
    message: "",
  });
  const [togglePassword, setTogglePassword] = useState(false);
  const handleTogglePassword = (event) => {
    togglePassword ? setTogglePassword(false) : setTogglePassword(true);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError({ status: false, message: "" });
  };
  const validatePassword = (event) => {
    if (event.target.value.length < 8) {
      setPasswordError({
        status: true,
        message: "Mật khẩu phải dài hơn 8 kí tự!",
      });
    } else if (event.target.value.length > 35) {
      setPasswordError({
        status: true,
        message: "Mật khẩu phải ngắn hơn 35 kí tự!",
      });
    } else {
      setPasswordError({ status: false, message: "" });
    }
  };
  // gửi thông tin cần thiết lên component parent
  useImperativeHandle(ref, () => ({
    inputPasswordError: password === "" ? true : passwordError.status,
  }));
  return (
    <div
      className={`form__group flex flex-col gap-2 relative ${
        passwordError.status ? "formError" : ""
      }`}
    >
      <input
        type={togglePassword ? "text" : "password"}
        name="password"
        value={password}
        onBlur={validatePassword}
        onInput={handlePasswordChange}
        onChange={props.handleForm}
        className="w-full input focus:outline-none 
        transition-colors duration-300 focus:border-[#008080]"
        placeholder="Password"
      />
      <span className="text-sm text-red-800">{passwordError.message}</span>
      <ion-icon
        onClick={handleTogglePassword}
        name={`lock-${togglePassword ? "open" : "closed"}-outline`}
        id="iconPassword"
      ></ion-icon>
    </div>
  );
});

export default InputPasswordComponent;
