import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import NotesContainer from '../containers/Notes';
import store from '../store';
import actionTypes from '../constants/action-types';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerClass: 'container container-fluid',
      headerStyle: 'mdl-layout__header fixed',
      redirectToLogin: false
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
    store.dispatch({ type: actionTypes.INIT_NOTE });
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
            <a href="#fixed-tab-1" className="mdl-layout__tab is-active">Notes Manager</a>
            <a href="#fixed-tab-2" className="mdl-layout__tab">Todo Manager</a>
            <a href="#fixed-tab-3" className="mdl-layout__tab">Alarm Manager</a>
          </div>
        </header>
        {/* <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Title</span>
        </div> */}
        <main className="mdl-layout__content">
          <section className="mdl-layout__tab-panel is-active" id="fixed-tab-1">
            <div className="page-content">
              <NotesContainer />
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="fixed-tab-2">
            <div className="page-content"></div>
          </section>
          <section className="mdl-layout__tab-panel" id="fixed-tab-3">
            <div className="page-content"></div>
          </section>
        </main>
      </div>
    );
  }
}

export default Container;