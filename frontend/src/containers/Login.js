import React from 'react';
import { Grid } from '@material-ui/core';
import '../App.scss';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import LoginForm from '../components/LoginForm';

export default class Login extends React.PureComponent {

  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.history.push('/login');
    this.setState({ open: false });
  };

  render() {
    const LOGIN_USER = gql`
    mutation LogIn($nickname: String!, $password: String!) {
      logIn(nickname: $nickname, password: $password) {
        _id,
        token
      }
    }
    `
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Mutation mutation={LOGIN_USER} >
            {(postLogin, { data, error, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (data) {
                localStorage.setItem('token', data.logIn.token);
                localStorage.setItem('id', data.logIn._id);
                this.props.history.push(this.props.from ? this.props.from : '/home');
              }
              return (
                <React.Fragment>
                  <LoginForm onSubmit={(nickname, password) => postLogin({ variables: { nickname: nickname, password: password } })} noValidate autoComplete="false" />
                </React.Fragment>
              )
            }}
          </Mutation>
        </Grid>
      </Grid>
    );
  }
}
