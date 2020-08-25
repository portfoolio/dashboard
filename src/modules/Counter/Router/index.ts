import withMetadata from 'util/withMetadata';
import { Route } from './types';
import { AppRouteDefinition } from 'modules/Core/types';

import CounterList from 'modules/Counter/Page/List';
import CounterCreate from 'modules/Counter/Page/Create';
import CounterEdit from 'modules/Counter/Page/Edit';

const routes: AppRouteDefinition[] = [
  {
    path: Route.LIST,
    Component: withMetadata(CounterList, {
      title: 'Counter',
    }),
    guarded: true,
  },
  {
    path: Route.CREATE,
    Component: withMetadata(CounterCreate, {
      title: 'Create Counter',
    }),
    guarded: true,
  },
  {
    path: Route.EDIT,
    Component: withMetadata(CounterEdit, {
      title: 'Edit Counter',
    }),
    guarded: true,
  },
];

export default routes;
