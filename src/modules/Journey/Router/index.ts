import withMetadata from 'util/withMetadata';
import { Route } from './types';
import { AppRouteDefinition } from 'modules/Core/types';

import JourneyList from 'modules/Journey/Page/List';
import JourneyListItem from 'modules/Journey/Page/ListItem';
import JourneyCreate from 'modules/Journey/Page/Create';
import JourneyEdit from 'modules/Journey/Page/Edit';
import JourneyHeader from 'modules/Journey/Page/Header';
import JourneyEditItem from 'modules/Journey/Page/EditItem';
import JourneyCreateItem from 'modules/Journey/Page/CreateItem';

const routes: AppRouteDefinition[] = [
  {
    path: Route.LIST,
    Component: withMetadata(JourneyList, {
      title: 'Journey',
    }),
    guarded: true,
  },
  {
    path: Route.CREATE,
    Component: withMetadata(JourneyCreate, {
      title: 'Create Journey',
    }),
    guarded: true,
  },
  {
    path: Route.EDIT,
    Component: withMetadata(JourneyEdit, {
      title: 'Edit Journey',
    }),
    guarded: true,
  },
  {
    path: Route.HEADER,
    Component: withMetadata(JourneyHeader, {
      title: 'Header',
    }),
    guarded: true,
  },
  {
    path: Route.ITEM_LIST,
    Component: withMetadata(JourneyListItem, {
      title: 'Journey Items',
    }),
    guarded: true,
  },
  {
    path: Route.CREATE_ITEM,
    Component: withMetadata(JourneyCreateItem, {
      title: 'Create Journey Item',
    }),
    guarded: true,
  },
  {
    path: Route.EDIT_ITEM,
    Component: withMetadata(JourneyEditItem, {
      title: 'Edit Journey Item',
    }),
    guarded: true,
  },
];

export default routes;
