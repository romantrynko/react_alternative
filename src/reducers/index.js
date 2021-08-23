import { combineReducers } from "redux";
import { ADD_TODO, REMOVE_TODO, INCREMENT, DECREMENT, UPDATE_TODO, TOGGLE_TODO, ADD_USER } from "../action-types";
import { usersList } from '../constants';

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
      const arrCopy = [...todos];
      arrCopy.splice(index, 1);

      if (index > -1) {
        return {
          todos: arrCopy
        }
      };

      return store;
    }

    case UPDATE_TODO: {
      const { id } = action.payload;
      const { todos } = store;
      const arrCopy = [...todos];
      const index = todos.findIndex(item => item.id === id);

      if (index > -1) {
        arrCopy[index] = action.payload;

        return {
          todos: arrCopy
        }
      };
      return store;
    }

    case TOGGLE_TODO: {
      console.log('TOGGLE_TODO');
      const id = action.payload;
      const { todos } = store;
      const arrCopy = [...todos];
      const index = todos.findIndex(item => item.id === id);

      if (index > -1) {
        arrCopy[index].doneStatus = !arrCopy[index].doneStatus;

        return {
          todos: arrCopy
        };
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

const userDefaultStore = {
  users: usersList
};

function usersReducer(store = userDefaultStore, action) {
  switch (action.type) {
    case ADD_USER: {
      const newUser = action.payload;
      const { users } = store;
      return {
        users: [newUser, ...users]
      }
    }
    
    default: return store;
  }
};

export const createRootReducer = () => {
  return combineReducers({
    counter,
    todoReducer,
    usersReducer
  })
};