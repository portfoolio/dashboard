import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '@atlaskit/page';
import '@atlaskit/css-reset';
import 'modules/Core/styles.css';

import Sidebar from './Component/Layout/Sidebar';
import Loader from './Component/Loader';
import Toast from './Component/Layout/Toast';

import { fetchSetting } from 'modules/Setting/Store/actions';

export default (props: any) => {
  const {
    auth: { isAuthenticated },
    core: { showLoader },
    setting: { setting },
  }: any = useSelector((state: any) => state);

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    if (isAuthenticated) {
      stableDispatch(fetchSetting());
    }
  }, [stableDispatch, isAuthenticated]);

  return (
    <>
      { props.showLoader ? <Loader /> : ('') }
      <div style={{ opacity: `${showLoader ? '.' : ''}1` }}>
        <Page
          id={'ak-page-wrapper'}
          navigationWidth={isAuthenticated ? 304 : 0}
          navigation={isAuthenticated && <Sidebar setting={setting} />}
        >
          { props.children }
        </Page>

        <Toast />
      </div>
    </>
  );
}
