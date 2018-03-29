import _ from 'lodash';
import * as ActionType from '../constants/action-types';

const initialState = {
  data: [],
  limit: 10,
  skip: 0,
  isCompletelyLoaded: false,
  initiallyLoaded: false
};
let index;
function todos(state = initialState, action) {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return Object.assign({}, state, {
        data: _.concat(action.todo, ...state.data)
      });
    case ActionType.UPDATE_TODO:
      index = _.findIndex(state.data, { _id: action.todo._id });
      _.set(state.data[index], 'completed', action.todo.completed);
      return Object.assign({}, state, {
        data: _.concat([], state.data)
      });
    case ActionType.DELETE_TODO:
      _.remove(state.data, {
        _id: action.id
      });
      return Object.assign({}, state, {
        data: state.data
      });
    case ActionType.GET_TODO:
      return Object.assign({}, state, {
        data: _.concat(...state.data, action.todos)
      }, { initiallyLoaded: true }, { isCompletelyLoaded: action.isCompletelyLoaded }, { skip: state.skip + action.skip });
    default:
      return state;
  }
}

export default todos;