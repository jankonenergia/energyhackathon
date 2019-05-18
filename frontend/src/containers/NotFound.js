import React from 'react';
import asiakunnossa from '../images/asiakunnossa.gif';
import { Grid } from '@material-ui/core';
import '../App.scss';

const NotFound = () => (
  <Grid
    container
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
  >
    <Grid item md={3}>
      <p>404 Page not found</p>
      <img src={asiakunnossa} className="jankko" alt="logo" />
    </Grid>

  </Grid>
);


export default NotFound;
