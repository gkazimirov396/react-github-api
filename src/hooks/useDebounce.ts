import { useDebugValue, useEffect, useState } from 'react';

function useDebounce(value: string, delay = 500) {
  const [debounced, setDebounced] = useState<string>(value);

  useEffect(() => {
    const timerId = setTimeout(setDebounced, delay, value);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  useDebugValue(debounced);

  return debounced;
}

export default useDebounce;
