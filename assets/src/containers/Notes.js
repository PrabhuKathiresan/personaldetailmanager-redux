import React from 'react';
import { connect } from 'react-redux';
import { API_GET_NOTE } from '../constants/action-types';
import NotesActions from '../actions/Notes';
import Notes from '../components/base/Notes';

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: (limit, skip) => {
    dispatch({ type: API_GET_NOTE, limit, skip });
  },
  onClick: () => {
    console.log(ownProps);
  }
});

const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

export default NotesContainer;