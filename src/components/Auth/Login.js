import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";



export default class login extends Component {
  state = {
    mail: "",
    password: "",
    errors: [],
    loading: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    if(this.isFormValid(this.state)) {
      this.setState({errors: [], loading: true})

      firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password)
      .then(signInUser => { 
        console.log(signInUser); 
        this.setState({loading: false })

      })
      .catch(err => {
        console.error(err)
        this.setState({loading: false, errors: this.state.errors.concat(err) })
      })
    }
  };

  isFormValid = ({mail, password}) => mail && password


  displayError = errors => errors.map((error) => `${error.message}`);


  render() {
    const { password, mail, errors, loading } = this.state;

    return (
      <div className="app">
      <Grid textAlign="center" verticalAlign="middle" className="form-field">
        <Grid.Column style={{ maxWidth: 560 }}>
          <Header as="h1" textAlign="center">
            Slack Dev's ⭐
          </Header>
          {errors.length > 0 && (
            <Message error>
              <h3>Ops! </h3>
              {this.displayError(errors)}
            </Message>)}
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="mail"
                icon="mail"
                iconPosition="left"
                placeholder="mail"
                onChange={this.handleChange}
                type="mail"
                className={errors.some(error => error.message.toLowerCase().includes('email')) ? 'error' : ''}
                value={mail}
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                className={errors.some(error => error.message.toLowerCase().includes('password')) ? 'error' : ''}
                value={password}
              />

              <Button 
              disabled={loading}
              className={loading ? 'loading' : ''}color="blue" fluid size="large">
                Login
              </Button>
            </Segment>
            <Message>
              Don't have an account? <Link to="/register"> Register</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}
