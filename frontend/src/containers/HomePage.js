import React from 'react';
import '../App.scss';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grid } from '@material-ui/core';
import { MainDrawer } from '../components';
import TotalSavingsChart from '../components/charts/totalSavingsChart'
import Home from './Home';

export default class HomePage extends React.PureComponent {
  render() {
    const GET_USER_CONSUMPTIONS = gql`
    query Consumptions($id: ID!, $from: Date!, $to: Date!) {
      getSavedConsumptions(userId: $id, from: $from, to: $to) {
        consumptionType {
          title,
          description,
          amount, 
          amountType
        },
        value
      }
    }
    `;

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
      <Grid
        container
        spacing={0}
        direction="row"
        wrap="nowrap"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <Query query={GET_USER} variables={{ id: localStorage.getItem('id') }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              return <Query query={GET_USER_CONSUMPTIONS} variables={{ id: localStorage.getItem('id'), from: "2019-05-01", to: new Date().toString() }}>
                {({ loading, error, data }) => {
                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;
                  return <React.Fragment>
                    <TotalSavingsChart data={[{ angle: 1, label: "Hygienia", subLabel: "foo" }, { angle: 5, label: "Valaistus", subLabel: "bar" }, { angle: 2, label: "Muu", subLabel: "foobar" }]} />
                  </React.Fragment>
                }}
              </Query>
            }}
          </Query>
          <p>Niinku you know sä oot nyt hei logged in</p>
        </Grid>
      </Grid>
        );
      }
}