import { useState, useEffect } from 'react';

//this hook is created to make sure not too many requests are sent to the server when the user
//is typing. This will mainly be used when searching for usernames, and delaying the server request
//until the user is done typing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay); //uses a timeout to debbounce
    return () => clearTimeout(handler);
  }, [value, delay]); //adds a value based on entered valued in milliseconds

  return debouncedValue;
};

export default useDebounce;