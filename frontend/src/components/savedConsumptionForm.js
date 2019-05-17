import React from 'react'
import { Grid } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag'
export default class SavedConsumptionForm extends React.Component {

    state = {
      selectedType: "",
      selectedPlaceHolder: "",
      selectedDescription: "",
      selectedValue: "",
      selectedDate: ""
    }

    handleTypeChange = (event, element) => {
      this.setState({selectedType: event.target.value });
      this.setState({selectedPlaceHolder: element.props.dataPlaceHolder})
      this.setState({selectedDescription: element.props.dataDescription})
    }
    handleAmountChange = (event, element) => {
      this.setState({selectedValue: event.target.value})
    }
    handleDateChange = (event, element) => {
      this.setState({selectedDate: event.target.value})
    }
    render() {
      const QUERY_CONSUMPTION_TYPES = gql`
      query {
        getConsumptionTypes {
        _id,
          title,
          description,
        amount,
        amountType
        }
      }`;

      const MUTATION_ADD_NEW_CONSUMPTION = gql`
        mutation NewConsumption($savedConsumption: SavedConsumptionInput!) {
            createSavedConsumption(savedConsumption: $savedConsumption) {
                _id,
                userId
            }
        }
      `;
      return (
        <React.Fragment>
          <h1>Säästin energiaa seuraavanlaisesti:</h1>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="consumptionType">Kulutustyyppi</InputLabel>
              <Query query={QUERY_CONSUMPTION_TYPES}>
                {({loading, error, data}) => {
                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;
                  return (
                    <Select
                      value={this.state.selectedType}
                      onChange={this.handleTypeChange}
                      inputProps={{
                        name: 'consumptionType',
                        id: 'consumptionType',
                      }}
                    >
                      {
                        data.getConsumptionTypes.map((item) => <MenuItem key={item._id} dataDescription={item.description} dataPlaceHolder={item.amountType} value={item._id}>{item.title}</MenuItem>)
                      }
                    </Select>
                  )
                }}
              </Query>
            </FormControl>
            <p>{this.state.selectedDescription}</p>
            {this.state.selectedType &&
            <FormControl fullWidth>
              <TextField
                label={`Määrä (${this.state.selectedPlaceHolder})`}
                type="number"
                inputProps={{
                  name: 'consumptionAmount',
                  id: 'consumptionAmount',
                }}
                onChange={this.handleAmountChange} 
                value={this.state.selectedValue} />
            </FormControl>}
            {this.state.selectedValue && <FormControl fullWidth>
              <TextField
                label={"Päivämäärä"}
                type="date"
                inputProps={{
                  name: 'consumptionDate',
                  id: 'consumptionDate',
                }}
                onChange={this.handleDateChange} 
                value={this.state.selectedDate} />
            </FormControl>}
            {this.state.selectedDate && <Mutation 
              mutation={MUTATION_ADD_NEW_CONSUMPTION}
              refetchQueries={() => { return [{ query: QUERY_CONSUMPTION_TYPES }]}}
              onError={error => {
                return `Error! ${error.message}`;
              }}
            >
              {createItem => (
                <Button 
                  onClick={() =>  {createItem({
                    variables: {
                      savedConsumption: {
                        userId: localStorage.getItem('id'),
                        consumptionTypeId: this.state.selectedType,
                        value: parseInt(this.state.selectedValue),
                        date: this.state.selectedDate
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
      )}
}