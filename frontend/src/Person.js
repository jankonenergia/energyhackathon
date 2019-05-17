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
        data.me ? <p>Hello, {data.me.firstName}!</p> : <React.Fragment><p>Connection established</p><br /> <Button onClick={() => props.goToRegister()} color="primary" variant="contained">Register</Button></React.Fragment>
      );
    }}
  </Query>
);

export default Person