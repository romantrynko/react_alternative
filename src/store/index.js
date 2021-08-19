import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { counter } from '../reducers';

export const appStore = createStore(counter, composeWithDevTools());