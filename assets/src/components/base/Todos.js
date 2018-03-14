import React from 'react';

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'TODO MANAGER'
    };
  }
  componentWillMount() {
    this.props.onLoad();
  }
  render() {
    return (
      <div>{this.state.title}</div>
    );
  }
}

export default Todos;