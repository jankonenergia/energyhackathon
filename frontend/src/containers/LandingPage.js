import React from 'react';
import asiakunnossa from '../images/logo.png';
import '../App.scss';
import Person from '../Person';
import { Button } from '@material-ui/core';
export default class LandingPage extends React.PureComponent {
  componentWillMount() {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjZGZlOWM4MTM1NDczMDAxMzVhZmFkYyIsIm5pY2tuYW1lIjoidGt1ZW5lcmd5IiwiZmlyc3ROYW1lIjoiVHVya3UiLCJsYXN0TmFtZSI6IkVuZXJneWhhY2siLCJjcmVhdGVkQXQiOiIyMDE5LTA1LTE4VDExOjE3OjI4LjQyOFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA1LTE4VDExOjE3OjI4LjQyOFoiLCJfX3YiOjB9LCJpYXQiOjE1NTgxNzgyNTd9.S6z5_dFuVVf43wE6YacNooRnL-EP0jMVBmu4SxPo154')
    localStorage.setItem('id', '5cdfe9c813547300135afadc')
    if (localStorage.getItem('token')) {
      this.props.history.push('/home');
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {process.env.REACT_BUILD_VERSION}
        </header>
        <div className="container">
          <div className="query">
            <h1>Jankon Energia</h1>
            <img src={asiakunnossa} style={{height: "320px"}} alt="logo" />
            <p>Asia kunnossa.</p>
            <br />
            <Person goToRegister={() => this.props.history.push('/register')} goToLogin={() => this.props.history.push('/login')}/>
          </div>
        </div>
      </div>
    );
  }
}