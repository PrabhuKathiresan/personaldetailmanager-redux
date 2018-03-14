import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Redirect, NavLink, Route } from 'react-router-dom';
import NotesContainer from '../containers/Notes';
import TodosContainer from '../containers/Todos';
import PasswordsContainer from '../containers/Passwords';
import AlarmsContainer from '../containers/Alarms';
import actionTypes from '../constants/action-types';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerClass: 'container container-fluid',
      headerStyle: 'mdl-layout__header fixed',
      redirectToLogin: false,
      appname: props.match.params.appname || 'notes'
    };
  }

  logoutApp(event) {
    event.preventDefault();
    axios.get('/api/logout')
      .then((res) => {
        this.setState({
          redirectToLogin: true
        });
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  }

  componentWillMount() {
    console.log(this);
  }

  componentDidMount() {
    console.log(this);
    window.componentHandler.upgradeAllRegistered();
    setTimeout(() => {
      setWrapperTop();
    }, 100);

    let setWrapperTop = () => {
      const wrapper = document.querySelector('div.wrapper');
      const header = document.querySelector('header.mdl-layout__header');
      wrapper.style.top = `${header.clientHeight}px`;
    };

    window.onresize = () => {
      setWrapperTop();
    };
  }

  onRouteChange(event, key) {
    event.preventDefault();
    if (this.props.location.pathname.indexOf(key) === -1) {
      this.props.history.push(key);
      this.setState({
        appname: key
      });
    }
  }

  render() {
    const { redirectToLogin } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className={this.state.headerStyle}>
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">PERSONAL DETAILS</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link" href="" onClick={event => this.logoutApp(event)}>Logout</a>
            </nav>
          </div>
          <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
            <NavLink to="/app/notes" onClick={(event) => { this.onRouteChange(event, 'notes'); }} className="mdl-custom-tab--link" activeClassName="is-active">Notes Manager</NavLink>
            <NavLink to="/app/todos" onClick={(event) => { this.onRouteChange(event, 'todos'); }} className="mdl-custom-tab--link" activeClassName="is-active">Todo Manager</NavLink>
            <NavLink to="/app/alarms" onClick={(event) => { this.onRouteChange(event, 'alarms'); }} className="mdl-custom-tab--link" activeClassName="is-active">Alarm Manager</NavLink>
            <NavLink to="/app/passwords" onClick={(event) => { this.onRouteChange(event, 'passwords'); }} className="mdl-custom-tab--link" activeClassName="is-active">Password Manager</NavLink>
          </div>
        </header>
        <main className="mdl-layout__content">
          <section className="mdl-layout__tab-panel is-active">
            <div className="page-content">
              <Route path={`${this.props.match.url}/notes`} component={NotesContainer} />
              <Route path={`${this.props.match.url}/todos`} component={TodosContainer} />
              <Route path={`${this.props.match.url}/passwords`} component={PasswordsContainer} />
              <Route path={`${this.props.match.url}/alarms`} component={AlarmsContainer} />
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Container;