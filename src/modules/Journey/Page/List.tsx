import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { formatRoute } from 'react-router-named-routes';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import Button from '@atlaskit/button';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as JourneyRoute } from 'modules/Journey/Router/types';
import ModuleTable from 'modules/Core/Component/Layout/Module/Table';
import { TableHeadDefinition, TableRowDataTransformation } from 'modules/Core/Component/Layout/Module/Table/types';
import { fetchJourneys, removeJourney } from 'modules/Journey/Store/actions';

const breadcrumbs: any = [
  {
    title: 'Dashboard',
    route: formatRoute(HomeRoutes.HOME),
  },
  {
    title: 'Journey',
    route: formatRoute(JourneyRoute.LIST),
  },
];

const head: TableHeadDefinition = {
  cells: [
    {
      key: 'id',
      content: '#',
      isSortable: true,
      width: 5,
    },
    {
      key: 'title',
      content: 'Title',
      isSortable: false,
      width: 25,
    },
    {
      key: '_id',
      content: 'Items',
      isSortable: false,
      width: 25,
    },
  ],
};

const dataTransformation: TableRowDataTransformation = {
  _id: ({ _id }): ReactNode => (
    <Link to={formatRoute(JourneyRoute.ITEM_LIST, { journeyId: _id })}>
      <Button appearance={'default'} iconBefore={<AppSwitcherIcon label={'Items'} size='small' />} />
    </Link>
  ),
};

export default withRouter((): ReactElement => {
  const { journeys }: any = useSelector((state: any) => state.journey);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchJourneys());
  }, [stableDispatch]);

  const remove = useCallback((id: string) => stableDispatch(removeJourney(id)), [stableDispatch]);

  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={breadcrumbs} />
      <section>
        {
          <ModuleTable
            title='Journey'
            head={head}
            data={journeys}
            dataTransformation={dataTransformation}
            showActions={true}
            creationRoute={JourneyRoute.CREATE}
            modificationRoute={(id: string): string => formatRoute(JourneyRoute.EDIT, { id })}
            onDeleteConfirmed={(id: string): any => remove(id)}
          />
        }
      </section>
    </LayoutWrapper>
  );
});
