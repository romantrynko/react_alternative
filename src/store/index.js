import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../reducers';
import thunk from 'redux-thunk';
import { POSTS_LOADED } from "../action-types";

export const logger = store => next => action => {
  const currentStoreState = store.getState();

  console.log('Hello', currentStoreState, action);

  
    next(action);
};

export const trackPostsLoading = store => next => action => {
  if(action.type === POSTS_LOADED) {
    localStorage.setItem('postLoadedData', `${Date.now()}`)
  }
  next(action);
};

export const appStore = createStore(
  rootReducer(),
  composeWithDevTools(
    applyMiddleware(thunk, logger, trackPostsLoading)
  ));