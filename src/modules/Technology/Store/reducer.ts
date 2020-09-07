import { ActionType } from './types';

const initialState = {
  technologies: [],
  currentItem: {
    image: '',
  },
  header: {
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
    case ActionType.FETCH_TECHNOLOGIESS:
    case ActionType.FETCH_TECHNOLOGIES:
    case ActionType.FETCH_TECHNOLOGIES_FULFILLED:
      const technologie = action.technologie || initialState.currentItem;
      return { ...state, currentItem: technologie };

    case ActionType.REMOVE_TECHNOLOGIES:
      return { ...state };

    case ActionType.FETCH_TECHNOLOGIESS_FULFILLED:
      const technologies = action.technologies || [];
      return { ...state, technologies };

    case ActionType.CREATE_TECHNOLOGIES:
      return { ...state };

    case ActionType.REDIRECT_AFTER_CREATION:
      return { ...state, shouldRedirect: action.shouldRedirect };

    case ActionType.FETCH_TECHNOLOGIES_HEADER:
    case ActionType.FETCH_TECHNOLOGIES_HEADER_FUL_FILLED:
      const header = action.header || initialState.header;
      return { ...state, header };

    default:
      return state;
  }
};
