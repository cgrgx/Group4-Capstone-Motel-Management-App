import React from "react";

const Textarea = React.forwardRef((props, ref) => {
  return (
    <textarea
      ref={ref}
      className="h-32 w-56 resize-none rounded-md border border-gray-300 bg-gray-50 p-2 shadow-sm"
      {...props} // Spread the rest of the props to the input element
    />
  );
});
Textarea.displayName = "Textarea";
export default Textarea;
