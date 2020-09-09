import React, { ReactElement } from 'react';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';

import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as HeaderRoutes } from 'modules/Header/Router/types';
import HeaderForm from 'modules/Header/Component/Form';

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
            title: 'Testimonial',
            route: formatRoute(HeaderRoutes.HEADER),
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
