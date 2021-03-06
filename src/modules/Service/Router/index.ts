import withMetadata from 'util/withMetadata';
import { Route } from './types';
import { AppRouteDefinition } from 'modules/Core/types';

import ServiceList from 'modules/Service/Page/List';
import ServiceCreate from 'modules/Service/Page/Create';
import ServiceEdit from 'modules/Service/Page/Edit';
import ServiceHeader from 'modules/Service/Page/Header';

const routes: AppRouteDefinition[] = [
  {
    path: Route.LIST,
    Component: withMetadata(ServiceList, {
      title: 'Service',
    }),
    guarded: true,
  },
  {
    path: Route.CREATE,
    Component: withMetadata(ServiceCreate, {
      title: 'Create Service',
    }),
    guarded: true,
  },
  {
    path: Route.EDIT,
    Component: withMetadata(ServiceEdit, {
      title: 'Edit Service',
    }),
    guarded: true,
  },
  {
    path: Route.HEADER,
    Component: withMetadata(ServiceHeader, {
      title: 'Header',
    }),
    guarded: true,
  },
];

export default routes;
