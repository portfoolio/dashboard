import withMetadata from 'util/withMetadata';
import { Route } from './types';
import { AppRouteDefinition } from 'modules/Core/types';

import TechnologieList from 'modules/Technologie/Page/List';
import TechnologieCreate from 'modules/Technologie/Page/Create';
import TechnologieEdit from 'modules/Technologie/Page/Edit';
import TechnologieHeader from 'modules/Technologie/Page/Header';

const routes: AppRouteDefinition[] = [
  {
    path: Route.LIST,
    Component: withMetadata(TechnologieList, {
      title: 'Technologie',
    }),
    guarded: true,
  },
  {
    path: Route.CREATE,
    Component: withMetadata(TechnologieCreate, {
      title: 'Create Technologie',
    }),
    guarded: true,
  },
  {
    path: Route.EDIT,
    Component: withMetadata(TechnologieEdit, {
      title: 'Edit Technologie',
    }),
    guarded: true,
  },
  {
    path: Route.HEADER,
    Component: withMetadata(TechnologieHeader, {
      title: 'Header',
    }),
    guarded: true,
  },
];

export default routes;
