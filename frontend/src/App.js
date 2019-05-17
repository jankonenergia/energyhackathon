import React from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { HomePage, Login, Register, NotFound } from './containers';

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route component={NotFound} />
  </Switch>
);

export default App;
