import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button } from '@material-ui/core';

const GET_ME = gql`
  query {
    me {
      firstName
    }
  }
`;

const Person = (props) => (
  <Query query={GET_ME}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        data.me ? <p>Hello, {data.me.firstName}!</p> : <React.Fragment><Button onClick={() => props.goToRegister()} color="primary" variant="contained">Rekisteröidy</Button><br /><br /><Button onClick={() => props.goToLogin()} color="primary" variant="contained">Kirjaudu</Button></React.Fragment>
      );
    }}
  </Query>
);

export default Person