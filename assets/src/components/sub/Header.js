import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerStyle: 'mdl-layout__header fixed'
    };
  }

  render() {
    return <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
      <header className={this.state.headerStyle}>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Title</span>
        </div>
        <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
          <a href="#fixed-tab-1" className="mdl-layout__tab is-active">Tab 1</a>
          <a href="#fixed-tab-2" className="mdl-layout__tab">Tab 2</a>
          <a href="#fixed-tab-3" className="mdl-layout__tab">Tab 3</a>
        </div>
      </header>
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Title</span>
      </div>
      <main className="mdl-layout__content">
        <section className="mdl-layout__tab-panel is-active" id="fixed-tab-1">
          <div className="page-content"></div>
        </section>
        <section className="mdl-layout__tab-panel" id="fixed-tab-2">
          <div className="page-content"></div>
        </section>
        <section className="mdl-layout__tab-panel" id="fixed-tab-3">
          <div className="page-content"></div>
        </section>
      </main>
    </div>;
  }
}

export default Header;