import React from "react";

const Button = ({ bgColor, color, text , height }) => {
  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color , height }}
      className={`pr-5 pl-5 rounded-md opacity-[1] hover:opacity-[0.9] transition-[0.5s]  text-14 md:text-16 `}
    >
      {text}
    </button>
  );
};

export default Button;
