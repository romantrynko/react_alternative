import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createRootReducer } from '../reducers';
import thunk from 'redux-thunk';

export const appStore = createStore(createRootReducer(), composeWithDevTools(
  applyMiddleware(thunk)
));