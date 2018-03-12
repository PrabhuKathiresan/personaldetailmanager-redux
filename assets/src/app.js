import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import actionTypes from './constants/action-types';
import Login from './components/Login';
import Signup from './components/Signup';
import AppRouter from './AppRouter';
import store from './store';

if (typeof window !== 'undefined') {
  render(
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/app" component={AppRouter} />
        </Switch>
      </HashRouter>
    </Provider>,
    document.getElementById('app')
  );
}