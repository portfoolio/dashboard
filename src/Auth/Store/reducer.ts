import { ActionType } from './types';

const initialState: any = {
  isAuthenticated: true,
  user: null,
  token: '',
};

export default (
  state: any = initialState,
  action: any,
): any => {
  switch (action.type) {
    case ActionType.LOGIN:
      return { ...state, data: action.data };

    case ActionType.LOGIN_SUCCESSFULLY:
      return {
        ...state,
        isAuthenticated: true,
        user: action.response.user,
        token: `Bearer ${action.response.accessToken}`,
      };

    case ActionType.LOGIN_FAILED:
      return {
        ...state,
        ...{
          isAuthenticated: false,
          user: null,
          token: '',
        },
      };

    case ActionType.LOGOUT:
      const logout: any = {
        isAuthenticated: false,
        user: null,
        token: null,
      };

      return {
        ...state,
        ...logout,
      };

    default:
      return state;
  }
};
