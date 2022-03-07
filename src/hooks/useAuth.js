import fb from '../firebase';
import { useEffect, useState } from 'react';

//this custom hook is used to connect to firebase whenever the state changes
//when it does, it will return the authUser

//the three states are unresolved, no user, or user exists
//this will be used to determine if there are no user loggined in
const useAuth = () => {
  const [authUser, setAuthUser] = useState();
  useEffect(() => {
    const unsubscribe = fb.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user); //this means user is logged in 
      } else {
        setAuthUser(null); //if null, this means user is not logged in and it has been checked already
      }
    });
    //unsubscribe from this when the hook unmounts or next time this hook is called
    return unsubscribe;
  }, []);

  return {
    authUser,
  };
};

export default useAuth