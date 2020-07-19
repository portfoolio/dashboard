import { mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'Core/util/Service';
import { ActionType } from './types';
import {
  fetchNotificationsFulFilled,
} from './actions';

const fetchNotifications = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_NOTIFICATION),
    mergeMap(() => {
      return from(Service.request({ method: 'POST', path: 'bogus' })).pipe(
        mergeMap((response: any) => {
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
