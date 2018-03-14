import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import Container from './components/Container';
import Login from './components/Login';
import Header from './components/sub/Header';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginRedirect: false,
      wrapperClass: 'wrapper'
    };
  }

  componentWillMount() {
    axios.get('/api/userinfo')
      .then((res) => {
        const data = res.data;
        if (!data.success) {
          this.setState({
            loginRedirect: true
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { loginRedirect } = this.state;
    if (loginRedirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className={this.state.wrapperClass}>
        <Switch>
          <Route path={`${this.props.match.url}`} component={Container} />
        </Switch>
      </div>
    );
  }
}

export default AppRouter;