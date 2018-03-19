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
let tempObj;
function notes(state = initialState, action) {
  switch (action.type) {
    case ActionType.ADD_NOTE:
      return Object.assign({}, state, {
        data: [
          Object.assign({}, action.note),
          ...state.data
        ]
      });
    case ActionType.UPDATE_NOTE:
      index = _.findIndex(state.data, { _id: action.note._id });
      tempObj = _.concat([], state.data);
      tempObj[index] = action.note;
      return Object.assign({}, state, {
        data: _.concat([], tempObj)
      });
    case ActionType.DELETE_NOTE:
      _.remove(state.data, {
        _id: action.id
      });
      tempObj = Object.assign({}, state, {
        data: state.data
      });
      return tempObj;
    case ActionType.GET_NOTE:
      return Object.assign({}, state, {
        data: _.concat(...state.data, action.notes)
      }, { initiallyLoaded: true }, { isCompletelyLoaded: action.isCompletelyLoaded }, { skip: state.skip + action.skip });
    default:
      return state;
  }
}

export default notes;