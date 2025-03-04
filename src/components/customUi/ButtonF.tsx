import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" |"light";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string; // Allow passing additional classes if needed
}

const ButtonF: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  const baseStyles = "px-6 py-2 rounded-md text-sm md:text-base font-semibold transition duration-300";
  
  const variants = {
    primary: "bg-primary text-textLight hover:bg-accent",
    light: "bg-background text-primary hover:bg-accent",
    secondary: "bg-secondary text-textLight hover:bg-primary",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-textLight",
  };

  const selectedStyles = variants[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${selectedStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonF;
