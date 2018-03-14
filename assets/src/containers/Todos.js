import React from 'react';
import { connect } from 'react-redux';
import { API_GET_TODO } from '../constants/action-types';
import TodoActions from '../actions/Todos';
import Todos from '../components/base/Todos';

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: () => {
    dispatch({ type: API_GET_TODO });
  },
  onClick: () => {
    console.log(ownProps);
  }
});

const TodosContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);

export default TodosContainer;