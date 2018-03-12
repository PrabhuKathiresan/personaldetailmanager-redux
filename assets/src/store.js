import { createStore, applyMiddleware } from 'redux';
import apiMiddleware from './apiMiddleware';
import personalDetailApp from './reducers';

function configureStore(initialState) {
  return createStore(personalDetailApp, initialState, applyMiddleware(apiMiddleware));
}

export default configureStore();