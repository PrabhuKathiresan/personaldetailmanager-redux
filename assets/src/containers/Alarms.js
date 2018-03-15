import React from 'react';
import { connect } from 'react-redux';
import { API_GET_ALARM } from '../constants/action-types';
import AlarmActions from '../actions/Alarms';
import Alarms from '../components/base/Alarms';

const mapStateToProps = (state, ownProps) => ({
  alarms: state.alarms
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: (limit, skip) => {
    dispatch({ type: API_GET_ALARM, limit, skip });
  },
  onClick: () => {
    console.log(ownProps);
  }
});

const AlarmsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Alarms);

export default AlarmsContainer;