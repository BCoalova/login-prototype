import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from '../context/AuthContext';
import Dashboard from './Dashboard'
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile'


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={ Dashboard } />
          <PrivateRoute path='/profile' component={ Profile } />
          <Route path='/signup' component={ Signup } />
          <Route path='/login' component={ Login } />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App;
