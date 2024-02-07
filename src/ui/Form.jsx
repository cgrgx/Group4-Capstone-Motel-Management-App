import React from "react";

const Form = ({ type = "regular", children, ...props }) => {
  // Define base classes for all forms
  let baseClasses = "overflow-hidden text-base font-normal";

  // Add conditional classes based on the type prop
  const typeClasses =
    type === "regular"
      ? "p-6 bg-gray-50 border border-grey-100 rounded-md"
      : "w-[80rem]";

  // Combine all classes
  const classes = `${baseClasses} ${typeClasses}`;

  return (
    <form className={classes} {...props}>
      {children}
    </form>
  );
};

export default Form;
