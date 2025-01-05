import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
  className?: string; // Additional classes if needed
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  alignment = "center",
  className = "",
}) => {
  const alignmentStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const selectedAlignment = alignmentStyles[alignment];

  return (
    <div className={`w-full ${selectedAlignment} ${className}`}>
      {subtitle && (
        <p className="text-secondary text-lg font-medium mb-2">{subtitle}</p>
      )}
      <h2 className="text-2xl lg:text-4xl font-bold text-primary">{title}</h2>
      <div className="mt-2 w-16 h-1 bg-accent mx-auto"></div>
    </div>
  );
};

export default SectionTitle;
