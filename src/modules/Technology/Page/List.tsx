import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatRoute } from 'react-router-named-routes';
import Avatar, { AvatarItem } from '@atlaskit/avatar';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as TechnologyRoute } from 'modules/Technology/Router/types';
import ModuleTable from 'modules/Core/Component/Layout/Module/Table';
import {
  TableHeadDefinition,
  TableRowDataDefinition,
  TableRowDataTransformation
} from 'modules/Core/Component/Layout/Module/Table/types';
import { fetchTechnologies, removeTechnology } from 'modules/Technology/Store/actions';

const breadcrumbs: any = [
  {
    title: 'Dashboard',
    route: formatRoute(HomeRoutes.HOME),
  },
  {
    title: 'Technology',
    route: formatRoute(TechnologyRoute.LIST),
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
      key: 'image',
      content: 'Image',
      isSortable: false,
      width: 25,
    },
  ],
};

const dataTransformation: TableRowDataTransformation = {
  image: ({ image }: TableRowDataDefinition & {
    image: string,
  }): ReactNode => (
    <AvatarItem style={{ display: 'flex', justifyContent: 'center' }} avatar={<Avatar src={image} />} />
  ),
};

export default (): ReactElement => {
  const { technologies }: any = useSelector((state: any) => state.technology);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchTechnologies());
  }, [stableDispatch]);

  const remove = useCallback((id: string) => stableDispatch(removeTechnology(id)), [stableDispatch]);

  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={breadcrumbs} />
      <section>
        {
          <ModuleTable
            title='Technology'
            head={head}
            data={technologies}
            showActions={true}
            dataTransformation={dataTransformation}
            creationRoute={TechnologyRoute.CREATE}
            modificationRoute={(id: string): string => formatRoute(TechnologyRoute.EDIT, { id })}
            onDeleteConfirmed={(id: string): any => remove(id)}
          />
        }
      </section>
    </LayoutWrapper>
  );
}
