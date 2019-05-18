import React from 'react';
import '../App.scss';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import logo from '../images/logo.png';
import { Home, People, GolfCourse } from '@material-ui/icons';
import colors from '../theme/colors.scss';

export default class BottomNav extends React.Component {

  goTo = page => {
    this.props.history.push(`/${page}`)
  }

  render() {
    const { history: { location: { pathname } } } = this.props;
    const value = pathname === '/home' ? 0 : pathname === '/friends' ? 1 : 2;
    return (
      <BottomNavigation
        showLabels
        style={{ position: 'fixed', bottom: 0, width: '100%' }}
        value={value}
      >
        <BottomNavigationAction onClick={() => this.goTo('home')} label="Home" icon={<Home />} />
        <BottomNavigationAction onClick={() => this.goTo('friends')} label="Friends" icon={<People />} />
        <BottomNavigationAction onClick={() => this.goTo('challenges')} label="Challenges" icon={<GolfCourse />} />
      </BottomNavigation>
    );
  }
}