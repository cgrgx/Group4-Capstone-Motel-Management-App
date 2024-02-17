import React from "react";

const Input = React.forwardRef((props, ref) => {
  // Add all other props to the input for flexibility
  return (
    <input
      ref={ref}
      className="w-full rounded-sm border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm"
      {...props} // Spread the rest of the props to the input element
    />
  );
});
Input.displayName = "Input";
export default Input;
