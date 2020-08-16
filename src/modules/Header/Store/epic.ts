import { map, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  redirectAfterUpdate,
  fetchHeaderFullFilled,
} from './actions';
import { Header } from 'common/api';
import { showNotification } from 'modules/Core/Store/actions';

const updateHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_HEADER),
    mergeMap(({ payload }: { payload: object }) => {
      return from(Service.request(Header.update, {}, payload)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterUpdate(true)),
            of(showNotification('Header successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_HEADER),
    mergeMap(() => {
      return from(Service.request(Header.find)).pipe(
        map((response: any) => fetchHeaderFullFilled(response)),
      );
    }),
  );
};

export default {
  fetchHeaderEpic,
  updateHeaderEpic,
};
