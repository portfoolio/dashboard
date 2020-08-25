import React, { ReactElement, useCallback, useEffect } from 'react';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as CounterRoute } from 'modules/Counter/Router/types';
import ModuleTable from 'modules/Core/Component/Layout/Module/Table';
import {
  TableHeadDefinition,
} from 'modules/Core/Component/Layout/Module/Table/types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCounters, removeCounter } from 'modules/Counter/Store/actions';

const breadcrumbs: any = [
  {
    title: 'Dashboard',
    route: formatRoute(HomeRoutes.HOME),
  },
  {
    title: 'Counter',
    route: formatRoute(CounterRoute.LIST),
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
      key: 'number',
      content: 'Number',
      isSortable: false,
      width: 25,
    },
  ],
};

export default (): ReactElement => {
  const { counters }: any = useSelector((state: any) => state.counter);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchCounters());
  }, [stableDispatch]);

  const remove = useCallback((id: string) => stableDispatch(removeCounter(id)), [stableDispatch]);

  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={breadcrumbs} />
      <section>
        {
          <ModuleTable
            title='Counter'
            head={head}
            data={counters}
            showActions={true}
            creationRoute={CounterRoute.CREATE}
            modificationRoute={(id: string): string => formatRoute(CounterRoute.EDIT, { id })}
            onDeleteConfirmed={(id: string): any => remove(id)}
          />
        }
      </section>
    </LayoutWrapper>
  );
}
