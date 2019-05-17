import React from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import '../App.scss';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import { HousingForm } from '../components';

export default class CreateHousing extends React.PureComponent {

  state = {
    open: true,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const POST_HOUSE = gql`
      mutation createOrUpdateHousing($housing: HousingInput!) {
        createOrUpdateHousing(housing: $housing) {
          _id,
        }
      }
    `;
    return (
      <Mutation mutation={POST_HOUSE}>
        {(postMutation, { data, error, loading }) => {
          if (data) {
            return (
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"You're the best!!"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Wow! You're serious about saving some electricity {data.firstName}!! <br />
                    The earth loves you 😘!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} variant="contained" color="primary" autoFocus>
                    I love you too earth!
                  </Button>
                </DialogActions>
              </Dialog>
            )
          }
          if (loading) return <p>Loading...</p>;

          return (
            <HousingForm
              onSubmit={(house) => {console.log(house); postMutation({ variables: {housing: house}})}} noValidate autoComplete="false"
              user={this.props.user} />
          )
        }}
      </Mutation>
    );
  }
}
