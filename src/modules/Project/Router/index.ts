import withMetadata from 'util/withMetadata';
import { Route } from './types';
import { AppRouteDefinition } from 'modules/Core/types';

import ProjectList from 'modules/Project/Page/List';
import ProjectCreate from 'modules/Project/Page/Create';
import ProjectEdit from 'modules/Project/Page/Edit';
import ProjectHeader from 'modules/Project/Page/Header';

const routes: AppRouteDefinition[] = [
  {
    path: Route.LIST,
    Component: withMetadata(ProjectList, {
      title: 'Project',
    }),
    guarded: true,
  },
  {
    path: Route.CREATE,
    Component: withMetadata(ProjectCreate, {
      title: 'Create Project',
    }),
    guarded: true,
  },
  {
    path: Route.EDIT,
    Component: withMetadata(ProjectEdit, {
      title: 'Edit Project',
    }),
    guarded: true,
  },
  {
    path: Route.HEADER,
    Component: withMetadata(ProjectHeader, {
      title: 'Header',
    }),
    guarded: true,
  },
];

export default routes;
