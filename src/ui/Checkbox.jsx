function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="transform-origin-0 h-6 w-6 text-orange-600 outline-none"
      />
      <label
        htmlFor={!disabled ? id : ""}
        className="flex flex-1 items-center gap-2"
      >
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
