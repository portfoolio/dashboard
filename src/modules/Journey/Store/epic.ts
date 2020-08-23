import { map, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  fetchHeaderFullFilled,
  fetchJourneyFullFilled, fetchJourneyItemFullFilled, fetchJourneyItems, fetchJourneyItemsFullFilled,
  fetchJourneys,
  fetchJourneysFullFilled,
  redirectAfterCreation,
} from './actions';
import { Journey, JourneyHeader, JourneyItem } from 'common/api';
import { showNotification } from 'modules/Core/Store/actions';

const fetchJourneysEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_JOURNEYS),
    mergeMap(() => {
      return from(Service.request(Journey.list)).pipe(
        mergeMap((response: any) => {
            return concat(
              of(redirectAfterCreation(false)),
              of(fetchJourneysFullFilled(response)),
            );
          },
        ),
      );
    }),
  );
};

const createJourneyEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.CREATE_JOURNEY),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Journey.create, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(showNotification('Journey successfully created.')),
          );
        }),
      );
    }),
  );
};

const removeJourneyEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.REMOVE_JOURNEY),
    mergeMap(({ id }: any) => {
      return from(Service.request(Journey.delete, { id })).pipe(
        mergeMap(() => {
          return concat(
            of(fetchJourneys()),
            of(showNotification('Journey successfully removed.')),
          );
        }),
      );
    }),
  );
};

const updateJourneyEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_JOURNEY),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Journey.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchJourneys()),
            of(showNotification('Journey successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchJourneyEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_JOURNEY),
    mergeMap(({ id }: any) => {
      return from(Service.request(Journey.find, { id })).pipe(
        map((response: any) => fetchJourneyFullFilled(response)),
      );
    }),
  );
};

const fetchJourneyHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_JOURNEY_HEADER),
    mergeMap(() => {
      return from(Service.request(JourneyHeader.find)).pipe(
        map((response: any) => fetchHeaderFullFilled(response)),
      );
    }),
  );
};

const updateJourneyHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_JOURNEY_HEADER),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(JourneyHeader.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchJourneys()),
            of(showNotification('Header successfully updated.')),
          );
        }),
      );
    }),
  );
};

// Journey items
const fetchJourneyItemsEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_JOURNEY_ITEMS),
    mergeMap(({ journeyId }: any) => {
      return from(Service.request(JourneyItem.list, { journeyId })).pipe(
        mergeMap((response: any) => {
            return concat(
              of(redirectAfterCreation(false)),
              of(fetchJourneyItemsFullFilled(response)),
            );
          },
        ),
      );
    }),
  );
};

const createJourneyItemEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.CREATE_JOURNEY_ITEM),
    mergeMap(({ journeyId, data }: { journeyId: string, data: object }) => {
      return from(Service.request(JourneyItem.create, { id: journeyId }, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(showNotification('Journey item successfully created.')),
          );
        }),
      );
    }),
  );
};

const removeJourneyItemEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.REMOVE_JOURNEY_ITEM),
    mergeMap(({ journeyId, id }: any) => {
      return from(Service.request(JourneyItem.delete, { journeyId, id })).pipe(
        mergeMap(() => {
          return concat(
            of(fetchJourneyItems(journeyId)),
            of(showNotification('Journey item successfully removed.')),
          );
        }),
      );
    }),
  );
};

const updateJourneyItemEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_JOURNEY_ITEM),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(JourneyItem.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchJourneys()),
            of(showNotification('Journey item successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchJourneyItemEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_JOURNEY_ITEM),
    mergeMap(({ id }: any) => {
      return from(Service.request(JourneyItem.find, { id })).pipe(
        map((response: any) => fetchJourneyItemFullFilled(response)),
      );
    }),
  );
};

export default {
  fetchJourneysEpic,
  createJourneyEpic,
  fetchJourneyEpic,
  updateJourneyEpic,
  removeJourneyEpic,
  fetchJourneyHeaderEpic,
  updateJourneyHeaderEpic,

  fetchJourneyItemsEpic,
  fetchJourneyItemEpic,
  createJourneyItemEpic,
  updateJourneyItemEpic,
  removeJourneyItemEpic,
};
