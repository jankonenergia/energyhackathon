import React from 'react';
import { Grid } from '@material-ui/core';
import '../App.scss';

const Login = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
  >
    <Grid item xs={3}>
      <p>loginform</p>
    </Grid>

  </Grid>
);


export default Login;
