import React, { ReactElement } from 'react';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as ProjectRoutes } from '../Router/types';
import Form from 'modules/Project/Component/Form';

export default (): ReactElement => {
  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={
        [
          {
            title: 'Dashboard',
            route: formatRoute(HomeRoutes.HOME),
          },
          {
            title: 'Project',
            route: formatRoute(ProjectRoutes.LIST),
          },
          {
            title: 'Create',
            route: formatRoute(ProjectRoutes.CREATE),
          },
        ]
      }
      >
      </LayoutTitle>
      <Form />
    </LayoutWrapper>
  );
}
