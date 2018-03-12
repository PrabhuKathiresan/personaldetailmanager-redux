import * as ActionType from '../constants/action-types';

function alarms(state = {}, action) {
  switch (action.type) {
    case ActionType.ADD_ALARM:
      return [
        ...state,
        Object.assign({}, action.alarm)
      ];
    default:
      return state;
  }
}

export default alarms;