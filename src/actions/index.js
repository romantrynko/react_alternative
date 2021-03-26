import { DECREMENT, INCREMENT, ADD_TODO, REMOVE_TODO } from "../action-types";

export const inc = () => {
  return {
    type: INCREMENT,
    payload: 5
  }
};

export const dec = () => {
  return {
    type: DECREMENT,
    payload: 2
  }
};

export const addTodo = (newTodo) => {
  return {
    type: ADD_TODO,
    payload: newTodo
  }
};

export const removeTodo = (todo) => {
  return {
    type: REMOVE_TODO,
    payload: todo
  }
};

