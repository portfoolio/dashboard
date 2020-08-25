import { ActionType } from './types';

export function fetchHeaderFullFilled(header: object) {
  return {
    type: ActionType.FETCH_HEADER_FULFILLED,
    header,
  };
}

export function fetchHeader() {
  return {
    type: ActionType.FETCH_HEADER,
  };
}

export function redirectAfterUpdate(shouldRedirect: boolean) {
  return {
    type: ActionType.REDIRECT_AFTER_UPDATE,
    shouldRedirect,
  };
}

export function updateHeader(payload: object) {
  return {
    type: ActionType.UPDATE_HEADER,
    payload,
  };
}
