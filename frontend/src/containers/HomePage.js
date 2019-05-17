import React from 'react';
import asiakunnossa from '../images/asiakunnossa.gif';
import '../App.scss';
import Person from '../Person';
import { Button } from '@material-ui/core';

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {process.env.REACT_BUILD_VERSION}
        </header>
        <div className="container">
          <div className="query">
            <Person goToRegister={() => this.props.history.push('/register')} />
            <br />
            <img src={asiakunnossa} className="jankko" alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}