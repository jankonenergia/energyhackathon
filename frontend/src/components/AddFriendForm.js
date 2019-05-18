import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import '../App.scss';

export default class AddFriendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      errors: {
        nickname: 'first',
      }
    }
  };

  handleChange = input => event => {
    this.validate(input, event.target.value)
    this.setState({ [input]: event.target.value });
  }

  onSubmit = (nickname, password) => event => {
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
    if (!hasErrors && !hasFirst) onSubmit(nickname, password);
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
    const { nickname, password, errors } = this.state;
    if (this.props.noFriends) return <p> No friends yet :( </p>

    return (
      <form
        onSubmit={this.onSubmit(nickname, password)} noValidate autoComplete="false">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid container direction="row">
          {this.props.error && <p> User not found :( </p>}
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
              />
            </Grid>
          </Grid>
          <Button fullWidth type="submit" style={{ marginTop: '16px' }} variant="contained" color="primary">
            Add friend 😍
          </Button>
        </Grid>
      </form>
    );
  }
}