import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

/*
 * configureStore
 * caller: App.js
 *
 */
export default function configureStore(initialState) {
  const logger = createLogger();
  const middleware = applyMiddleware(thunk, promise, logger);
  const store = createStore(
    rootReducer,
    initialState,
    middleware
  );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
