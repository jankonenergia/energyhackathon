import React from 'react';
import asiakunnossa from '../images/logo.png';
import '../App.scss';
import Person from '../Person';
import { Button } from '@material-ui/core';
export default class LandingPage extends React.PureComponent {
  componentWillMount() {
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