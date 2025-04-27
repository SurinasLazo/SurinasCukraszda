import { useState, useEffect } from "react";

/**
 * Debounce hook: csak akkor adja vissza az új value-t,
 * ha az a delay (ms) alatt nem változott.
 */
export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
