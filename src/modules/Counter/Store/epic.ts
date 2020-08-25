import { map, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  fetchCounterFullFilled, fetchCounters,
  fetchCountersFullFilled,
  redirectAfterCreation,
} from './actions';
import { Counter } from 'common/api';
import { showNotification } from 'modules/Core/Store/actions';

const fetchCountersEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_COUNTERS),
    mergeMap(() => {
      return from(Service.request(Counter.list)).pipe(
        mergeMap((response: any) => {
            return concat(
              of(redirectAfterCreation(false)),
              of(fetchCountersFullFilled(response)),
            );
          },
        ),
      );
    }),
  );
};

const createCounterEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.CREATE_COUNTER),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Counter.create, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(showNotification('Counter successfully created.')),
          );
        }),
      );
    }),
  );
};

const removeCounterEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.REMOVE_COUNTER),
    mergeMap(({ id }: any) => {
      return from(Service.request(Counter.delete, { id })).pipe(
        mergeMap(() => {
          return concat(
            of(fetchCounters()),
            of(showNotification('Counter successfully removed.')),
          );
        }),
      );
    }),
  );
};

const updateCounterEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_COUNTER),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Counter.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchCounters()),
            of(showNotification('Counter successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchCounterEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_COUNTER),
    mergeMap(({  id }: any) => {
      return from(Service.request(Counter.find, { id })).pipe(
        map((response: any) => fetchCounterFullFilled(response)),
      );
    }),
  );
};

export default {
  fetchCountersEpic,
  createCounterEpic,
  fetchCounterEpic,
  updateCounterEpic,
  removeCounterEpic,
};
