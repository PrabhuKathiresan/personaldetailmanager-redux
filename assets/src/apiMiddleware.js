import axios from 'axios';
import NoteActions from './actions/Notes';
import PasswordActions from './actions/Passwords';
import AlarmActions from './actions/Alarms';

import url from './constants/api-url';
import actionTypes from './constants/action-types';

const apiMiddleware = store => next => (action) => {
  // Pass all actions through by default
  next(action);
  switch (action.type) {
    // In case we receive an action to send an API request
    case actionTypes.API_GET_NOTE:
      NoteActions.getNotes(`${url.get.notes}?limit=${action.limit}&skip=${action.skip}`).then((response) => {
        next(response);
      }).catch(err => console.log(err));
      break;
    case actionTypes.API_POST_NOTE:
      NoteActions.addNote(`${url.post.notes}`, action.note).then((response) => {
        next({
          type: response.type,
          note: response.note
        });
      }).catch(err => console.log(err));
      break;
    case actionTypes.API_GET_PASSWORD:
      PasswordActions.getPasswords(`${url.get.passwords}?limit=${action.limit}&skip=${action.skip}`).then((response) => {
        next(response);
      }).catch(err => console.log(err));
      break;
    case actionTypes.API_POST_PASSWORD:
      NoteActions.addPassword(`${url.post.passwords}`, action.password).then((response) => {
        next({
          type: response.type,
          password: response.password
        });
      }).catch(err => console.log(err));
      break;
    case actionTypes.API_GET_ALARM:
      AlarmActions.getAlarms(`${url.get.alarms}?limit=${action.limit}&skip=${action.skip}`).then((response) => {
        next(response);
      }).catch(err => console.log(err));
      break;
    case actionTypes.API_POST_ALARM:
      AlarmActions.addAlarm(`${url.post.alarms}`, action.alarm).then((response) => {
        next({
          type: response.type,
          alarm: response.alarm
        });
      }).catch(err => console.log(err));
      break;
    default:
      break;
  }
};

export default apiMiddleware;