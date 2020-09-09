import { ActionType } from './types';

const initialState = {
  setting: {
    siteTitle: '',

    siteDescription: '',

    favicon: '',

    showCounter: true,

    showAbout: true,

    showService: true,

    showJourney: true,

    showProject: true,

    showTestimonial: true,

    showTechnology: true,

    showBlog: true,

    showContact: true,

    appearance: 'Product "dark"',
  },
  shouldRedirect: false,
};

export default (
  state = initialState,
  action: any,
): object => {
  switch (action.type) {
    case ActionType.FETCH_SETTING_FULFILLED:
    case ActionType.FETCH_SETTING:
      const setting = action.setting || initialState.setting;
      return { ...state, setting };

    case ActionType.UPDATE_SETTING:
      return { ...state };

    case ActionType.REDIRECT_AFTER_UPDATE:
      return { ...state, shouldRedirect: action.shouldRedirect };

    default:
      return state;
  }
};
