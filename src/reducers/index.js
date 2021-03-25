const defaultData = { count: 0 }

export function counter(store = defaultData, action) {
  switch (action.type) {
    case 'INCREMENT': {
      const { count } = store;
      return { count: count + action.payload };
    }

    case 'DECREMENT': {
      const { count } = store;
      return { count: count - action.payload };
    }
    
    default:
      return store;
  }
};