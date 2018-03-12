import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        username: '',
        password: '',
        confirmpassword: '',
      },
      signupTitle: 'Signup into Personal Detail Manager'
    };
  }

  render() {
    return (
      <div>
        <h4>{this.state.signupTitle}</h4>
      </div>
    );
  }
}

export default Signup;