import { map, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  fetchHeaderFullFilled,
  fetchTechnologieFullFilled,
  fetchTechnologies,
  fetchTechnologiesFullFilled,
  redirectAfterCreation,
} from './actions';
import { Technologie, TechnologieHeader } from 'common/api';
import { showNotification } from 'modules/Core/Store/actions';

const fetchTechnologiesEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_TECHNOLOGIESS),
    mergeMap(() => {
      return from(Service.request(Technologie.list)).pipe(
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

const createTechnologieEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.CREATE_TECHNOLOGIES),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Technologie.create, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(showNotification('Technologie successfully created.')),
          );
        }),
      );
    }),
  );
};

const removeTechnologieEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.REMOVE_TECHNOLOGIES),
    mergeMap(({ id }: any) => {
      return from(Service.request(Technologie.delete, { id })).pipe(
        mergeMap(() => {
          return concat(
            of(fetchTechnologies()),
            of(showNotification('Technologie successfully removed.')),
          );
        }),
      );
    }),
  );
};

const updateTechnologieEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_TECHNOLOGIES),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Technologie.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchTechnologies()),
            of(showNotification('Technologie successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchTechnologieEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_TECHNOLOGIES),
    mergeMap(({ id }: any) => {
      return from(Service.request(Technologie.find, { id })).pipe(
        map((response: any) => fetchTechnologieFullFilled(response)),
      );
    }),
  );
};

const fetchTechnologieHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_TECHNOLOGIES_HEADER),
    mergeMap(() => {
      return from(Service.request(TechnologieHeader.find)).pipe(
        map((response: any) => fetchHeaderFullFilled(response)),
      );
    }),
  );
};

const updateTechnologieHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_TECHNOLOGIES_HEADER),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(TechnologieHeader.update, {}, data)).pipe(
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
  createTechnologieEpic,
  fetchTechnologieEpic,
  updateTechnologieEpic,
  removeTechnologieEpic,
  fetchTechnologieHeaderEpic,
  updateTechnologieHeaderEpic,
};
