import React from 'react';
import '../App.scss';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grid } from '@material-ui/core';
import { MainDrawer, BottomNav } from '../components';
import Home from './Home';

export default class MainWrapper extends React.PureComponent {

  componentWillMount() {
    window.addEventListener('resize', this.resized);
  }

  resized = () => {
    console.log('resize')
    this.forceUpdate();
  }

  render() {
    const isMobile = window.innerWidth <= 500;
    if (isMobile) {
      return (
        <React.Fragment>
          <Grid
            container
            direction="row"
            wrap="nowrap"
            style={{ minHeight: '100vh', paddingBottom: '100px' }}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '100vh' }}
              item
              xs={12}
            >
              {this.props.children}
            </Grid>
          </Grid>
          <BottomNav history={this.props.history} />
        </React.Fragment>
      )
    }
    return (
      <Grid
        container
        direction="row"
        wrap="nowrap"
        style={{ minHeight: '100vh', overflowX: 'hidden' }}
      >
        <Grid item xs={2} lg={1} >
          <MainDrawer history={this.props.history} />
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
          item
          xs={10}
          lg={11}
        >
          {this.props.children}
        </Grid>
      </Grid>
    );
  }
}