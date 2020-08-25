import { catchError, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from 'modules/Auth/Store/types';
import { loginFailed, loginSuccessfully, } from 'modules/Auth/Store/actions';
import { Auth } from 'common/api';

const authLogin = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.LOGIN),
    mergeMap(({ data: { email, password } }) => {
      return from(Service.request(Auth.login, {}, { email, password })).pipe(
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
