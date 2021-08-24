import { accessToken } from '../constants';
import {
  POSTS_LOADED,
  ERROR_LOADING_USERS,
  START_USERS_LOADING,
  STOP_USERS_LOADING
} from '../action-types';

export const getUsers = (dispatch) => {
  return (dispatch) => {
    dispatch(startLoadingUsers());

    return fetch(`https://gorest.co.in/public-api/users?access-token=${accessToken}`)
      .then(response => response.json())
      .then(json => {
        const result = json.data;

        dispatch({
          type: POSTS_LOADED,
          payload: result
        })
        dispatch(stopLoadingUsers());
      })
      .catch((error) => {
        dispatch({
          type: ERROR_LOADING_USERS,
          payload: error
        })
      })
  }
};

export const startLoadingUsers = () => {
  return {
    type: START_USERS_LOADING,
  }
};

export const stopLoadingUsers = () => {
  return {
    type: STOP_USERS_LOADING,
  }
};