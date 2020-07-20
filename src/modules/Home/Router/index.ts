import withMetadata from 'util/withMetadata';
import Main from 'modules/Home/Page';
import { Route } from 'modules/Home/Router/types';
import { AppRouteDefinition } from 'modules/Core/types';

const routes: AppRouteDefinition[] = [
  {
    path: Route.HOME,
    Component: withMetadata(Main, {
      title: 'Dashboard',
    }),
    guarded: true,
  },
];

export default routes;
