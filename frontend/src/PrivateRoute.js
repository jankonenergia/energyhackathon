import React from 'react';
import { Route, Redirect } from "react-router-dom";
import MainWrapper from './containers/MainWrapper';

export default class PrivateRoute extends React.Component {
  componentWillMount() {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjZGZlOWM4MTM1NDczMDAxMzVhZmFkYyIsIm5pY2tuYW1lIjoidGt1ZW5lcmd5IiwiZmlyc3ROYW1lIjoiVHVya3UiLCJsYXN0TmFtZSI6IkVuZXJneWhhY2siLCJjcmVhdGVkQXQiOiIyMDE5LTA1LTE4VDExOjE3OjI4LjQyOFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA1LTE4VDExOjE3OjI4LjQyOFoiLCJfX3YiOjB9LCJpYXQiOjE1NTgxNzgyNTd9.S6z5_dFuVVf43wE6YacNooRnL-EP0jMVBmu4SxPo154')
    localStorage.setItem('id', '5cdfe9c813547300135afadc')
  }
  render() {
    const { component: Component, ...rest } = this.props
    return (
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
  }
}
