import { combineReducers } from 'redux';

import notes from './reducers/Notes';
import alarms from './reducers/Alarms';
import todos from './reducers/Todos';
import passwords from './reducers/Passwords';

const personalDetailApp = combineReducers({
  notes,
  alarms,
  todos,
  passwords
});

export default personalDetailApp;