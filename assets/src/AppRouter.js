import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Container from './components/Container';
import Login from './components/Login';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginRedirect: false
    };
  }

  componentWillMount() {
    console.log(this);
  }

  render() {
    // const { loginRedirect } = this.state;

    // if (loginRedirect) {
    //   if (window.location.href.indexOf('/login') > -1) {
    //     return <Login />;
    //   }
    //   return (
    //     <Redirect to="/login" />
    //   );
    // }
    console.log(this);

    return (
      <div className="wrapper">
        <Route path="/" component={Container} />
      </div>
    );
  }
}

export default AppRouter;