import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { createLogger } from 'redux-logger';

import clientReducer      from './reducers/clientReducer';
import productReducer     from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';

const logger = createLogger({
  collapsed: true,
  diff:      true,
});

const rootReducer = combineReducers({
  client:       clientReducer,
  product:      productReducer,
  shoppingCart: shoppingCartReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);
