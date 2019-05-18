import React from 'react';
import '../App.scss';
import house from '../images/house.png';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Grid } from '@material-ui/core';

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
    return (
      <Grid container direction="row" justify="center">
        <Query query={GET_USER_FRIENDS} variables={{ id: localStorage.getItem('id') }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            console.log(data.getFriends);
            return data.getFriends.map(({ friend }) => (
              <Grid item md={2}>
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
    );
  }
}