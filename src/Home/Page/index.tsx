import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { formatRoute } from 'react-router-named-routes';

import { GlobalState } from 'Core/types';
import LayoutWrapper from 'Core/Component/Layout/Wrapper';
import LayoutTitle from 'Core/Component/Layout/Title';
import { Route as HomeRoutes } from 'Home/Router/types';

class Main extends Component<any, any> {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
  };

  render() {
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
              this.props.user
                ? (
                  <Fragment>
                    Hello, {this.props.user.firstName} {this.props.user.lastName}!
                  </Fragment>
                )
                : 'Failed to retrieve user.'
            }
          </p>
        </section>
      </LayoutWrapper>
    );
  }
}

const mapStateToProps = (state: GlobalState): {
  user: any | null,
} => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(Main);
