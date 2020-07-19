import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PageHeader from '@atlaskit/page-header';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';

class Title extends Component<any, any> {
  static defaultProps = {
    breadcrumbs: [],
  };

  render() {
    return (
      <PageHeader breadcrumbs={
        this.props.breadcrumbs.length > 0 &&
        <BreadcrumbsStateless onExpand={() => {}}>
          {
            this.props.breadcrumbs.map(({ title, route }: any, i: number) => (
              <BreadcrumbsItem
                text={title}
                href={route}
                onClick={(e: any) => {
                  e.preventDefault();
                  this.props.history.push(route);
                }}
                key={i}
              />
            ))
          }
        </BreadcrumbsStateless>
      }>
        {this.props.children}
      </PageHeader>
    );
  };
}

export default withRouter(Title);
