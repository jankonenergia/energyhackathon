import React from 'react';
import '../App.scss';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grid } from '@material-ui/core';
import { MainDrawer } from '../components';
import Home from './Home';

export default class MainWrapper extends React.PureComponent {
  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="row"
        wrap="nowrap"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={1} >
          <MainDrawer history={this.props.history} />
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
          item
          xs={11}
        >
          {this.props.children}
        </Grid>
      </Grid>
    );
  }
}