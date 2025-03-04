import React from "react";
import { aclonica } from "../font/fonts";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
  className?: string;
  width?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  alignment = "center",
  className = "",
  width = "w-16",
}) => {
  const alignmentStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const selectedAlignment = alignmentStyles[alignment];

  return (
    <div
      className={`w-full flex flex-col justify-center items-center ${selectedAlignment} ${className}`}
    >
      {/* {subtitle && (
        <p className="text-secondary text-lg font-medium mb-2">{subtitle}</p>
      )} */}
      <h2
        className={`${aclonica.className} text-2xl lg:text-4xl font-bold text-primary`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-secondary text-sm lg:text-base font-medium mb-2 px-2">
          {subtitle}
        </p>
      )}
      {/* <div className={`"mt-2 ${width} h-1 bg-accent mx-auto"`}></div> */}
    </div>
  );
};

export default SectionTitle;
