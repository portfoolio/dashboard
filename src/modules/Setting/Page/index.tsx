import React, { ReactElement } from 'react';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';

import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as SettingRoutes } from 'modules/Setting/Router/types';
import Form from 'modules/Setting/Component/Form';

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
            title: 'Setting',
            route: formatRoute(SettingRoutes.SETTING),
          },
        ]
      }>
      </LayoutTitle>
      <section>
        <Form />
      </section>
    </LayoutWrapper>
  );
};
