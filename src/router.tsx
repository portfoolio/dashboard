import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatRoute } from 'react-router-named-routes';

import App from 'modules/Core/App';
import { Route as LoginRoute } from 'modules/Auth/Router/types';
import { AppRouteDefinition } from 'modules/Core/types';

let routers: AppRouteDefinition[] = [];

const req = require.context('./modules', true, /Router\/index\.ts$/);
req.keys().map((key: string) => {
  routers = routers.concat(req(key).default);
  return key;
});

export default (): ReactElement => {
  const { isAuthenticated }: any = useSelector((state: any) => state.auth);

  return (
    <BrowserRouter>
      <Switch>
        {
          routers.map(({ guarded, path, Component: PageComponent }: AppRouteDefinition, i: number) =>
            <Route
              key={i}
              exact
              path={path}
              render={() => (
                guarded && !isAuthenticated
                  ? <Redirect to={formatRoute(LoginRoute.LOGIN)} />
                  : <App> <PageComponent /> </App>
              )}
            />,
          )
        }
      </Switch>
    </BrowserRouter>
  );
}
