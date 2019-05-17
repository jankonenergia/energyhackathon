import React from 'react';
import '../App.scss';
import { Grid, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import logo from '../images/logo.png';
import { Home, People, GolfCourse } from '@material-ui/icons';
import colors from '../theme/colors.scss';

export default class MainDrawer extends React.PureComponent {
  render() {
    return (
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{
          paperAnchorDockedLeft: 'drawer'
        }}
        style={{ backgroundColor: '#fff' }}
      >
        <Grid container direction="column" style={{ height: '100%', maxWidth: '100%' }} justify="center" alignContent="center" spacing={32}>
          <img src={logo} className="logo" alt="logo" />
          <List>
            <ListItem style={{ textAlign: 'center' }} button key="koti">
              <Grid alignItems="center" container direction="column" wrap="nowrap">
                <Home style={{ fontSize: 48 }} />
                <ListItemText classes={{ primary: 'drawerLi' }} primary="Home" />
              </Grid>
            </ListItem>
            <ListItem style={{ textAlign: 'center' }} button key="ystävät">
              <Grid alignItems="center" container direction="column" wrap="nowrap">
                <People style={{ fontSize: 48 }} />
                <ListItemText classes={{ primary: 'drawerLi' }} primary="Friends" />
              </Grid>
            </ListItem>
            <ListItem style={{ textAlign: 'center' }} button key="haasteeni">
              <Grid alignItems="center" container direction="column" wrap="nowrap">
                <GolfCourse style={{ fontSize: 48 }} />
                <ListItemText classes={{ primary: 'drawerLi' }} primary="My challenges" />
              </Grid>
            </ListItem>
          </List>
        </Grid>
      </Drawer>
    );
  }
}