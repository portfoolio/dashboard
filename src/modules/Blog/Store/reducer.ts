import { ActionType } from './types';

const initialState = {
  blogs: [],
  currentItem: {
    title: '',
    description: '',
    thumbnail: '',
    image: '',
    content: '',
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
    case ActionType.FETCH_BLOGS:
    case ActionType.FETCH_BLOG:
    case ActionType.FETCH_BLOG_FULFILLED:
      const blog = action.blog || initialState.currentItem;
      return { ...state, currentItem: blog };

    case ActionType.REMOVE_BLOG:
      return { ...state };

    case ActionType.FETCH_BLOGS_FULFILLED:
      const blogs = action.blogs || [];
      return { ...state, blogs };

    case ActionType.CREATE_BLOG:
      return { ...state };

    case ActionType.REDIRECT_AFTER_CREATION:
      return { ...state, shouldRedirect: action.shouldRedirect };

    case ActionType.FETCH_BLOG_HEADER:
    case ActionType.FETCH_BLOG_HEADER_FUL_FILLED:
      const header = action.header || initialState.header;
      return { ...state, header };

    default:
      return state;
  }
};
