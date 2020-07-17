import { flatMap, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  fetchNotificationsFulFilled,
} from './actions';
import { NotificationWeb } from 'medium/api';

const fetchNotifications = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_NOTIFICATION),
    mergeMap(() => {
      return from(Service.request(NotificationWeb.list)).pipe(
        flatMap((response: any) => {
            return concat(
              of(fetchNotificationsFulFilled(response)),
            );
          },
        ),
      );
    }),
  );
};

export default {
  fetchNotifications,
};
