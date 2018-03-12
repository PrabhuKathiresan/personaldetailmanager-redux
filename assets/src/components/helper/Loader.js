import React from 'react';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderClass: 'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active',
      fullPageLoader: 'full-page-loader'
    };
  }

  render() {
    return (
      <div className={this.state.fullPageLoader}>
        <div className={this.state.loaderClass}></div>
      </div>
    );
  }
}

export default Loader;