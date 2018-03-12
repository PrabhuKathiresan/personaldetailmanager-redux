import _ from 'lodash';
import * as ActionType from '../constants/action-types';

const initialState = [];

let obj;

function notes(state = initialState, action) {
  switch (action.type) {
    case ActionType.ADD_NOTE:
      return [
        ...state,
        Object.assign({}, action.note)
      ];
    case ActionType.DELETE_NOTE:
      return _.remove(...state, {
        _id: action.id
      });
    case ActionType.GET_NOTE:
      return _.concat(...state, action.notes);
    default:
      return state;
  }
}

export default notes;