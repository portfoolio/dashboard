import { ActionType } from './types';

const initialState = {
  counters: [],
  currentItem: {
    title: '',
    number: 0,
  },
  shouldRedirect: false,
};

export default (
  state = initialState,
  action: any,
): object => {
  switch (action.type) {
    case ActionType.FETCH_COUNTERS:
    case ActionType.FETCH_COUNTER:
    case ActionType.FETCH_COUNTER_FULFILLED:
      const counter = action.counter;
      return { ...state, currentItem: counter };

    case ActionType.REMOVE_COUNTER:
      return { ...state };

    case ActionType.FETCH_COUNTERS_FULFILLED:
      const counters = action.counters || [];
      return { ...state, counters };

    case ActionType.CREATE_COUNTER:
      return { ...state };

    case ActionType.REDIRECT_AFTER_CREATION:
      return { ...state, shouldRedirect: action.shouldRedirect };

    default:
      return state;
  }
};
