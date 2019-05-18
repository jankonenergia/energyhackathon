import React from 'react';
import { Query } from 'react-apollo';
import { Grid } from '@material-ui/core';
import gql from 'graphql-tag'
import Challenge from '../components/challenge'

export default class Challenges extends React.PureComponent {
  render() {
    const GET_MY_CHALLENGES = gql`
      query GetChallenges($userId: ID!) {
        getChallenges(userId: $userId) {
          _id,
          title,
          description,
          limit,
          from,
          to
        }
      }
    `
    const GET_FRIEND_CHALLENGES = gql`
    query GetFriends($id: String!) {
      getFriends(_id: $id) {
        friendId,
        friend {
          challenges {
            _id,
            title,
            description,
            limit,
            from,
            to
          }
        }
      }
    }
  `
    return (
      <React.Fragment>
        <Grid 
          container 
          spacing={40} style={{
            margin: 0,
            width: '100%',
          }} direction="row" justify="center">
          <Query query={GET_MY_CHALLENGES} variables={{ userId: localStorage.getItem('id') }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              return data.getChallenges && data.getChallenges.length > 0 && data.getChallenges.map((item) => {
                return <Grid item direction={"row"} xs={12} md={4} spacing={16}>
                  <Challenge title={item.title} description={item.description} id={item._id} key={item._id} /> 
                </Grid>
              })
            }}
          </Query>
          <Query query={GET_FRIEND_CHALLENGES} variables={{ id: localStorage.getItem('id') }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              return (data.getFriends && data.getFriends.length > 0) ? data.getFriends.map((item) => {
                return item.friend && item.friend.challenges && item.friend.challenges.map((ch) => {
                  return <Grid item direction={"row"} xs={12} md={4} spacing={16}>
                    <Challenge title={ch.title} description={ch.description} id={item._id} key={ch._id} /> 
                  </Grid>
                })
              }) : <p>Ei ystävähaasteita.</p>
            }}
          </Query>
        </Grid>
      </React.Fragment>
    );
  }
}