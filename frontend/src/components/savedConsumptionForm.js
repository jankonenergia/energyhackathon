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
    clearState = () => {
      this.setState({selectedType: "", selectedPlaceHolder: "", selectedDescription: "", selectedValue: "", selectedDate: ""})
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
          <Grid container direction={"row"} spacing={16}>
            <Grid xs={12}>
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
            </Grid>
            <Grid xs={12}>
              <p>{this.state.selectedDescription}</p>
            </Grid>
            <Grid xs={12}>
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
                  type="date"
                  inputProps={{
                    name: 'consumptionDate',
                    id: 'consumptionDate',
                  }}
                  onChange={this.handleDateChange} 
                  value={this.state.selectedDate} />
              </FormControl>}
            </Grid>
            <Grid xs={12}>
              {this.state.selectedDate && <Mutation 
                mutation={MUTATION_ADD_NEW_CONSUMPTION}
                refetchQueries={[{ query: QUERY_CONSUMPTION_TYPES }, 'Consumptions' ]}
                onCompleted={this.clearState}
                onError={error => `Error! ${error.message}`}
              >
                {createItem => (
                  <Button 
                    style={{margin: "20px auto", display: "block"}}
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
          </Grid>
        </React.Fragment>
      )}
}