import React from 'react';
import '../App.scss';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grid } from '@material-ui/core';
import { MainDrawer } from '../components';

export default class HomePage extends React.PureComponent {
  render() {
    const GET_USER = gql`
    query User($id: String!) {
      user(id: $id) {
        firstName,
        lastName,
        housing {
          _id
        },
        challenges {
          _id
        },
        friends {
          friend {
            firstName
          }
        }
      }
    }
  `;

    return (
      <React.Fragment>
        <MainDrawer />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={12}>
            <Query query={GET_USER} variables={{id: localStorage.getItem('id')}}>
              {({loading, error, data}) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                console.log(data);
                return <p>jee</p>
              }}
            </Query>
            <p>Niinku you know sä oot nyt hei logged in</p>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}