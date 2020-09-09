import React, { ReactElement } from 'react';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as TechnologyRoutes } from '../Router/types';
import Form from 'modules/Technology/Component/Form';

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
            title: 'Technology',
            route: formatRoute(TechnologyRoutes.LIST),
          },
          {
            title: 'Create',
            route: formatRoute(TechnologyRoutes.CREATE),
          },
        ]
      }
      >
      </LayoutTitle>
      <Form />
    </LayoutWrapper>
  );
}
