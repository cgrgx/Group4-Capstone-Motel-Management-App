import React from "react";

const FileInput = React.forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      type="file"
      className="
      file:font-inherit w-56 rounded-sm
      text-base file:mr-3 file:cursor-pointer file:rounded-md file:border-none
      file:bg-orange-600 file:px-3
      file:py-2 file:font-medium
      file:text-gray-50 file:transition-colors file:duration-200
      hover:file:bg-orange-700"
      {...props} // Spread the rest of the props to the input element
    />
  );
});
FileInput.displayName = "FileInput";
export default FileInput;
