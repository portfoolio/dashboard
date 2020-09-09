import { ActionType } from './types';

export function fetchSettingFullFilled(setting: object) {
  return {
    type: ActionType.FETCH_SETTING_FULFILLED,
    setting,
  };
}

export function fetchSetting() {
  return {
    type: ActionType.FETCH_SETTING,
  };
}

export function redirectAfterUpdate(shouldRedirect: boolean) {
  return {
    type: ActionType.REDIRECT_AFTER_UPDATE,
    shouldRedirect,
  };
}

export function updateSetting(payload: object) {
  return {
    type: ActionType.UPDATE_SETTING,
    payload,
  };
}
