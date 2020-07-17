import axios from 'axios';
import store from 'store/index';
import { ActionType } from 'Core/Store/types';
import { ActionType as AuthActionTypes } from 'Auth/Store/types';

axios.interceptors.request.use(config => {
  store.dispatch({ type: ActionType.SHOW_LOADER });
  return config;
}, error => {
  store.dispatch({ type: ActionType.SHOW_LOADER });
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  store.dispatch({ type: ActionType.SHOW_LOADER });
  return response;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => response, error => {
  if ({ ...error }.response.status === 401) {
    store.dispatch({ type: ActionType.SHOW_LOADER });
    store.dispatch({ type: AuthActionTypes.LOGIN_FAILED });

    return null;
  }

  store.dispatch({ type: ActionType.SHOW_LOADER });
  return Promise.reject(error);
});

export default axios;
