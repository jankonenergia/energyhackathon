import React from 'react';
import asiakunnossa from './images/asiakunnossa.gif';
import './App.scss';
import Person from './Person';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {process.env.TRAVIS_BUILD_NUMBER}
      </header>
      <div className="container">
        <div className="query">
          <Person />
          <img src={asiakunnossa} className="jankko" alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default App;
