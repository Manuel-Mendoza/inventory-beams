import React from "react";

const Input = ({value, placeholder, type, style, inputmode, onChange }) => {
  return (
    <input
    value={value}
      className={`outline-0 p-2 border rounded w-full ${style}`}
      type={type}
      placeholder={placeholder}
      inputMode={inputmode}
      onChange={onChange}
    />
  );
};

export default Input;
