import { ActionType } from './types';

export function showNotification(description = '') {
  return {
    type: ActionType.SHOW_NOTIFICATION,
    showNotification: true,
    notificationDescription: description,
  };
}

export function showLoader() {
  return {
    type: ActionType.SHOW_LOADER,
  };
}

export function fetchNotifications() {
  return {
    type: ActionType.FETCH_NOTIFICATION,
  };
}

export function fetchNotificationsFulFilled(notification: [] = []) {
  return {
    type: ActionType.FETCH_NOTIFICATION_FUL_FILLED,
    notification,
  };
}
