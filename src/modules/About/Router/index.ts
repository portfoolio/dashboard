import withMetadata from 'util/withMetadata';
import Page from 'modules/About/Page';
import { Route } from 'modules/About/Router/types';
import { AppRouteDefinition } from 'modules/Core/types';

const routes: AppRouteDefinition[] = [
  {
    path: Route.ABOUT,
    Component: withMetadata(Page, {
      title: 'About',
    }),
    guarded: true,
  },
];

export default routes;
