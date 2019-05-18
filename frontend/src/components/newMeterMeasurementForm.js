import React from 'react'
import { Grid } from '@material-ui/core';
import { FormControl, TextField, Button } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
export default class NewMeterMeasurement extends React.Component {

    state = {
      value: "",
      date: new Date().toDateString()
    }

    clearState = () => {
      this.setState({value: "",date: new Date().toDateString()})
    }

    handleChange = input => event => {
      this.setState({ [input]: event.target.value });
    }

    render() {

      const MUTATION_CREATE_NEW_MEASUREMENT = gql`
        mutation CreateMeasurement($measurement: MeasurementInput!) {
            createMeasurement(measurement: $measurement) {
                _id
            }
        }
      `;
      return (
        <React.Fragment>
          <Grid item container direction={"column"} xs={12} md={4}>
            <h1>Uusi mittarilukema</h1>
            <FormControl fullWidth>
              <TextField
                label={"Mittarilukema"}
                type={"number"}
                inputProps={{
                  name: 'measurementValue',
                  id: 'measurementValue',
                }}
                onChange={this.handleChange('value')} 
                value={this.state.value} />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label={"Päivämäärä"}
                type={"date"}
                inputProps={{
                  name: 'measurementDate',
                  id: 'measurementDate',
                }}
                onChange={this.handleChange('date')} 
                value={this.state.date} />
            </FormControl>
            {this.state.value && this.state.date && <Mutation 
              mutation={MUTATION_CREATE_NEW_MEASUREMENT}
              refetchQueries={['Consumptions' ]}
              onCompleted={this.clearState}
              onError={error => `Error! ${error.message}`}
            >
              {createItem => (
                <Button 
                  onClick={() =>  {createItem({
                    variables: {
                      measurement: {
                        userId: localStorage.getItem('id'),
                        value: parseInt(this.state.value),
                        date: this.state.date,
                      }
                    }
                  })}}
                  variant="contained" color="primary">
                        Tallenna
                </Button>
              )}
            </Mutation>}
          </Grid>
        </React.Fragment>
      )
    }
}