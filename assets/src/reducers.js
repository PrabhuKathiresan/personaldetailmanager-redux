import { combineReducers } from 'redux';

import notes from './reducers/Notes';
import alarms from './reducers/Alarms';
import todos from './reducers/Todos';

const personalDetailApp = combineReducers({
  notes,
  alarms,
  todos
});

export default personalDetailApp;