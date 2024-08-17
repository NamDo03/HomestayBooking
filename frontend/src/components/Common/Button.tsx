import React from "react";

type ButtonProps = {
  content: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  outline?: boolean;
  wfull?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  content,
  type = "button",
  outline,
  wfull,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={` rounded-lg py-2 px-6 md:py-3 md:px-10 hover:scale-105 duration-300 ${
        wfull ? "w-full" : ""
      }
        ${
          outline
            ? "bg-white border border-black text-black"
            : "bg-gradient-to-r from-main-2 to-main-3 text-white"
        }
        `}
    >
      {content}
    </button>
  );
};

export default Button;
