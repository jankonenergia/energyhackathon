import React from 'react';
import '../App.scss';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grid } from '@material-ui/core';
import TodaysSavingsChart from '../components/charts/todaysSavingsChart'
import TotalConsumptionChart from '../components/charts/totalConsumptionChart'
import SavedConsumptionForm from '../components/savedConsumptionForm'
import NewChallengeForm from '../components/newChallengeForm'
import NewMeasurementForm from '../components/newMeterMeasurementForm'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class HomePage extends React.PureComponent {
  
  render() {
    const GET_USER_CONSUMPTIONS = gql`
    query Consumptions($id: String!, $from: Date!, $to: Date!, $yesterday: Date!) {
      getSavedConsumptions(userId: $id, from: $from, to: $to) {
        consumptionType {
          title,
          description,
          amount, 
          amountType
        },
        value
      },
      measurements(userId: $id, from: $yesterday, to: $to) {
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
    var yesterday = new Date();
    tomorrow.setDate(today.getDate()+1);
    yesterday.setDate(today.getDate()-1);

    return (
      <Grid
        container
        direction="row"
        spacing={16}
        alignItems="left"
        justify="center"
        style={{overflow: 'hidden'}}
      >
        <Query query={GET_USER} variables={{ id: localStorage.getItem('id') }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return <Query query={GET_USER_CONSUMPTIONS} variables={{ id: localStorage.getItem('id'), from: today.toDateString(), to: tomorrow.toDateString(), yesterday: yesterday.toDateString() }}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                return <React.Fragment>
                  <TodaysSavingsChart data={data.getSavedConsumptions} measurements={data.measurements} />
                  <TotalConsumptionChart />
                  <Grid item container direction={"column"} xs={12} md={4}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <h1>Säästin energiaa seuraavanlaisesti</h1>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <SavedConsumptionForm />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <h1>Uusi haaste</h1>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <NewChallengeForm />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <h1>Uusi mittarilukema</h1>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <NewMeasurementForm />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                </React.Fragment>
              }}
            </Query>
          }}
        </Query>
      </Grid>
    );
  }
}