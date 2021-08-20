import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { counter } from '../reducers';
import { createRootReducers } from './../reducers/index';

export const appStore = createStore(createRootReducers(), composeWithDevTools());