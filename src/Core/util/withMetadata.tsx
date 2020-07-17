import React from 'react';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '../config';

export default (Component: any, { title }: { title: string }) => {
  return (props: []) => {
    return (
      <>
        <Helmet>
          <title>{ title ? `${title} | ${APP_NAME}` : APP_NAME }</title>
        </Helmet>
        <Component { ...props } />
      </>
    );
  };
};
