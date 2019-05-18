import React from 'react';
import '../App.scss';
import { Grid, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import logo from '../images/logo.png';
import { Home, People, GolfCourse, ExitToApp } from '@material-ui/icons';
import colors from '../theme/colors.scss';

export default class FriendCard extends React.Component {

  goTo = page => {
    this.props.history.push(`/${page}`)
  }

  render() {
    const { history: { location: { pathname } } } = this.props;
    return (
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{
          paperAnchorDockedLeft: 'drawer'
        }}
        style={{ backgroundColor: '#fff' }}
      >
        <Grid container direction="column" style={{ height: '100%', maxWidth: '100%', paddingLeft: '12px' }} justify="center" alignContent="center" spacing={32}>
          <img src={logo} className="logo" alt="logo" />
          <List>
            <ListItem onClick={() => this.goTo('home')} style={{ textAlign: 'center' }} button key="koti">
              <Grid alignItems="center" container direction="column" wrap="nowrap">
                <Home style={{ fontSize: 48, color: 'gray', color: pathname === '/home' ? 'white' : 'gray' }} />
                <ListItemText style={{ color: pathname === '/home' ? 'white' : 'gray' }} classes={{ primary: 'drawerLi'}} primary="Home" />
              </Grid>
            </ListItem>
            <ListItem onClick={() => this.goTo('friends')} style={{ textAlign: 'center' }} button key="ystävät">
              <Grid alignItems="center" container direction="column" wrap="nowrap">
                <People style={{ fontSize: 48, color: pathname === '/friends' ? 'white' : 'gray'}} />
                <ListItemText  style={{ color: pathname === '/friends' ? 'white' : 'gray' }} classes={{ primary: 'drawerLi'}} primary="Friends" />
              </Grid>
            </ListItem>
            <ListItem onClick={() => this.goTo('challenges')} style={{ textAlign: 'center' }} button key="haasteeni">
              <Grid alignItems="center" container direction="column" wrap="nowrap">
                <GolfCourse style={{ fontSize: 48, color: pathname === '/challenges' ? 'white' : 'gray' }} />
                <ListItemText  style={{ color: pathname === '/challenges' ? 'white' : 'gray' }} classes={{ primary: 'drawerLi' }} primary="My challenges" />
              </Grid>
            </ListItem>
            <ListItem onClick={() => this.goTo('logout')} style={{ textAlign: 'center' }} button key="logout">
              <Grid alignItems="center" container direction="column" wrap="nowrap">
                <ExitToApp style={{ fontSize: 48, color: 'gray' }} />
                <ListItemText  classes={{ primary: 'drawerLi', color: 'gray' }} primary="Logout" />
              </Grid>
            </ListItem>
          </List>
        </Grid>
      </Drawer>
    );
  }
}