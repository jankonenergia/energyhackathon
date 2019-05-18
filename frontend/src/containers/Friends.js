import React from 'react';
import '../App.scss';
import house from '../images/house.png';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Grid } from '@material-ui/core';
import { AddFriendForm } from '../components';
import colors from '../theme/colors.scss';

export default class Friends extends React.PureComponent {

  capitalize = (str) => {
    return str.charAt(0) + str.slice(1).toLowerCase()
  }

  getImg = () => {
    return <CardMedia
      image={'https://picsum.photos/200/300?grayscale'}
      title="Eco house"
      style={{ height: '250px', width: '270px' }}
    />
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
        <Grid container spacing={40} style={{
          margin: 0,
          width: '100%',
        }} direction="row" justify="center">
          <Grid item md={9}>
            <Card style={{ backgroundColor: colors.backgroundLight, padding: '16px' }}>
              <Grid container spacing={16} direction="row" wrap="wrap">
                <Query query={GET_USER_FRIENDS} variables={{ id: localStorage.getItem('id') }}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if (data.getFriends.length === 0) return (
                      <Mutation mutation={ADD_FRIEND} refetchQueries={['GetFriends']} >
                        {(addFriend, { data, error, loading }) => {
                          if (loading) return <p>Loading...</p>;
                          console.log(data)
                          return (
                            <AddFriendForm error noFriends onSubmit={(nickname) => addFriend({ variables: { nickname: nickname, userId: localStorage.getItem('id') } })} noValidate autoComplete="false" />
                          )
                        }}
                      </Mutation>
                    );
                    return data.getFriends.map(({ friend }) => {
                      console.log('friend')
                      const img = 'https://picsum.photos/200/300?grayscale';
                      return (<Grid key={friend.nickname} item md={3}>
                        <Card style={{ maxWidth: '270px' }}>
                          <CardActionArea>
                            {this.getImg()}
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
                      )
                    })
                  }}
                </Query>
              </Grid>
            </Card>
          </Grid>
          <Grid item md={3}>
            <Card style={{ backgroundColor: colors.backgroundLight, padding: '8px' }}>
              <Mutation mutation={ADD_FRIEND} refetchQueries={['GetFriends']} >
                {(addFriend, { data, error, loading }) => {
                  if (loading) return <p>Loading...</p>;
                  console.log(data)
                  return (
                    <AddFriendForm onSubmit={(nickname) => addFriend({ variables: { nickname: nickname, userId: localStorage.getItem('id') } })} noValidate autoComplete="false" />
                  )
                }}
              </Mutation>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}