import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_ME = gql`
  query {
    me {
      firstName
    }
  }
`;

const Person = () => (
  <Query query={GET_ME}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <p>Hello, {data.me.firstName}!</p>
      );
    }}
  </Query>
);

export default Person