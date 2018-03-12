import * as ActionType from '../constants/action-types';

function todos(state = {}, action) {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return [
        ...state,
        Object.assign({}, action.todo)
      ];
    default:
      return state;
  }
}

export default todos;