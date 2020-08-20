import React, { ReactElement, useCallback, useEffect } from 'react';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as ServiceRoute } from 'modules/Service/Router/types';
import ModuleTable from 'modules/Core/Component/Layout/Module/Table';
import {
  TableHeadDefinition,
} from 'modules/Core/Component/Layout/Module/Table/types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, removeService } from 'modules/Service/Store/actions';

const breadcrumbs: any = [
  {
    title: 'Dashboard',
    route: formatRoute(HomeRoutes.HOME),
  },
  {
    title: 'Service',
    route: formatRoute(ServiceRoute.LIST),
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
      key: 'icon',
      content: 'Icon',
      isSortable: false,
      width: 25,
    },
    {
      key: 'title',
      content: 'Title',
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

export default (): ReactElement => {
  const { services }: any = useSelector((state: any) => state.service);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchServices());
  }, [stableDispatch]);

  const remove = useCallback((id: string) => stableDispatch(removeService(id)), [stableDispatch]);

  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={breadcrumbs} />
      <section>
        {
          <ModuleTable
            title='Service'
            head={head}
            data={services}
            showActions={true}
            creationRoute={ServiceRoute.CREATE}
            modificationRoute={(id: string): string => formatRoute(ServiceRoute.EDIT, { id })}
            onDeleteConfirmed={(id: string): any => remove(id)}
          />
        }
      </section>
    </LayoutWrapper>
  );
}
