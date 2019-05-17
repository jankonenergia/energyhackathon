import React from 'react';
import { Switch, Route } from "react-router-dom";
import { HomePage, Login, Register, NotFound, LandingPage, LogOut, Challenges, Friends } from './containers';
import PrivateRoute from './PrivateRoute'

const App = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <PrivateRoute exact path="/home" component={HomePage} />
    <PrivateRoute exact path="/friends" component={Friends} />
    <PrivateRoute exact path="/challenges" component={Challenges} />
    <PrivateRoute exact path="/logout" component={LogOut} />
    <Route component={NotFound} />
  </Switch>
);

export default App;
