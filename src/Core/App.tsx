import React, { Component } from 'react';
import { connect } from 'react-redux';

import Page from '@atlaskit/page';
import '@atlaskit/css-reset';
import './styles.css';
import Sidebar from './Component/Layout/Sidebar';
import Loader from './Component/Loader';
import Toast from './Component/Layout/Toast';

class App extends Component<any, any> {
  render() {
    return (
      <>
        { this.props.showLoader ? <Loader /> : ('') }
        <div style={{ opacity: `${this.props.showLoader ? '.' : ''}1` }}>
          <Page
            id={'ak-page-wrapper'}
            navigationWidth={this.props.isAuthenticated ? 304 : 0}
            navigation={this.props.isAuthenticated && <Sidebar />}
          >
            { this.props.children }
          </Page>

          <Toast />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: any): any => {
  const { isAuthenticated } = state.auth;
  const { showLoader } = state.core;

  return {
    isAuthenticated,
    showLoader,
  };
};

export default connect(mapStateToProps)(App);
