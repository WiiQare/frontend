import { useEffect, useState } from "react";

export function useLocalStorage(key, fallbackValue) {
  const [value, setValue] = useState(fallbackValue);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    console.log("stored1", stored);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("stored2", value);
  }, [key, value]);
  console.log("value", value);

  return [value, setValue];
}
