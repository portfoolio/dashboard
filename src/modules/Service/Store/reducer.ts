import { ActionType } from './types';

const initialState = {
  services: [],
  currentItem: {
    title: '',
    description: '',
    icon: '',
  },
  shouldRedirect: false,
};

export default (
  state = initialState,
  action: any,
): object => {
  switch (action.type) {
    case ActionType.FETCH_SERVICES:
    case ActionType.FETCH_SERVICE:
    case ActionType.FETCH_SERVICE_FULFILLED:
      const service = action.service;
      return { ...state, currentItem: service };

    case ActionType.REMOVE_SERVICE:
      return { ...state };

    case ActionType.FETCH_SERVICES_FULFILLED:
      const services = action.services || [];
      return { ...state, services };

    case ActionType.CREATE_SERVICE:
      return { ...state };

    case ActionType.REDIRECT_AFTER_CREATION:
      return { ...state, shouldRedirect: action.shouldRedirect };

    default:
      return state;
  }
};
