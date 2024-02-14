function FormRow({ label, error, children, hasButton }) {
  return (
    <div
      className={`gap-y-2.4 grid items-center gap-x-6 py-3 ${hasButton ? "grid-cols-1 " : "grid-cols-[24rem_1fr_1.2fr] border-b border-gray-100 "} first:pt-0 last:pb-0`}
    >
      {label && (
        <label
          // htmlFor={children.props?.id}
          className="h-18 flex items-center text-lg font-semibold"
        >
          {label}
        </label>
      )}
      <div
        className={`flex-grow ${hasButton ? "" : "flex flex-col items-start gap-1"} `}
      >
        {children}
        {error && <span className="text-xs text-red-700">{error}</span>}
      </div>
    </div>
  );
}

export default FormRow;
