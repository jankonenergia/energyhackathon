import React from 'react';
import '../App.scss';

export default class LogOut extends React.PureComponent {
  componentWillMount() {
    if (localStorage.getItem('token')) {
      localStorage.clear();
    }
    this.props.history.push('/login')
  }

  render() {
    return <p>Logging out...</p>
  }
}
