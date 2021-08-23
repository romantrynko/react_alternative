import { POSTS_LOADED } from "../action-types";

const defaultValue = {
  posts: []
};

export const postsReducer = (store = defaultValue, action) => {
  switch (action.type) {
    case POSTS_LOADED: {
      return {
        ...store,
        posts: action.payload
      }
    }
    default: return store;
  }
};