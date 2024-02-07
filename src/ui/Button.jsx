import React from "react";

// Define sizes and variations mapping to Tailwind classes
const sizeClasses = {
  small: "text-sm py-1 px-2 uppercase font-semibold text-center",
  medium: "text-base py-3 px-4 font-medium",
  large: "text-lg py-3 px-6 font-medium",
};

const variationClasses = {
  orange: " bg-orange-600 border border-gray-300 hover:bg-orange-800",
  gray: "bg-gray-200 border border-gray-300 hover:bg-gray-300",
  red: " bg-red-700 hover:bg-red-800",
  green: " bg-green-700 border border-gray-300 hover:bg-red-800",
};

// Button component using Tailwind classes based on props
const Button = ({
  children,
  variation = "orange",
  size = "medium",
  ...props
}) => {
  // Combine the classes based on the props
  const classes = `${sizeClasses[size]} ${variationClasses[variation]} rounded shadow-sm`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
