import api from '../request/api';
import actionType from '../constants/action-types';

function addTodo(url, note) {
  return api.post(url, note).then(res => ({
    type: actionType.ADD_NOTE,
    note: res.data.details
  })).catch(err => console.log(err));
}

function deleteTodo(url) {
  return api.get(url).then(res => ({
    type: actionType.DELETE_NOTE,
    id: res.details
  })).catch(err => console.log(err));
}

function getTodos(url) {
  return api.get(url).then(res => ({
    type: actionType.GET_NOTE,
    notes: res.data.details
  })).catch(err => console.log(err));
}

module.exports = {
  addTodo,
  deleteTodo,
  getTodos
};