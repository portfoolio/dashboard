import { ActionType } from './types';

const initialState = {
  projects: [],
  currentItem: {
    title: '',
    subtitle: '',
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
    case ActionType.FETCH_PROJECTS:
    case ActionType.FETCH_PROJECT:
    case ActionType.FETCH_PROJECT_FULFILLED:
      const project = action.project || initialState.currentItem;
      return { ...state, currentItem: project };

    case ActionType.REMOVE_PROJECT:
      return { ...state };

    case ActionType.FETCH_PROJECTS_FULFILLED:
      const projects = action.projects || [];
      return { ...state, projects };

    case ActionType.CREATE_PROJECT:
      return { ...state };

    case ActionType.REDIRECT_AFTER_CREATION:
      return { ...state, shouldRedirect: action.shouldRedirect };

    case ActionType.FETCH_PROJECT_HEADER:
    case ActionType.FETCH_PROJECT_HEADER_FUL_FILLED:
      const header = action.header || initialState.header;
      return { ...state, header };

    default:
      return state;
  }
};
