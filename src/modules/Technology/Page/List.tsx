import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as TechnologieRoute } from 'modules/Technologie/Router/types';
import ModuleTable from 'modules/Core/Component/Layout/Module/Table';
import { TableHeadDefinition } from 'modules/Core/Component/Layout/Module/Table/types';
import { fetchTechnologies, removeTechnologie } from 'modules/Technologie/Store/actions';

const breadcrumbs: any = [
  {
    title: 'Dashboard',
    route: formatRoute(HomeRoutes.HOME),
  },
  {
    title: 'Technologie',
    route: formatRoute(TechnologieRoute.LIST),
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
      key: 'comment',
      content: 'Comment',
      isSortable: false,
      width: 25,
    },
    {
      key: 'author',
      content: 'Author',
      isSortable: false,
      width: 25,
    },
  ],
};

export default (): ReactElement => {
  const { technologies }: any = useSelector((state: any) => state.technologie);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchTechnologies());
  }, [stableDispatch]);

  const remove = useCallback((id: string) => stableDispatch(removeTechnologie(id)), [stableDispatch]);

  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={breadcrumbs} />
      <section>
        {
          <ModuleTable
            title='Technologie'
            head={head}
            data={technologies}
            showActions={true}
            creationRoute={TechnologieRoute.CREATE}
            modificationRoute={(id: string): string => formatRoute(TechnologieRoute.EDIT, { id })}
            onDeleteConfirmed={(id: string): any => remove(id)}
          />
        }
      </section>
    </LayoutWrapper>
  );
}
