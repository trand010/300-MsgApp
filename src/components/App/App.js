import { Switch, Route } from 'react-router-dom';
import Chat from "../Chat/Chat"
import Login from "../Login/Login"
import Signup from "../Registration/Registration"

//This will have the route paths to the login, chat, and signup page
//ex: localhost:3000/login
function App() {
  return (
    <div className='app'>
      <Switch>
        <Route path="/" exact component={Chat} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
};

export default App