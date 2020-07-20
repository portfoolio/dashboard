import withMetadata from 'util/withMetadata';
import ModuleAuthPageLogin from 'modules/Auth/Page/Login';
import { Route } from 'modules/Auth/Router/types';
import { AppRouteDefinition } from 'modules/Core/types';

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
