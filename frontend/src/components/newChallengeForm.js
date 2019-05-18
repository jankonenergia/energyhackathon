import React from 'react'
import { Grid } from '@material-ui/core';
import { FormControl, TextField, Button } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
export default class NewChallengeForm extends React.Component {

    state = {
      title: "",
      description: "",
      from: new Date().toDateString(),
      to: new Date().toDateString()
    }

    clearState = () => {
      this.setState({title: "", description: "", from: new Date().toDateString(), to: new Date().toDateString()})
    }

    handleChange = input => event => {
      this.setState({ [input]: event.target.value });
    }

    render() {

      const MUTATION_CREATE_NEW_CHALLENGE = gql`
        mutation CreateChallenge($challenge: ChallengeInput!) {
            createChallenge(challenge: $challenge) {
                _id
            }
        }
      `;
      return (
        <React.Fragment>
          <h1>Uusi haaste</h1>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                label={"Otsikko"}
                inputProps={{
                  name: 'challengeTitle',
                  id: 'challengeTitle',
                }}
                onChange={this.handleChange('title')} 
                value={this.state.title} />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label={"Kuvaus"}
                inputProps={{
                  name: 'challengeDescription',
                  id: 'challengeDescription',
                }}
                onChange={this.handleChange('description')} 
                value={this.state.description} />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label={"Voimassaolo alkaen"}
                type={"date"}
                inputProps={{
                  name: 'challengeFrom',
                  id: 'challengeFrom',
                }}
                onChange={this.handleChange('from')} 
                value={this.state.from} />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label={"Voimassaolo päättyy"}
                type={"date"}
                inputProps={{
                  name: 'challengeTo',
                  id: 'challengeTo',
                }}
                onChange={this.handleChange('to')} 
                value={this.state.to} />
            </FormControl>
            {this.state.title && this.state.description && <Mutation 
              mutation={MUTATION_CREATE_NEW_CHALLENGE}
              refetchQueries={['GetChallenges' ]}
              onCompleted={this.clearState}
              onError={error => `Error! ${error.message}`}
            >
              {createItem => (
                <Button 
                  onClick={() =>  {createItem({
                    variables: {
                      challenge: {
                        userId: localStorage.getItem('id'),
                        title: this.state.title,
                        description: parseInt(this.state.description),
                        from: this.state.from,
                        to: this.state.to
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