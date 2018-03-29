import React from 'react';
import { connect } from 'react-redux';
import { API_GET_TODO, API_POST_TODO, API_UPDATE_TODO, API_DELETE_TODO } from '../constants/action-types';
import TodoActions from '../actions/Todos';
import Todos from '../components/base/Todos';

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: (limit, skip) => {
    dispatch({ type: API_GET_TODO, limit, skip });
  },
  addTodo: (todo) => {
    dispatch({ type: API_POST_TODO, todo: { content: todo, completed: false, createdAt: new Date() } });
  },
  updateTodo: (todo) => {
    dispatch({ type: API_UPDATE_TODO, todo });
  },
  deleteTodo: (todo) => {
    dispatch({ type: API_DELETE_TODO, todo });
  }
});

const TodosContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);

export default TodosContainer;