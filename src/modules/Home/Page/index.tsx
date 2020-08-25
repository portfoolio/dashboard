import React, { ReactElement, useCallback, useEffect } from 'react';
import { formatRoute } from 'react-router-named-routes';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { useDispatch, useSelector } from 'react-redux';
import { redirectAfterUpdate } from 'modules/Header/Store/actions';

export default (): ReactElement => {
  const { user }: any = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(redirectAfterUpdate(false));
  }, [stableDispatch]);

  return (
    <LayoutWrapper>
      <LayoutTitle breadcrumbs={
        [
          {
            title: 'Dashboard',
            route: formatRoute(HomeRoutes.HOME),
          },
        ]
      }>
        Home
      </LayoutTitle>
      <section>
        <p>
          {
            user
              ? (
                <>
                  Hello, {user.firstName} {user.lastName}!
                </>
              )
              : 'Failed to retrieve user.'
          }
        </p>
      </section>
    </LayoutWrapper>
  );
}
