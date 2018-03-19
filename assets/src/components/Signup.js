import React from 'react';
import axios from 'axios';
import {
  Redirect,
  Link
} from 'react-router-dom';
import FormErrors from './helper/FormErrors';
import AuthErrors from './helper/AuthErrors';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmpassword: '',
      formErrors: { username: '', password: '', confirmpassword: '' },
      usernameValid: false,
      confirmpasswordValid: false,
      passwordValid: false,
      formValid: false,
      displayError: false,
      displayAuthenticationError: false,
      authenticationError: '',
      redirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
    window.componentHandler.upgradeAllRegistered();
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value); });
  }

  handleSubmit(event) {
    const username = this.state.username;
    const password = this.state.password;
    axios.post('/api/signup', { username, password })
      .then((res) => {
        const data = res.data;
        if (data.success) {
          this.setState({ redirect: true });
        } else {
          this.setState({
            authenticationError: data.message,
            displayAuthenticationError: true
          });
          setTimeout(() => {
            this.setState({
              authenticationError: '',
              displayAuthenticationError: false
            });
          }, 5000);
        }
      });
    event.preventDefault();
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let confirmpasswordValid = this.state.confirmpasswordValid;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
    let displayError = this.state.displayError;
    switch (fieldName) {
      case 'username':
        usernameValid = !!value;
        fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
        displayError = !usernameValid;
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        displayError = !passwordValid;
        break;
      case 'confirmpassword':
        confirmpasswordValid = value.length >= 6;
        fieldValidationErrors.confirmpassword = confirmpasswordValid ? '' : ' is invalid';
        if (confirmpasswordValid) {
          console.log(document.getElementById('password').value);
          if (document.getElementById('password').value !== value) {
            fieldValidationErrors.confirmpassword = ' does not match';
            confirmpasswordValid = false;
          }
        }
        displayError = !confirmpasswordValid;
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      usernameValid,
      passwordValid,
      confirmpasswordValid,
      displayError
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.usernameValid && this.state.passwordValid && this.state.confirmpasswordValid });
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="block" id="block">
          <div className="login">
              <div className="logo">Personal Detail Manager</div>
              <div align="center">Signup Form</div>
              <div className={!this.state.displayAuthenticationError ? 'displayNone' : ''}>
                  <AuthErrors authErrors={this.state.authenticationError} />
              </div>
              <div className={!this.state.displayError ? 'displayNone' : ''}>
                  <FormErrors formErrors={this.state.formErrors} />
              </div>
              <form className="SignupForm" onSubmit={this.handleSubmit} id="form">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                      <input className="mdl-textfield__input" type="text" name="username" value={this.props.username} onChange={event => this.handleUserInput(event)} autoComplete="off" />
                      <label className="mdl-textfield__label">Enter username</label>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                      <input className="mdl-textfield__input" id="password" type="password" name="password" value={this.props.password} onChange={event => this.handleUserInput(event)} />
                      <label className="mdl-textfield__label">Enter password</label>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                      <input className="mdl-textfield__input" type="password" name="confirmpassword" value={this.props.confirmpassword} onChange={event => this.handleUserInput(event)} />
                      <label className="mdl-textfield__label">Confirm password</label>
                  </div>
                  <div className="input-block" align="center">
                      <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit" disabled={!this.state.formValid}>Signup</button>
                  </div>
              </form>
              <div align="center"><Link to="/login">Already have a account?</Link></div>
          </div>
      </div>
    );
  }
}

export default Signup;