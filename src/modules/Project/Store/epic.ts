import { map, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  fetchHeaderFullFilled,
  fetchProjectFullFilled,
  fetchProjects,
  fetchProjectsFullFilled,
  redirectAfterCreation,
} from './actions';
import { Project, ProjectHeader } from 'common/api';
import { showNotification } from 'modules/Core/Store/actions';

const fetchProjectsEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_PROJECTS),
    mergeMap(() => {
      return from(Service.request(Project.list)).pipe(
        mergeMap((response: any) => {
            return concat(
              of(redirectAfterCreation(false)),
              of(fetchProjectsFullFilled(response)),
            );
          },
        ),
      );
    }),
  );
};

const createProjectEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.CREATE_PROJECT),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Project.create, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(showNotification('Project successfully created.')),
          );
        }),
      );
    }),
  );
};

const removeProjectEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.REMOVE_PROJECT),
    mergeMap(({ id }: any) => {
      return from(Service.request(Project.delete, { id })).pipe(
        mergeMap(() => {
          return concat(
            of(fetchProjects()),
            of(showNotification('Project successfully removed.')),
          );
        }),
      );
    }),
  );
};

const updateProjectEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_PROJECT),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Project.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchProjects()),
            of(showNotification('Project successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchProjectEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_PROJECT),
    mergeMap(({ id }: any) => {
      return from(Service.request(Project.find, { id })).pipe(
        map((response: any) => fetchProjectFullFilled(response)),
      );
    }),
  );
};

const fetchProjectHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_PROJECT_HEADER),
    mergeMap(() => {
      return from(Service.request(ProjectHeader.find)).pipe(
        map((response: any) => fetchHeaderFullFilled(response)),
      );
    }),
  );
};

const updateProjectHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_PROJECT_HEADER),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(ProjectHeader.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchProjects()),
            of(showNotification('Header successfully updated.')),
          );
        }),
      );
    }),
  );
};

export default {
  fetchProjectsEpic,
  createProjectEpic,
  fetchProjectEpic,
  updateProjectEpic,
  removeProjectEpic,
  fetchProjectHeaderEpic,
  updateProjectHeaderEpic,
};
