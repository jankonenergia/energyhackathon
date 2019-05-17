import React from 'react';
import { Switch, Route } from "react-router-dom";
import { HomePage, Login, Register, NotFound, LandingPage } from './containers';
import PrivateRoute from './PrivateRoute'

const App = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    {console.log(localStorage.getItem('token'))}
    <PrivateRoute exact path="/home" component={HomePage} />
    <Route component={NotFound} />
  </Switch>
);

export default App;
