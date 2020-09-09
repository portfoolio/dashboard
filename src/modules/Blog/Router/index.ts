import withMetadata from 'util/withMetadata';
import { Route } from './types';
import { AppRouteDefinition } from 'modules/Core/types';

import BlogList from 'modules/Blog/Page/List';
import BlogCreate from 'modules/Blog/Page/Create';
import BlogEdit from 'modules/Blog/Page/Edit';
import BlogHeader from 'modules/Blog/Page/Header';

const routes: AppRouteDefinition[] = [
  {
    path: Route.LIST,
    Component: withMetadata(BlogList, {
      title: 'Blog',
    }),
    guarded: true,
  },
  {
    path: Route.CREATE,
    Component: withMetadata(BlogCreate, {
      title: 'Create Blog',
    }),
    guarded: true,
  },
  {
    path: Route.EDIT,
    Component: withMetadata(BlogEdit, {
      title: 'Edit Blog',
    }),
    guarded: true,
  },
  {
    path: Route.HEADER,
    Component: withMetadata(BlogHeader, {
      title: 'Header',
    }),
    guarded: true,
  },
];

export default routes;
