import React from 'react';
import { withRouter } from 'react-router-dom';
import PageHeader from '@atlaskit/page-header';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';

export default withRouter(({ breadcrumbs = [], children, history }: any) => {
  return (
    <PageHeader breadcrumbs={
      breadcrumbs.length > 0 &&
      <BreadcrumbsStateless onExpand={() => {}}>
        {
          breadcrumbs.map(({ title, route }: any, i: number) => (
            <BreadcrumbsItem
              text={title}
              href={route}
              onClick={(e: any) => {
                e.preventDefault();
                history.push(route);
              }}
              key={i}
            />
          ))
        }
      </BreadcrumbsStateless>
    }>
      {children}
    </PageHeader>
  );
});
