function Select({ children }) {
  return (
    <select
      className={`w-full rounded border border-gray-300 bg-gray-50 px-4
       py-2 text-lg font-medium shadow-sm`}
    >
      {children}
    </select>
  );
}

export default Select;
