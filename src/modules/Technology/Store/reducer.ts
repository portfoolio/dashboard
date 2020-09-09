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
    case ActionType.FETCH_TECHNOLOGIES:
    case ActionType.FETCH_TECHNOLOGY:
    case ActionType.FETCH_TECHNOLOGY_FULFILLED:
      const technology = action.technology || initialState.currentItem;
      return { ...state, currentItem: technology };

    case ActionType.REMOVE_TECHNOLOGY:
      return { ...state };

    case ActionType.FETCH_TECHNOLOGIES_FULFILLED:
      const technologies = action.technologies || [];
      return { ...state, technologies };

    case ActionType.CREATE_TECHNOLOGY:
      return { ...state };

    case ActionType.REDIRECT_AFTER_CREATION:
      return { ...state, shouldRedirect: action.shouldRedirect };

    case ActionType.FETCH_TECHNOLOGY_HEADER:
    case ActionType.FETCH_TECHNOLOGY_HEADER_FUL_FILLED:
      const header = action.header || initialState.header;
      return { ...state, header };

    default:
      return state;
  }
};
