import { ActionType } from './types';

const initialState: any = {
  notifications: [],
  showLoader: false,
  notification: [],
};

export default (
  state = initialState,
  action: any,
): object => {
  switch (action.type) {
    case ActionType.FETCH_NOTIFICATION:
      return { ...state, notification: initialState.notification };
    case ActionType.FETCH_NOTIFICATION_FUL_FILLED:
      return { ...state, notification: action.notification };

    case ActionType.SHOW_NOTIFICATION:
      const { notificationDescription }: { notificationDescription: string } = action;
      state.notifications = [...state.notifications, notificationDescription];

      return { ...state };

    case ActionType.REMOVE_NOTIFICATION:
      state.notifications = state.notifications.slice(1);

      return { ...state };

    case ActionType.SHOW_LOADER:
      state.showLoader = !state.showLoader;

      return { ...state };
    default:
      return state;
  }
};
