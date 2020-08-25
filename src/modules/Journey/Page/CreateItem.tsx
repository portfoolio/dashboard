import React, { ReactElement } from 'react';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as JourneyRoutes } from '../Router/types';
import Form from 'modules/Journey/Component/FormItem';
import { withRouter } from 'react-router';

export default withRouter(({ match }: any): ReactElement => {
  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={
        [
          {
            title: 'Dashboard',
            route: formatRoute(HomeRoutes.HOME),
          },
          {
            title: 'Journey',
            route: formatRoute(JourneyRoutes.LIST),
          },
          {
            title: 'Create Item',
            route: formatRoute(JourneyRoutes.CREATE_ITEM, { journeyId: match.params.journeyId }),
          },
        ]
      }
      >
      </LayoutTitle>
      <Form />
    </LayoutWrapper>
  );
});
