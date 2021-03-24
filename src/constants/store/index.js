import { createStore } from 'redux';

function counterReducer(state = { value: 0 }, action) {
    switch (action.type) {
        case 'INCREMENT':
            const { value } = state;
            return { value: value + 1 }
        case 'DECREMENT':
            return { value: value - 1 }
        default:
            return state
    }
};

let store = createStore(counterReducer);