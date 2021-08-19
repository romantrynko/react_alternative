const defaultData = {
  count: 0,
  property: 'test'
}

export function counter(store = defaultData, action) {
  switch (action.type) {
    case 'INCREMENT':
      {
        return {
          ...store,
          count: store.count + action.payload
        };
      }

    case 'DECREMENT':
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