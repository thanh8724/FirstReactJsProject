import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./Input.css";

const InputEmaiComponent = forwardRef((props, ref) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ status: false, message: "" });

  const handleEmailBlur = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailValue === "") {
      setEmailError({ status: true, message: "Vui lòng điền địa chỉ email!" });
    } else if (!emailRegex.test(emailValue)) {
      setEmailError({ status: true, message: "Địa chỉ email không hợp lệ!" });
    } else {
      setEmailError({ status: false, message: "" });
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError({ status: false, message: "" });
  };
  // gửi thông tin cần thiết lên component parent
  useImperativeHandle(ref, () => ({
    inputEmailError: email === "" ? true : emailError.status,
  }));
  return (
    <div
      className={`form__group flex flex-col gap-2 relative ${
        emailError.status ? "formError" : ""
      }`}
    >
      <input
        type="text"
        name="email"
        value={email}
        onBlur={handleEmailBlur}
        onInput={handleEmailChange}
        onChange={props.handleForm}
        className="w-full input focus:outline-none 
        transition-colors duration-300 focus:border-[#008080]"
        placeholder="Example@gmail.com"
      />
      <span className="text-sm text-red-800">{emailError.message}</span>
      <ion-icon name="mail-outline" />
    </div>
  );
});

export default InputEmaiComponent;
