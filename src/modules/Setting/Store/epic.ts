import { map, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  redirectAfterUpdate,
  fetchSettingFullFilled,
} from './actions';
import { Setting } from 'common/api';
import { showNotification } from 'modules/Core/Store/actions';

const updateSettingEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_SETTING),
    mergeMap(({ payload }: { payload: object }) => {
      return from(Service.request(Setting.update, {}, payload)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterUpdate(true)),
            of(showNotification('Setting successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchSettingEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_SETTING),
    mergeMap(() => {
      return from(Service.request(Setting.find)).pipe(
        map((response: any) => fetchSettingFullFilled(response)),
      );
    }),
  );
};

export default {
  fetchSettingEpic,
  updateSettingEpic,
};
