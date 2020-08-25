import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import Page from '@atlaskit/page';
import '@atlaskit/css-reset';
import 'modules/Core/styles.css';
import Sidebar from './Component/Layout/Sidebar';
import Loader from './Component/Loader';
import Toast from './Component/Layout/Toast';

const App: FunctionComponent<any> = (props) => {
  return (
    <>
      {props.showLoader ? <Loader /> : ''}
      <div style={{ opacity: `${props.showLoader ? '.' : ''}1` }}>
        <Page
          id={'ak-page-wrapper'}
          navigationWidth={props.isAuthenticated ? 304 : 0}
          navigation={props.isAuthenticated && <Sidebar />}
        >
          {props.children}
        </Page>

        <Toast />
      </div>
    </>
  );
};

const mapStateToProps = (state: any): any => {
  const { isAuthenticated } = state.auth;
  const { showLoader } = state.core;

  return {
    isAuthenticated,
    showLoader,
  };
};

export default connect(mapStateToProps)(App);
