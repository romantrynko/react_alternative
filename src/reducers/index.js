import { combineReducers } from 'redux';
import { ADD_TODO, REMOVE_TODO } from '../action-types';

const todoStore = {
  todos: []
};

const counterStore = {
  count: 0,
  property_1: 'test',
  a: {
    b: 3,
    C: 'hello'
  }
};

function todoReducer(store = todoStore, action) {
  switch (action.type) {
    case ADD_TODO: {
      const newTodo = action.payload;
      const { todos } = store;

      return {
        todos: { ...todos, newTodo }
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
  };
};

function counter(store = counterStore, action) {
  switch (action.type) {
    case 'INCREMENT': {
      const { count } = store;
      return {
        ...store,
        count: count + action.payload
      };
    }

    case 'DECREMENT': {
      const { count } = store;
      return {
        ...store,
        count: count - action.payload
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