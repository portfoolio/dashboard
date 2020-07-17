import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatRoute } from 'react-router-named-routes';

import App from '../App';
import { Route as LoginRoute } from 'Auth/Router/types';
import { AppRouteDefinition, GlobalState } from '../types';

let routers: AppRouteDefinition[] = [];

const req = require.context('../../', true, /Router\/index\.ts$/);
req.keys().map((key: string) => {
  routers = routers.concat(req(key).default);
  return key;
});

class Router extends Component<any, any> {
  state = {
    navOpenState: {
      isOpen: true,
    },
    routers,
  };

  static defaultProps = {
    isAuthenticated: false,
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {this.state.routers.map(({ guarded, path, Component: PageComponent }: AppRouteDefinition, i: number) =>
            <Route
              key={i}
              exact
              path={path}
              render={() => (
                guarded && !this.props.isAuthenticated
                  ? <Redirect to={formatRoute(LoginRoute.LOGIN)} />
                  : <App><PageComponent /></App>
              )}
            />,
          )}
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: GlobalState): { isAuthenticated: boolean } => {
  const { isAuthenticated } = state.auth;

  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(Router);
