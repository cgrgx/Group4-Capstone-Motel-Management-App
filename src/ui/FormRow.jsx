import React from "react";

function FormRow({ label, error, children, hasButton }) {
  return (
    <div
      className={`gap-y-2.4 grid items-center gap-x-6 py-3 ${hasButton ? "grid-cols-1 " : "grid-cols-[24rem_1fr_1.2fr] border-b border-gray-100 "} first:pt-0 last:pb-0`}
    >
      {label && (
        <label htmlFor={children.props?.id} className="font-semibold">
          {label}
        </label>
      )}
      <div className={`flex-grow ${hasButton ? "" : "flex"}`}>{children}</div>
      {error && <span className="text-lg text-red-700">{error}</span>}
    </div>
  );
}

export default FormRow;
