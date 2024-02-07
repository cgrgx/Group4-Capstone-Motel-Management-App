import { useEffect } from "react";

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    // Function to call on outside click
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    // Add event listeners
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Only re-call effect if ref or handler changes
}

export default useOnClickOutside;
