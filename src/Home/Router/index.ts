import withMetadata from 'Core/util/withMetadata';
import Main from 'Home/Page';
import { Route } from './types';
import { AppRouteDefinition } from 'Core/types';

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
