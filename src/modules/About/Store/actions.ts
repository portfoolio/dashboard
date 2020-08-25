import { ActionType } from './types';

export function fetchAboutFullFilled(about: object) {
  return {
    type: ActionType.FETCH_ABOUT_FULFILLED,
    about,
  };
}

export function fetchAbout() {
  return {
    type: ActionType.FETCH_ABOUT,
  };
}

export function redirectAfterUpdate(shouldRedirect: boolean) {
  return {
    type: ActionType.REDIRECT_AFTER_UPDATE,
    shouldRedirect,
  };
}

export function updateAbout(payload: object) {
  return {
    type: ActionType.UPDATE_ABOUT,
    payload,
  };
}
