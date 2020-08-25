import { map, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  redirectAfterUpdate,
  fetchAboutFullFilled,
} from './actions';
import { About } from 'common/api';
import { showNotification } from 'modules/Core/Store/actions';

const updateAboutEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_ABOUT),
    mergeMap(({ payload }: { payload: object }) => {
      return from(Service.request(About.update, {}, payload)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterUpdate(true)),
            of(showNotification('About successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchAboutEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_ABOUT),
    mergeMap(() => {
      return from(Service.request(About.find)).pipe(
        map((response: any) => fetchAboutFullFilled(response)),
      );
    }),
  );
};

export default {
  fetchAboutEpic,
  updateAboutEpic,
};
