import React from "react";

// Define sizes and variations mapping to Tailwind classes
const sizeClasses = {
  small:
    "text-sm py-1 px-2 uppercase font-medium text-center ring-1 ring-inset ring-gray-300",
  medium: "text-base py-3 px-4 font-medium ring-1 ring-inset ring-gray-300",
  large: "text-lg py-3 px-6 font-medium ring-1 ring-inset ring-gray-300",
};

const variationClasses = {
  orange: " bg-orange-600 hover:bg-orange-700 text-gray-100",
  gray: " bg-gray-50  hover:bg-gray-300",
  red: " bg-red-600 text-gray-100 hover:bg-red-700",
  indigo: " bg-indigo-600 hover:bg-indigo-700 text-gray-100",
};

// Button component using Tailwind classes based on props
const Button = ({
  children,
  variation = "orange",
  size = "medium",
  ...props
}) => {
  // Combine the classes based on the props
  const classes = `${sizeClasses[size]} ${variationClasses[variation]} pointer rounded shadow-sm`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
