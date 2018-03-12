import React from 'react';

class AuthErrors extends React.Component {
  render() {
    return (
        <div className="formErrors">
            <span>{this.props.authErrors}</span>
        </div>
    );
  }
}

export default AuthErrors;