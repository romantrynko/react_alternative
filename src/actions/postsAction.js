import { accessToken } from '../constants';
import { POSTS_LOADED } from '../action-types';


export const getPosts = () => {
  return (dispatch) => {
    return fetch(`https://gorest.co.in/public-api/posts?access-token=${accessToken}`)
      .then(response => response.json())
      .then(data => {
console.log(data.result);
        dispatch({
          type: POSTS_LOADED,
          payload: data.result
        })
      })
  }
}