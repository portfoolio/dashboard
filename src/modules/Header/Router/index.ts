import withMetadata from 'util/withMetadata';
import Page from 'modules/Header/Page';
import { Route } from 'modules/Header/Router/types';
import { AppRouteDefinition } from 'modules/Core/types';

const routes: AppRouteDefinition[] = [
  {
    path: Route.HEADER,
    Component: withMetadata(Page, {
      title: 'Header',
    }),
    guarded: true,
  },
];

export default routes;
