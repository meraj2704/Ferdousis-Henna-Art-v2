import React from "react";

const HennaIcon: React.FC<{ size?: number, color?: string }> = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-leaf"
    >
      <path d="M11 21c-2.8-2.8-3.6-7.5-2.3-11.3C11.5 3.1 15 2 19 2c0 4-1 7.5-7.7 10.3-1.8.6-3 2-3 3.7 0 1.6 1.3 3 3 3z" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
};

export default HennaIcon;
