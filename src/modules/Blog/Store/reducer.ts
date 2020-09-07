import { ActionType } from './types';

const initialState = {
  testimonials: [],
  currentItem: {
    comment: '',
    author: '',
  },
  header: {
    title: '',
  },
  shouldRedirect: false,
};

export default (
  state = initialState,
  action: any,
): object => {
  switch (action.type) {
    case ActionType.FETCH_TESTIMONIALS:
    case ActionType.FETCH_TESTIMONIAL:
    case ActionType.FETCH_TESTIMONIAL_FULFILLED:
      const testimonial = action.testimonial || initialState.currentItem;
      return { ...state, currentItem: testimonial };

    case ActionType.REMOVE_TESTIMONIAL:
      return { ...state };

    case ActionType.FETCH_TESTIMONIALS_FULFILLED:
      const testimonials = action.testimonials || [];
      return { ...state, testimonials };

    case ActionType.CREATE_TESTIMONIAL:
      return { ...state };

    case ActionType.REDIRECT_AFTER_CREATION:
      return { ...state, shouldRedirect: action.shouldRedirect };

    case ActionType.FETCH_TESTIMONIAL_HEADER:
    case ActionType.FETCH_TESTIMONIAL_HEADER_FUL_FILLED:
      const header = action.header || initialState.header;
      return { ...state, header };

    default:
      return state;
  }
};
