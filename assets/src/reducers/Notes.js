import _ from 'lodash';
import * as ActionType from '../constants/action-types';

const initialState = {
  data: [],
  limit: 10,
  skip: 0,
  isCompletelyLoaded: false,
  initiallyLoaded: false
};

function notes(state = initialState, action) {
  switch (action.type) {
    case ActionType.ADD_NOTE:
      return [
        Object.assign({}, action.note),
        ...state
      ];
    case ActionType.DELETE_NOTE:
      return _.remove(...state, {
        _id: action.id
      });
    case ActionType.GET_NOTE:
      return Object.assign({}, state, {
        data: _.concat(...state.data, action.notes)
      }, { initiallyLoaded: true }, { isCompletelyLoaded: action.isCompletelyLoaded }, { skip: state.skip + action.skip });
    default:
      return state;
  }
}

export default notes;