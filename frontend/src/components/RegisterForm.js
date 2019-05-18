import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import '../App.scss';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      nickname: '',
      password: '',
      passwordConf: '',
      errors: {
        fname: 'first',
        lname: 'first',
        nickname: 'first',
        password: 'first',
        passwordConf: 'first',
      }
    }
  };

  handleChange = input => event => {
    this.validate(input, event.target.value)
    this.setState({ [input]: event.target.value });
  }

  onSubmit = user => event => {
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
    if (!hasErrors && !hasFirst) onSubmit(user);
  }

  validate = (input, value) => {
    const { errors } = this.state;
    if (!value) {
      this.setState({ errors: { [input]: true } })
    }

    if (input === 'passwordConf' && value !== this.state.password) {
      this.setState({ errors: { [input]: true } })
    }

    else {
      this.setState({ errors: { ...errors, [input]: false } })
    }
  }


  render() {
    const { fname, lname, nickname, password, errors } = this.state;

    return (
      <form
        onSubmit={this.onSubmit({ firstName: fname, lastName: lname, nickname, password })
        } noValidate autoComplete="false">
        <Grid
          container
          spacing={16}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid container spacing={16} direction="row">
            <Grid item xs={12} md={6}>
              <TextField
                error={errors.fname === true}
                id="firstname"
                label="First name"
                value={this.state.fname}
                onChange={this.handleChange('fname')}
                margin="normal"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                error={errors.lname === true}
                id="lastname"
                label="Last name"
                value={this.state.lname}
                onChange={this.handleChange('lname')}
                margin="normal"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={12}>
              <TextField
                error={errors.nickname === true}
                id="nickname"
                label="Username"
                value={this.state.nickname}
                onChange={this.handleChange('nickname')}
                fullWidth
                margin="normal"
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={16} direction="row">
            <Grid item xs={12} md={6}>
              <TextField
                error={errors.password === true}
                id="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                margin="normal"
                type="password"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                error={errors.passwordConf === true}
                id="passwordconf"
                label="Confirm password"
                value={this.state.passwordConf}
                onChange={this.handleChange('passwordConf')}
                margin="normal"
                type="password"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button fullWidth type="submit" style={{ marginTop: '16px' }} variant="contained" color="primary">
            Register
          </Button>
        </Grid>
      </form>
    );
  }
}