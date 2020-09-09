import withMetadata from 'util/withMetadata';
import Page from 'modules/Setting/Page';
import { Route } from 'modules/Setting/Router/types';
import { AppRouteDefinition } from 'modules/Core/types';

const routes: AppRouteDefinition[] = [
  {
    path: Route.SETTING,
    Component: withMetadata(Page, {
      title: 'Setting',
    }),
    guarded: true,
  },
];

export default routes;
