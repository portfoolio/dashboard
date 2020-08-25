import { map, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  fetchHeaderFullFilled,
  fetchServiceFullFilled,
  fetchServices,
  fetchServicesFullFilled,
  redirectAfterCreation,
} from './actions';
import { Service as ServiceEndpoints, ServiceHeader } from 'common/api';
import { showNotification } from 'modules/Core/Store/actions';

const fetchServicesEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_SERVICES),
    mergeMap(() => {
      return from(Service.request(ServiceEndpoints.list)).pipe(
        mergeMap((response: any) => {
            return concat(
              of(redirectAfterCreation(false)),
              of(fetchServicesFullFilled(response)),
            );
          },
        ),
      );
    }),
  );
};

const createServiceEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.CREATE_SERVICE),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(ServiceEndpoints.create, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(showNotification('Service successfully created.')),
          );
        }),
      );
    }),
  );
};

const removeServiceEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.REMOVE_SERVICE),
    mergeMap(({ id }: any) => {
      return from(Service.request(ServiceEndpoints.delete, { id })).pipe(
        mergeMap(() => {
          return concat(
            of(fetchServices()),
            of(showNotification('Service successfully removed.')),
          );
        }),
      );
    }),
  );
};

const updateServiceEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_SERVICE),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(ServiceEndpoints.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchServices()),
            of(showNotification('Service successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchServiceEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_SERVICE),
    mergeMap(({  id }: any) => {
      return from(Service.request(ServiceEndpoints.find, { id })).pipe(
        map((response: any) => fetchServiceFullFilled(response)),
      );
    }),
  );
};

const fetchServiceHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_SERVICE_HEADER),
    mergeMap(() => {
      return from(Service.request(ServiceHeader.find)).pipe(
        map((response: any) => fetchHeaderFullFilled(response)),
      );
    }),
  );
};

const updateServiceHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_SERVICE_HEADER),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(ServiceHeader.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchServices()),
            of(showNotification('Header successfully updated.')),
          );
        }),
      );
    }),
  );
};

export default {
  fetchServicesEpic,
  createServiceEpic,
  fetchServiceEpic,
  updateServiceEpic,
  removeServiceEpic,
  fetchServiceHeaderEpic,
  updateServiceHeaderEpic,
};
