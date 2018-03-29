import api from '../request/api';
import actionType from '../constants/action-types';

function addTodo(url, todo) {
  return api.post(url, todo).then(res => ({
    type: actionType.ADD_TODO,
    todo: res.data.details
  })).catch(err => console.log(err));
}

function updateTodo(url, todo) {
  return api.post(url, todo).then(res => ({
    type: actionType.UPDATE_TODO,
    todo: res.data.details
  })).catch(err => console.log(err));
}

function deleteTodo(url, id) {
  return api.get(url).then(res => ({
    type: actionType.DELETE_TODO,
    id
  })).catch(err => console.log(err));
}

function getTodos(url) {
  return api.get(url).then((res) => {
    let isCompletelyLoaded = false;
    if (res.data.details.length !== 10) {
      isCompletelyLoaded = true;
    }
    const skip = res.data.details.length;
    return {
      type: actionType.GET_TODO,
      todos: res.data.details,
      isCompletelyLoaded,
      skip
    };
  }).catch(err => console.log(err));
}

module.exports = {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo
};