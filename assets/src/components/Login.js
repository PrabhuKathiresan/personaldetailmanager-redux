import React from 'react';
import axios from 'axios';
import {
  Redirect,
  Link
} from 'react-router-dom';
import FormErrors from './helper/FormErrors';
import AuthErrors from './helper/AuthErrors';
import Loader from './helper/Loader';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: true,
      usernameValid: false,
      passwordValid: false,
      formValid: false,
      displayError: false,
      displayAuthenticationError: false,
      authenticationError: '',
      loginSuccess: false,
      isUserLoggedIn: 'inProgress'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.get('/api/userinfo')
      .then((res) => {
        const data = res.data;
        if (data.success) {
          setTimeout(() => {
            this.setState({
              isUserLoggedIn: true
            });
          }, 1000 * 1);
        } else {
          this.setState({
            isUserLoggedIn: false
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    const username = encodeURIComponent(this.state.username);
    const password = encodeURIComponent(this.state.password);
    axios.get(`/api/login?username=${username}&password=${password}`)
      .then((res) => {
        const data = res.data;
        if (data.success) {
          this.setState({ loginSuccess: true });
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
    let emailValid = this.state.emailValid;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
    let displayError = this.state.displayError;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        displayError = !emailValid;
        break;
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
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid,
      usernameValid,
      passwordValid,
      displayError
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.usernameValid && this.state.passwordValid });
  }

  render() {
    const { loginSuccess } = this.state;
    const { isUserLoggedIn } = this.state;

    if (isUserLoggedIn === true) {
      return <Redirect to="/app/" />;
    }

    if (loginSuccess) {
      return <Redirect to="/app/" />;
    }

    if (isUserLoggedIn === 'inProgress') {
      return <Loader />;
    }

    return (
      <div className="block">
        <div className="login">
          <div className="logo">Personal Detail Manager</div>
          <div align="center">Login Form</div>
          <div className={!this.state.displayAuthenticationError ? 'displayNone' : ''}>
              <AuthErrors authErrors={this.state.authenticationError} />
          </div>
          <div className={!this.state.displayError ? 'displayNone' : ''}>
              <FormErrors formErrors={this.state.formErrors} />
          </div>
              <form className="loginForm" onSubmit={this.handleSubmit}>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" name="username" value={this.props.username} onChange={event => this.handleUserInput(event)} autoComplete="off" />
                    <label className="mdl-textfield__label">User name</label>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="password" name="password" value={this.props.password} onChange={event => this.handleUserInput(event)} />
                    <label className="mdl-textfield__label">Password</label>
                  </div>
                  <div className="input-block" align="center">
                      <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit" disabled={!this.state.formValid}>Login</button>
                  </div>
              </form>
            <div align="center">
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
      </div>
    );
  }
}

export default Login;