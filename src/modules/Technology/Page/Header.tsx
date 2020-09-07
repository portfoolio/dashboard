import React, { ReactElement } from 'react';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';

import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as TechnologieRoutes } from 'modules/Technologie/Router/types';
import HeaderForm from 'modules/Technologie/Component/HeaderForm';

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
            title: 'Header',
            route: formatRoute(TechnologieRoutes.HEADER),
          },
        ]
      }>
      </LayoutTitle>
      <section>
        <HeaderForm />
      </section>
    </LayoutWrapper>
  );
};
