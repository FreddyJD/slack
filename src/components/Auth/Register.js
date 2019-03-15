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
import md5 from 'md5';


export default class Register extends Component {
  state = {
    mail: "",
    password: "",
    passwordConfirmation: "",
    username: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users'),
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "All fields must be fill" };
      this.setState({ errors: errors.concat(error) });
      console.log(error)
      return false;

    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Invalid password" };
      this.setState({ errors: errors.concat(error) });
      console.log(error)
      return false;

    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, mail, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !mail.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();

    if(this.isFormValid()) {
      this.setState({errors: [], loading: true})
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.mail, this.state.password)
        .then(createdUser => {

          console.log(createdUser)

          createdUser.user.updateProfile({
            displayName: this.state.username,
            photoURL: `https://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
          }).then(() => {
            this.setState({loading: false})
            this.saveUser(createdUser).then(() => {
              console.log(' saved ')
            })
            
          }).catch(err => {
            this.setState({loading: false, errors: this.state.errors.concat(err) })
          })
        })
        .catch(err => {
          
          this.setState({loading: false, errors: this.state.errors.concat(err) })
        });

    }
  };

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    })
  }

  displayError = errors => errors.map((error) => `${error.message}`);


  render() {
    const { username, mail, password, passwordConfirmation, errors, loading } = this.state;

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
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
                className={errors.some(error => error.message.toLowerCase().includes('username')) ? 'error' : ''}
                value={username}
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

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={errors.some(error => error.message.toLowerCase().includes('password')) ? 'error' : ''}
                type="password"
              />

              <Button 
              disabled={loading}
              className={loading ? 'loading' : ''}color="violet" fluid size="large">
                Submit
              </Button>
            </Segment>
            <Message>
              Already part of Slack Dev's? <Link to="/login"> Login</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}
