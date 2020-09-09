import { map, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  fetchHeaderFullFilled,
  fetchTechnologies,
  fetchTechnologiesFullFilled,
  fetchTechnologyFullFilled,
  redirectAfterCreation,
} from './actions';
import { Technology, TechnologyHeader } from 'common/api';
import { showNotification } from 'modules/Core/Store/actions';

const fetchTechnologiesEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_TECHNOLOGIES),
    mergeMap(() => {
      return from(Service.request(Technology.list)).pipe(
        mergeMap((response: any) => {
            return concat(
              of(redirectAfterCreation(false)),
              of(fetchTechnologiesFullFilled(response)),
            );
          },
        ),
      );
    }),
  );
};

const createTechnologyEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.CREATE_TECHNOLOGY),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Technology.create, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(showNotification('Technology successfully created.')),
          );
        }),
      );
    }),
  );
};

const removeTechnologyEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.REMOVE_TECHNOLOGY),
    mergeMap(({ id }: any) => {
      return from(Service.request(Technology.delete, { id })).pipe(
        mergeMap(() => {
          return concat(
            of(fetchTechnologies()),
            of(showNotification('Technology successfully removed.')),
          );
        }),
      );
    }),
  );
};

const updateTechnologyEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_TECHNOLOGY),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Technology.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchTechnologies()),
            of(showNotification('Technology successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchTechnologyEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_TECHNOLOGY),
    mergeMap(({ id }: any) => {
      return from(Service.request(Technology.find, { id })).pipe(
        map((response: any) => fetchTechnologyFullFilled(response)),
      );
    }),
  );
};

const fetchTechnologyHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_TECHNOLOGY_HEADER),
    mergeMap(() => {
      return from(Service.request(TechnologyHeader.find)).pipe(
        map((response: any) => fetchHeaderFullFilled(response)),
      );
    }),
  );
};

const updateTechnologyHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_TECHNOLOGY_HEADER),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(TechnologyHeader.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchTechnologies()),
            of(showNotification('Header successfully updated.')),
          );
        }),
      );
    }),
  );
};

export default {
  fetchTechnologiesEpic,
  createTechnologyEpic,
  fetchTechnologyEpic,
  updateTechnologyEpic,
  removeTechnologyEpic,
  fetchTechnologyHeaderEpic,
  updateTechnologyHeaderEpic,
};
