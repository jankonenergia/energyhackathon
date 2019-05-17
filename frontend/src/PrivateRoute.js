import React from 'react';
import { Route, Redirect } from "react-router-dom";
import MainWrapper from './containers/MainWrapper';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      localStorage.getItem('token')
        ? (
          <MainWrapper history={props.history}>
            <Component {...props} />
          </MainWrapper>
        )
        : <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
)

export default PrivateRoute;