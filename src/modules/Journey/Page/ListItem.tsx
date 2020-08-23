import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as JourneyRoute } from 'modules/Journey/Router/types';
import ModuleTable from 'modules/Core/Component/Layout/Module/Table';
import { TableHeadDefinition } from 'modules/Core/Component/Layout/Module/Table/types';
import { fetchJourneyItems, removeJourneyItem } from 'modules/Journey/Store/actions';

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
      key: 'subtitle',
      content: 'subtitle',
      isSortable: false,
      width: 25,
    },
    {
      key: 'description',
      content: 'Description',
      isSortable: false,
      width: 25,
    },
  ],
};

export default withRouter(({ match }: any): ReactElement => {
  const { journeyItems }: any = useSelector((state: any) => state.journey);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchJourneyItems(match.params.journeyId));
  }, [stableDispatch, match.params.journeyId]);

  const remove = useCallback((id: string) => stableDispatch(
    removeJourneyItem(match.params.journeyId, id)
  ), [stableDispatch, match.params.journeyId]);

  const breadcrumbs: any = [
    {
      title: 'Dashboard',
      route: formatRoute(HomeRoutes.HOME),
    },
    {
      title: 'Journey',
      route: formatRoute(JourneyRoute.LIST),
    },
    {
      title: 'Journey Items',
      route: formatRoute(JourneyRoute.ITEM_LIST, { journeyId: match.params.journeyId }),
    },
  ];

  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={breadcrumbs} />
      <section>
        {
          <ModuleTable
            title='Journey Items'
            head={head}
            data={journeyItems}
            showActions={true}
            creationRoute={formatRoute(JourneyRoute.CREATE_ITEM, { journeyId: match.params.journeyId })}
            modificationRoute={(id: string): string => formatRoute(JourneyRoute.EDIT_ITEM, {
              journeyId: match.params.journeyId,
              id,
            })}
            onDeleteConfirmed={(id: string): any => remove(id)}
          />
        }
      </section>
    </LayoutWrapper>
  );
});
