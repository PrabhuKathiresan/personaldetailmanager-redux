import React from 'react';
import { connect } from 'react-redux';
import { API_GET_PASSWORD } from '../constants/action-types';
import PasswordActions from '../actions/Passwords';
import Passwords from '../components/base/Passwords';

const mapStateToProps = (state, ownProps) => ({
  passwords: state.passwords
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: (limit, skip) => {
    dispatch({ type: API_GET_PASSWORD, limit, skip });
  },
  onClick: () => {
    console.log(ownProps);
  }
});

const PasswordsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Passwords);

export default PasswordsContainer;