import React from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import '../App.scss';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import RegisterForm from '../components/RegisterForm';

export default class Register extends React.PureComponent {

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
    const POST_USER = gql`
      mutation CreateUser($user: UserInput!) {
        createUser(user: $user) {
          _id,
          firstName
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
        <Grid item md={3} xs={9}>
          <Mutation mutation={POST_USER}>
            {(postMutation, { data, error, loading }) => {
              if (data) {
                return (
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Awesome!!"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Welcome to Jankko's Energy {data.firstName}!!!! <br />
                        Now go ahead and login and save the <b>world</b>!
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} variant="contained" color="primary" autoFocus>
                        F**k yeah!
                      </Button>
                    </DialogActions>
                  </Dialog>
                )
              }
              if (loading) return <p>Loading...</p>;

              return (
                <React.Fragment>
                  {data && <p>Registar succ</p>}
                  <RegisterForm
                    onSubmit={(user) => postMutation({ variables: { user } })} noValidate autoComplete="false" />
                  <p>{(error || loading) ? error ? console.log(error) : 'loading' : ''}</p>
                  {data && <p>Registar succ</p>}
                </React.Fragment>
              )
            }}
          </Mutation>
        </Grid>
      </Grid>
    );
  }
}
