// components/DebouncedInput.js

import { useState, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  leftIcon,
  ...props
}) => {
  const [value, setValue] = useState(initialValue || "");
  const debouncedCallback = useDebouncedCallback(
    (value) => onChange(value),
    debounce,
  );

  useMemo(() => setValue(initialValue), [initialValue]);

  return (
    <div className="py-3">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedCallback(e.target.value);
        }}
        className="mt-2 block h-11   w-full rounded border border-slate-300 p-2  px-4 text-sm text-gray-600  placeholder-[#515151] outline-0 focus:outline-1"
        {...props}
      />
    </div>
  );
};
