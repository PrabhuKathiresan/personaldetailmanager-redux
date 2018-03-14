import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Passwords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Password MANAGER',
      defaultPageSize: 10,
      columns: [
        {
          Header: 'Portal Name',
          accessor: 'portal'
        }, {
          Header: 'Username/Email Id',
          accessor: 'username'
        }, {
          Header: 'Password',
          accessor: 'password'
        }
      ]
    };
  }
  componentWillMount() {
    if (!this.props.passwords.initiallyLoaded) {
      this.props.onLoad(this.props.passwords.limit, this.props.passwords.skip);
    }
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <ReactTable data={this.props.passwords.data} defaultPageSize={this.state.defaultPageSize} columns={this.state.columns} />
      </div>
    );
  }
}

export default Passwords;