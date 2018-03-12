import axios from 'axios';
import NoteActions from './actions/Notes';

import actionTypes from './constants/action-types';

const apiMiddleware = store => next => (action) => {
  // Pass all actions through by default
  next(action);
  switch (action.type) {
    // In case we receive an action to send an API request
    case actionTypes.INIT_NOTE:
      // Dispatch GET_MOVIE_DATA_LOADING to update loading state
      // store.dispatch({ type: 'GET_MOVIE_DATA_LOADING' });
      // Make API call and dispatch appropriate actions when done
      // fetch(`${API}/movies.json`)
      //   .then(response => response.json())
      //   .then(data => next({
      //     type: 'GET_MOVIE_DATA_RECEIVED',
      //     data
      //   }))
      //   .catch(error => next({
      //     type: 'GET_MOVIE_DATA_ERROR',
      //     error
      //   }));
      NoteActions.getNotes('/api/get/notes?limit=10&skip=0').then((response) => {
        next({
          type: actionTypes.GET_NOTE,
          notes: response.notes
        });
      }).catch(err => console.log(err));
      break;
    // Do nothing if the action does not interest us
    default:
      break;
  }
};

export default apiMiddleware;