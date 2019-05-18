import React from 'react';
import '../App.scss';
import house from '../images/house.png';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Grid } from '@material-ui/core';
import { AddFriendForm } from '../components';

export default class Friends extends React.PureComponent {

  capitalize = (str) => {
    return str.charAt(0) + str.slice(1).toLowerCase()
  }

  render() {
    const GET_USER_FRIENDS = gql`
    query GetFriends($id: String!) {
      getFriends(_id: $id) {
        friend {
          firstName,
          lastName,
          nickname,
          housing {
            housingType,
            heatingType
          }
          challenges {
            title,
            description,
            to,
            from
          }
        }
      }
    }
  `;

    const ADD_FRIEND = gql`
  mutation AddFriend($userId: ID!, $nickname: String!) {
    addFriend(userId: $userId, nickname: $nickname) {
      friendId,
      friend {
        firstName
      }
    }
  }
`;
    return (
      <React.Fragment>
        <Grid container spacing={16} style={{
          margin: 0,
          width: '100%',
        }} direction="row" justify="center">
          <Query query={GET_USER_FRIENDS} variables={{ id: localStorage.getItem('id') }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              console.log(data.getFriends);
              if (data.getFriends.length === 0) return (
                <Mutation mutation={ADD_FRIEND} refetchQueries={['GetFriends']} >
                  {(addFriend, { data, error, loading }) => {
                    if (loading) return <p>Loading...</p>;
                    console.log(data)
                    return (
                      <AddFriendForm noFriends onSubmit={(nickname) => addFriend({ variables: { nickname: nickname, userId: localStorage.getItem('id') } })} noValidate autoComplete="false" />
                    )
                  }}
                </Mutation>
              );
              return data.getFriends.map(({ friend }) => (
                <Grid key={friend.nickname} item md={2}>
                  <Card style={{ maxWidth: '270px' }}>
                    <CardActionArea>
                      <CardMedia
                        image={house}
                        title="Eco house"
                        style={{ height: '250px', width: '270px' }}
                      />
                      <CardContent>
                        <h2 style={{ marginTop: 0 }}>{`${friend.firstName} ${friend.lastName} (${friend.nickname})`}</h2>
                        <p>
                          {friend.housing && (`${this.capitalize(friend.housing.housingType)}, ${this.capitalize(friend.housing.heatingType)}`)}
                        </p>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Haasta
                    </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }}
          </Query>
        </Grid>
        <Grid style={{
          margin: 0,
          width: '100%',
        }} container direction="row">
          <Grid item md={4}>
            <Mutation mutation={ADD_FRIEND} refetchQueries={['GetFriends']} >
              {(addFriend, { data, error, loading }) => {
                if (loading) return <p>Loading...</p>;
                console.log(data)
                return (
                  <AddFriendForm onSubmit={(nickname) => addFriend({ variables: { nickname: nickname, userId: localStorage.getItem('id') } })} noValidate autoComplete="false" />
                )
              }}
            </Mutation>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}