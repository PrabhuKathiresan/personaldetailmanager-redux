import _ from 'lodash';
import * as ActionType from '../constants/action-types';

const initialState = {
  data: [],
  limit: 10,
  skip: 0,
  isCompletelyLoaded: false,
  initiallyLoaded: false
};

function passwords(state = initialState, action) {
  switch (action.type) {
    case ActionType.ADD_PASSWORD:
      return [
        Object.assign({}, action.password),
        ...state
      ];
    case ActionType.DELETE_PASSWORD:
      return _.remove(...state, {
        _id: action.id
      });
    case ActionType.GET_PASSWORD:
      return Object.assign({}, state, {
        data: _.concat(...state.data, action.passwords)
      }, { initiallyLoaded: true }, { isCompletelyLoaded: action.isCompletelyLoaded }, { skip: state.skip + action.skip });
    default:
      return state;
  }
}

export default passwords;