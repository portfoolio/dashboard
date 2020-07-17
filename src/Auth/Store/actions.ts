import { ActionType } from './types';

export function login(data: any): any {
  return {
    type: ActionType.LOGIN,
    data,
  };
}

export function logout(): any {
  return {
    type: ActionType.LOGOUT,
    user: null,
  };
}

export function loginSuccessfully(response: any) {
  return {
    type: ActionType.LOGIN_SUCCESSFULLY,
    response,
  };
}

export function loginFailed(response: any) {
  return {
    type: ActionType.LOGIN_FAILED,
    response,
  };
}
