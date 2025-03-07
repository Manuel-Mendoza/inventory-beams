import React from "react";

const Button = ({ name, click, style, bg }) => {
  return (
    <button
      onClick={click}
      className={` bg-green-500 hover:${bg ? bg + "-700" : "bg-green-700"} text-white font-bold py-2 px-4 rounded-full cursor-pointer min-md:w-1/4 ${style}`}
    >
      {name}
    </button>
  );
};

export default Button;
