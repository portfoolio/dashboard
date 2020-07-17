import withMetadata from 'Core/util/withMetadata';
import ModuleAuthPageLogin from 'Auth/Page/Login/index';
import { Route } from './types';
import { AppRouteDefinition } from 'Core/types';

const routes: AppRouteDefinition[] = [
  {
    path: Route.LOGIN,
    Component: withMetadata(ModuleAuthPageLogin, {
      title: 'Login',
    }),
    guarded: false,
  },
];

export default routes;
