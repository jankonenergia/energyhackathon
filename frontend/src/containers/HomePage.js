import React from 'react';
import '../App.scss';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grid } from '@material-ui/core';
import { MainDrawer } from '../components';
import Home from './Home';

export default class HomePage extends React.PureComponent {
  render() {
    const GET_USER = gql`
    query User($id: String!) {
      user(id: $id) {
        _id
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
          <Query query={GET_USER} variables={{ id: localStorage.getItem('id') }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              if (data) return <Home user={data.user} />
            }}
          </Query>
        </Grid>
      </React.Fragment>
    );
  }
}