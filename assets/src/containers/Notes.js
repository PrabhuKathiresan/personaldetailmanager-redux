import React from 'react';
import { connect } from 'react-redux';
import {
  API_GET_NOTE, API_UPDATE_NOTE,
  API_POST_NOTE, API_DELETE_NOTE, FETCHING_NOTES, SELECT_NOTE,
  DESELECT_NOTE
} from '../constants/action-types';
import NotesActions from '../actions/Notes';
import Notes from '../components/base/Notes';

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: (limit, skip) => {
    dispatch({ type: API_GET_NOTE, limit, skip });
  },
  add: (note) => {
    dispatch({ type: API_POST_NOTE, note });
  },
  update: (note) => {
    dispatch({ type: API_UPDATE_NOTE, note });
  },
  delete: (note) => {
    dispatch({ type: API_DELETE_NOTE, note });
  },
  processing: (data) => {
    dispatch({ type: FETCHING_NOTES, data });
  },
  selectNote: (note, data) => {
    dispatch({ type: SELECT_NOTE, note, data });
  },
  deselectNotes: () => {
    dispatch({ type: DESELECT_NOTE });
  }
});

const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

export default NotesContainer;