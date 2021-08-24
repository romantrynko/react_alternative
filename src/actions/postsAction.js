import { accessToken } from '../constants';
import {
  POSTS_LOADED,
  START_POSTS_LOADING,
  ERROR_LOADING_POSTS,
  STOP_POSTS_LOADING
} from '../action-types';


export const getPosts = () => {
  return (dispatch) => {
    dispatch(startLoadingPosts());

    return fetch(`https://gorest.co.in/public-api/posts?access-token=${accessToken}`)
      .then(response => response.json())
      .then(json => {
        const result = json.data;

        dispatch({
          type: POSTS_LOADED,
          payload: result
        })
        dispatch(stopLoadingPosts());
      })
      .catch((error) => {
        dispatch({
          type: ERROR_LOADING_POSTS,
          payload: error
        })
      })
  }
};

export const startLoadingPosts = () => {
  return {
    type: START_POSTS_LOADING,
  }
};

export const stopLoadingPosts = () => {
  return {
    type: STOP_POSTS_LOADING,
  }
};