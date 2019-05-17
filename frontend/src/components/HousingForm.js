import React from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import '../App.scss';

export default class HousingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      postalCode: '',
      housingType: 'HOUSE',
      heatingType: 'WOOD',
      errors: {
        postalCode: 'first',
        address: 'first'
      }
    }
  };

  handleChange = input => event => {
    this.validate(input, event.target.value)
    this.setState({ [input]: event.target.value });
  }

  onSubmit = house => event => {
    const { onSubmit } = this.props;
    event.preventDefault();
    const hasErrors = Object.keys(this.state.errors).map(p => this.state.errors[p]).includes(true);
    const hasFirst = Object.keys(this.state.errors).map(p => this.state.errors[p]).includes('first');
    if (hasFirst) {
      const errors = this.state.errors;
      Object.keys(this.state.errors).forEach(e => {
        if (this.state.errors[e] === 'first') {
          errors[e] = true;
        }
      });
      this.setState({ errors })
    }
    if (!hasErrors && !hasFirst) onSubmit(house);
  }

  validate = (input, value) => {
    const { errors } = this.state;
    if (!value) {
      this.setState({ errors: { [input]: true } })
    }

    else {
      this.setState({ errors: { ...errors, [input]: false } })
    }
  }


  render() {
    const { address, postalCode, housingType, heatingType, errors } = this.state;
    return (
      <form
        onSubmit={this.onSubmit({ address, postalCode, housingType, heatingType, userId: this.props.user._id })
        } noValidate autoComplete="false">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid container spacing={16} direction="row">
            <Grid item xs={6}>
              <TextField
                error={errors.address === true}
                id="address"
                label="Address"
                value={this.state.address}
                onChange={this.handleChange('address')}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors.postalCode === true}
                id="postalCode"
                label="Postal code"
                value={this.state.postalCode}
                onChange={this.handleChange('postalCode')}
                margin="normal"
                required
              />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{width: '100%', marginTop: '12px'}}>
            <FormControl fullWidth>
              <InputLabel htmlFor="housingtype">Housing Type</InputLabel>
              <Select
                value={housingType}
                onChange={this.handleChange}
                inputProps={{
                  name: 'housingType',
                  id: 'housingType',
                }}
              >
                <MenuItem value="HOUSE">House</MenuItem>
                <MenuItem value="APARTMENT">Apartment</MenuItem>
                <MenuItem value="ROWHOUSE">Rowhouse</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{width: '100%', marginTop: '12px'}}>
            <FormControl fullWidth>
              <InputLabel htmlFor="heatingtype">Heating Type</InputLabel>
              <Select
                value={heatingType}
                onChange={this.handleChange}
                inputProps={{
                  name: 'heatingType',
                  id: 'heatingType',
                }}
              >
                <MenuItem value="OIL">Oil</MenuItem>
                <MenuItem value="WOOD">Wood</MenuItem>
                <MenuItem value="ELECTRCITY">Electricity</MenuItem>
                <MenuItem value="GAS">Gas</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Button fullWidth type="submit" style={{ marginTop: '16px' }} variant="contained" color="primary">
            Create house
          </Button>
        </Grid>
      </form>
    );
  }
}