import React, { ReactElement } from 'react';
import { withRouter } from 'react-router';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as BlogRoutes } from '../Router/types';
import Form from 'modules/Blog/Component/Form';

export default withRouter((): ReactElement => {
  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={
        [
          {
            title: 'Dashboard',
            route: formatRoute(HomeRoutes.HOME),
          },
          {
            title: 'Blog',
            route: formatRoute(BlogRoutes.LIST),
          },
          {
            title: 'Edit',
            route: formatRoute(BlogRoutes.EDIT),
          },
        ]
      }
      >
      </LayoutTitle>
      <Form />
    </LayoutWrapper>
  );
});
