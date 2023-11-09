import { useEffect, useState } from 'react';

function useDebounce(value: string, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(setDebounced, delay, value);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debounced;
}

export default useDebounce;
