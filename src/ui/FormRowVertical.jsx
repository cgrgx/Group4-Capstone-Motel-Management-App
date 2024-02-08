function FormRowVertical({ label, error, children }) {
  return (
    <div className=" flex flex-col gap-1">
      {label && (
        <label htmlFor={children.props.id} className="font-semibold">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-red-700">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
