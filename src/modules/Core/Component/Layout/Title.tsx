import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PageHeader from '@atlaskit/page-header';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';

const Title: FunctionComponent<any> = (props) => {
  return (
    <PageHeader
      breadcrumbs={
        props.breadcrumbs.length > 0 && (
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          <BreadcrumbsStateless onExpand={() => {}}>
            {props.breadcrumbs.map(({ title, route }: any, i: number) => (
              <BreadcrumbsItem
                text={title}
                href={route}
                onClick={(e: any) => {
                  e.preventDefault();
                  props.history.push(route);
                }}
                key={i}
              />
            ))}
          </BreadcrumbsStateless>
        )
      }
    >
      {props.children}
    </PageHeader>
  );
};

Title.propTypes = {
  breadcrumbs: PropTypes.array,
};

Title.defaultProps = {
  breadcrumbs: [],
};

export default withRouter(Title);
