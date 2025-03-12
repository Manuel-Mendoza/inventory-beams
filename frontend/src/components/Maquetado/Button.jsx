import React from "react";

const Button = ({ name, click, style, bg, id }) => {
  // Definir una clase de color base y hover basada en el prop bg
  const bgColorClass = bg ? `bg-${bg}-500` : "bg-green-500";
  const hoverColorClass = bg ? `hover:bg-${bg}-700` : "hover:bg-green-700";
    
  return (
    <button
      id={id}
      onClick={click}
      className={`${bgColorClass} ${hoverColorClass} text-white font-bold py-2 px-4 rounded-full cursor-pointer min-md:w-1/4 ${style || ""}`}
    >
      {name}
    </button>
  );
};

export default Button;
