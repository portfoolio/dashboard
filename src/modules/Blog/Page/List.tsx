import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatRoute } from 'react-router-named-routes';
import Avatar, { AvatarItem } from '@atlaskit/avatar';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as BlogRoute } from 'modules/Blog/Router/types';
import ModuleTable from 'modules/Core/Component/Layout/Module/Table';
import {
  TableHeadDefinition,
  TableRowDataDefinition,
  TableRowDataTransformation
} from 'modules/Core/Component/Layout/Module/Table/types';
import { fetchBlogs, removeBlog } from 'modules/Blog/Store/actions';

const breadcrumbs: any = [
  {
    title: 'Dashboard',
    route: formatRoute(HomeRoutes.HOME),
  },
  {
    title: 'Blog',
    route: formatRoute(BlogRoute.LIST),
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
      key: 'thumbnail',
      content: 'Thumbnail',
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

const dataTransformation: TableRowDataTransformation = {
  thumbnail: ({ thumbnail }: TableRowDataDefinition & {
    thumbnail: string,
  }): ReactNode => (
    <AvatarItem style={{ display: 'flex', justifyContent: 'center' }} avatar={<Avatar src={thumbnail} />} />
  ),
};

export default (): ReactElement => {
  const { blogs }: any = useSelector((state: any) => state.blog);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchBlogs());
  }, [stableDispatch]);

  const remove = useCallback((id: string) => stableDispatch(removeBlog(id)), [stableDispatch]);

  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={breadcrumbs} />
      <section>
        {
          <ModuleTable
            title='Blog'
            head={head}
            data={blogs}
            showActions={true}
            creationRoute={BlogRoute.CREATE}
            dataTransformation={dataTransformation}
            modificationRoute={(id: string): string => formatRoute(BlogRoute.EDIT, { id })}
            onDeleteConfirmed={(id: string): any => remove(id)}
          />
        }
      </section>
    </LayoutWrapper>
  );
}
