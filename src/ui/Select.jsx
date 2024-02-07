// src/ui/Select.js (assuming your Input component is in src/ui/Input.js)
import React from "react";

const Select = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className="block w-full rounded border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";
export default Select;
