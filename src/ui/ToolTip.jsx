import { useState } from "react";

function ToolTip({ text, children, onClick, className }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`text-xl ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
      {isHovered && (
        <div className="absolute bottom-full mb-2">
          <span className="rounded-md bg-gray-700 p-1 text-xs text-white">
            {text}
          </span>
        </div>
      )}
    </div>
  );
}

export default ToolTip;
