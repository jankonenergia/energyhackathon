import React from 'react';
import '../App.scss';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grid } from '@material-ui/core';
import { MainDrawer } from '../components';
import TodaysSavingsChart from '../components/charts/todaysSavingsChart'
import SavedConsumptionForm from '../components/savedConsumptionForm'
import Home from './Home';
import xAxis from 'react-vis/dist/plot/axis/x-axis';

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

    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);

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
              return <Query query={GET_USER_CONSUMPTIONS} variables={{ id: localStorage.getItem('id'), from: today.toDateString(), to: tomorrow.toDateString() }}>
                {({ loading, error, data }) => {
                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;
                  return <React.Fragment>
                    <TodaysSavingsChart data={data.getSavedConsumptions} />
                    <SavedConsumptionForm />
                  </React.Fragment>
                }}
              </Query>
              
            }}
          </Query>
        </Grid>
      </Grid>
    );
  }
}