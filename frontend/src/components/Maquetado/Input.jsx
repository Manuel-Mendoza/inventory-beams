import React from "react";

const Input = ({ placeholder, type, style, inputmode }) => {
  return (
    <input
      className={`p-2 border rounded mb-3 w-full ${style}`}
      type={type}
      placeholder={placeholder}
      inputMode={inputmode}
    />
  );
};

export default Input;
