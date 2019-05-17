import React from 'react';
import '../App.scss';
import CreateHousing from './CreateHousing';

export default class Home extends React.PureComponent {
  render() {
    console.log(this.props)
    if (this.props.user.housing === null) return <CreateHousing user={this.props.user} />
    return (
      <p>House done nice</p>
    );
  }
}