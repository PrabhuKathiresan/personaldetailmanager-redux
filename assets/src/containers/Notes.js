import React from 'react';
import { connect } from 'react-redux';
import NotesActions from '../actions/Notes';
import Notes from '../components/Notes';

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    console.log(ownProps);
  }
});

const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

export default NotesContainer;