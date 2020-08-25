import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatRoute } from 'react-router-named-routes';
import Avatar, { AvatarItem } from '@atlaskit/avatar';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as ProjectRoute } from 'modules/Project/Router/types';
import ModuleTable from 'modules/Core/Component/Layout/Module/Table';
import {
  TableHeadDefinition, TableRowDataDefinition, TableRowDataTransformation,
} from 'modules/Core/Component/Layout/Module/Table/types';
import { fetchProjects, removeProject } from 'modules/Project/Store/actions';

const breadcrumbs: any = [
  {
    title: 'Dashboard',
    route: formatRoute(HomeRoutes.HOME),
  },
  {
    title: 'Project',
    route: formatRoute(ProjectRoute.LIST),
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
      width: 15,
    },
    {
      key: 'title',
      content: 'Title',
      isSortable: false,
      width: 25,
    },
    {
      key: 'subtitle',
      content: 'Subtitle',
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
  const { projects }: any = useSelector((state: any) => state.project);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchProjects());
  }, [stableDispatch]);

  const remove = useCallback((id: string) => stableDispatch(removeProject(id)), [stableDispatch]);

  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={breadcrumbs} />
      <section>
        {
          <ModuleTable
            title='Project'
            head={head}
            data={projects}
            showActions={true}
            dataTransformation={dataTransformation}
            creationRoute={ProjectRoute.CREATE}
            modificationRoute={(id: string): string => formatRoute(ProjectRoute.EDIT, { id })}
            onDeleteConfirmed={(id: string): any => remove(id)}
          />
        }
      </section>
    </LayoutWrapper>
  );
}
