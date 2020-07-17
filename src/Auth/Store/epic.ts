import { catchError, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'Core/util/Service';
import { ActionType } from './types';
import {
  loginFailed,
  loginSuccessfully,
} from './actions';
import { Auth } from 'medium/api';

const authLogin = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.LOGIN),
    mergeMap(({ data: { email, password } }) => {
      return from(Service.request({ endpoint: '/', path: '/', method: 'POST' }, {}, { email, password })).pipe(
        mergeMap((response: any) => {
            return concat(
              of(
                response.hasOwnProperty('accessToken')
                  ? loginSuccessfully(response)
                  : loginFailed(response),
              ),
            );
          },
        ),
        catchError(error => of(loginFailed(error))),
      );
    }),
  );
};

export default {
  authLogin,
};
