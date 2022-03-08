import { Switch, Route, useHistory } from 'react-router-dom';
import Chat from "./Chat"
import Login from "./Login/Login"
import Signup from "./Registration/Registration"
import useAuth from "../hooks/useAuth"
import useResolved from "../hooks/useResolved"
import {useEffect} from 'react';
import {ChatProvider} from '../chatcontext';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser); //using the useResolved hook
  //undfined means it false, null means true

  //if user is already logged in, this will make the user
  //not see the login or registration page and redirect to chat page
  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? '/' : '/login');  //if they are not logged in, it will redirect to login page
    }
  }, [authResolved, authUser, history]);

//This will have the route paths to the login, chat, and signup page
//ex: localhost:3000/login
  return authResolved ? (
    <ChatProvider authUser={authUser}>
    <div className='app'>
      <Switch>
        <Route path="/" exact component={Chat} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
    </ChatProvider>
  ) : (
   <>Loading...</>
  );
};

export default App