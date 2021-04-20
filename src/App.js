import Public from './components/Public';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import CreatePost from './components/CreatePost';
import PrivateRoute from './components/widgets/PrivateRoute';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <Container>
        <div className="w-100">
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Public}/>
              <PrivateRoute path="/create-post" component={CreatePost}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
            </Switch>
          </AuthProvider>
        </Router>
        </div>
      </Container>
    </>
  );
}

export default App;
