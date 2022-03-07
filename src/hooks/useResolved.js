import { useState, useEffect } from 'react';

//this hook is used to determine when an undefined value has been updated to the expected data type
//overall this hook is used to tell when a value is not undefined anymore
const useResolved = (
  ...vals
) => {
  const [resolved, setResolved] = useState(false);

  //going through all passed in value and determining if they are undefined
  //if undefined, then it has yet to resolve and value will be set to false
  useEffect(() => {
    setResolved(vals.every(v => v !== undefined));
  }, [vals]);

  //if it is resolved, it will return true
  return resolved;
};

export default useResolved