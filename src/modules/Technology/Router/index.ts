import withMetadata from 'util/withMetadata';
import { Route } from './types';
import { AppRouteDefinition } from 'modules/Core/types';

import TechnologyList from 'modules/Technology/Page/List';
import TechnologyCreate from 'modules/Technology/Page/Create';
import TechnologyEdit from 'modules/Technology/Page/Edit';
import TechnologyHeader from 'modules/Technology/Page/Header';

const routes: AppRouteDefinition[] = [
  {
    path: Route.LIST,
    Component: withMetadata(TechnologyList, {
      title: 'Technology',
    }),
    guarded: true,
  },
  {
    path: Route.CREATE,
    Component: withMetadata(TechnologyCreate, {
      title: 'Create Technology',
    }),
    guarded: true,
  },
  {
    path: Route.EDIT,
    Component: withMetadata(TechnologyEdit, {
      title: 'Edit Technology',
    }),
    guarded: true,
  },
  {
    path: Route.HEADER,
    Component: withMetadata(TechnologyHeader, {
      title: 'Header',
    }),
    guarded: true,
  },
];

export default routes;
