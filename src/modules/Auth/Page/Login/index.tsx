import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LayoutWrapper from 'modules/Core/Component/Layout/Wrapper';
import LayoutTitle from 'modules/Core/Component/Layout/Title';
import AuthComponentLogin from 'modules/Auth/Component/Login';
import { login } from 'modules/Auth/Store/actions';

export default () => {
  const {
    auth: { isAuthenticated },
  }: any = useSelector((state: any) => state);

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  if (isAuthenticated) {
    return <Redirect to={'/'} />;
  }

  return (
    <LayoutWrapper medium={4}>
      <LayoutTitle>Login</LayoutTitle>
      <section>
        <AuthComponentLogin onSubmit={(data: any) => stableDispatch(login(data))} />
      </section>
    </LayoutWrapper>
  );
}
