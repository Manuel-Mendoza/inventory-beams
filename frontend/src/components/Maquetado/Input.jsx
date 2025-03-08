import React from "react";

const Input = ({ placeholder, type, style, inputmode, onChange }) => {
  return (
    <input
      className={`p-2 border rounded mb-3 w-full ${style}`}
      type={type}
      placeholder={placeholder}
      inputMode={inputmode}
      onChange={onChange}
    />
  );
};

export default Input;
