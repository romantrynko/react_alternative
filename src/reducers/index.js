import { combineReducers } from "redux";
import { ADD_TODO, REMOVE_TODO, INCREMENT, DECREMENT } from "../action-types";

const defaultData = {
  count: 0,
  property: 'test',
  a: {
    b: 3,
    c: 'Romanych'
  }
};

const todoDefaultStore = {
  todos: []
};

function todoReducer(store = todoDefaultStore, action) {
  switch (action.type) {
    case ADD_TODO: {
      const newTodo = action.payload;
      const { todos } = store;

      return {
        todos: [...todos, newTodo]
      }
    }

    case REMOVE_TODO: {
      const { id } = action.payload;
      const { todos } = store;

      const index = todos.findIndex(item => item.id === id);

      if (index > -1) {
        return {
          todos: [...todos].splice(index, 1)
        }
      }

      return store;
    }

    default: return store;
  }
};

function counter(store = defaultData, action) {
  switch (action.type) {
    case INCREMENT:
      {
        return {
          ...store,
          count: store.count + action.payload
        };
      }

    case DECREMENT:
      {
        return {
          ...store,
          count: store.count - action.payload
        };
      }
    default:
      return store;
  }
};

export const createRootReducer = () => {
  return combineReducers({
    counter,
    todoReducer
  })
};