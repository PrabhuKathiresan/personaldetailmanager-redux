import _ from 'lodash';
import * as ActionType from '../constants/action-types';

const initialState = {
  data: [],
  limit: 10,
  skip: 0,
  isCompletelyLoaded: false,
  initiallyLoaded: false
};

function alarms(state = initialState, action) {
  switch (action.type) {
    case ActionType.ADD_ALARM:
      return [
        ...state.data,
        Object.assign({}, action.alarm)
      ];
    case ActionType.GET_ALARM:
      return Object.assign({}, state, {
        data: _.concat(...state.data, action.alarms)
      }, { initiallyLoaded: true }, { isCompletelyLoaded: action.isCompletelyLoaded }, { skip: state.skip + action.skip });
    default:
      return state;
  }
}

export default alarms;