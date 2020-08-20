import { ActionType } from './types';

const initialState = {
  about: {
    title: '',
    description: '',
  },
  shouldRedirect: false,
};

export default (
  state = initialState,
  action: any,
): object => {
  switch (action.type) {
    case ActionType.FETCH_ABOUT_FULFILLED:
    case ActionType.FETCH_ABOUT:
      const about = action.about;
      return { ...state, about };

    case ActionType.UPDATE_ABOUT:
      return { ...state };

    case ActionType.REDIRECT_AFTER_UPDATE:
      return { ...state, shouldRedirect: action.shouldRedirect };

    default:
      return state;
  }
};
