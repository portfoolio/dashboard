import withMetadata from 'util/withMetadata';
import { Route } from './types';
import { AppRouteDefinition } from 'modules/Core/types';

import TestimonialList from 'modules/Testimonial/Page/List';
import TestimonialCreate from 'modules/Testimonial/Page/Create';
import TestimonialEdit from 'modules/Testimonial/Page/Edit';
import TestimonialHeader from 'modules/Testimonial/Page/Header';

const routes: AppRouteDefinition[] = [
  {
    path: Route.LIST,
    Component: withMetadata(TestimonialList, {
      title: 'Testimonial',
    }),
    guarded: true,
  },
  {
    path: Route.CREATE,
    Component: withMetadata(TestimonialCreate, {
      title: 'Create Testimonial',
    }),
    guarded: true,
  },
  {
    path: Route.EDIT,
    Component: withMetadata(TestimonialEdit, {
      title: 'Edit Testimonial',
    }),
    guarded: true,
  },
  {
    path: Route.HEADER,
    Component: withMetadata(TestimonialHeader, {
      title: 'Header',
    }),
    guarded: true,
  },
];

export default routes;
