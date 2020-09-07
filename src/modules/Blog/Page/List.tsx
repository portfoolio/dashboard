import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as TestimonialRoute } from 'modules/Testimonial/Router/types';
import ModuleTable from 'modules/Core/Component/Layout/Module/Table';
import { TableHeadDefinition } from 'modules/Core/Component/Layout/Module/Table/types';
import { fetchTestimonials, removeTestimonial } from 'modules/Testimonial/Store/actions';

const breadcrumbs: any = [
  {
    title: 'Dashboard',
    route: formatRoute(HomeRoutes.HOME),
  },
  {
    title: 'Testimonial',
    route: formatRoute(TestimonialRoute.LIST),
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
  const { testimonials }: any = useSelector((state: any) => state.testimonial);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchTestimonials());
  }, [stableDispatch]);

  const remove = useCallback((id: string) => stableDispatch(removeTestimonial(id)), [stableDispatch]);

  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={breadcrumbs} />
      <section>
        {
          <ModuleTable
            title='Testimonial'
            head={head}
            data={testimonials}
            showActions={true}
            creationRoute={TestimonialRoute.CREATE}
            modificationRoute={(id: string): string => formatRoute(TestimonialRoute.EDIT, { id })}
            onDeleteConfirmed={(id: string): any => remove(id)}
          />
        }
      </section>
    </LayoutWrapper>
  );
}
