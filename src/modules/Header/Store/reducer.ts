import { ActionType } from './types';

const initialState = {
  header: {
    title: '',
    subtitle: '',
    description: '',
    image: '',
    links: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedIn: '',
      github: '',
    },
  },
  shouldRedirect: false,
};

export default (
  state = initialState,
  action: any,
): object => {
  switch (action.type) {
    case ActionType.FETCH_HEADER_FULFILLED:
    case ActionType.FETCH_HEADER:
      const header = action.header || initialState.header;
      return { ...state, header };

    case ActionType.UPDATE_HEADER:
      return { ...state };

    case ActionType.REDIRECT_AFTER_UPDATE:
      return { ...state, shouldRedirect: action.shouldRedirect };

    default:
      return state;
  }
};
