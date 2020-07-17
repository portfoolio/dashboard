import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { OpsGenieIcon } from '@atlaskit/logo';
import Item, { ItemGroup } from '@atlaskit/item';
import { presetThemes } from '@atlaskit/navigation';
import GlobalNavigation from '@atlaskit/global-navigation';
import Avatar, { AvatarItem } from '@atlaskit/avatar';
import { APP_NAME } from 'config';
import { Route as HomeRoutes } from 'Home/Router/types';
import { logout } from 'Auth/Store/actions';
import { Route as SettingsRoute } from 'Settings/Router/types';
import SearchDrawer from './SearchDrawer';
import { fetchNotifications } from '../../../Store/actions';
import { Route as OrderingRoutes } from 'Order/Center/Router/types';
import { Route as ConciergeRoutes } from 'Concierge/Center/Router/types';
import { formatRoute } from 'react-router-named-routes';
import moment from 'moment';

class GlobalSidebar extends Component<any, any> {
  state = {
    isNotificationDrawerOpen: false,
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        <GlobalNavigation
          globalTheme={presetThemes.settings}
          containerTheme={presetThemes.settings}
          productIcon={ OpsGenieIcon }
          onProductClick={() => this.props.history.push(HomeRoutes.HOME)}
          productTooltip={APP_NAME}
          productLabel={APP_NAME}
          searchLabel='Search'
          searchDrawerContents={() => <SearchDrawer onResultClicked={() => undefined} /> }
          onSettingsClick={() => this.props.history.push(SettingsRoute.ROOT)}
          isNotificationDrawerOpen={this.state.isNotificationDrawerOpen}
          notificationDrawerWidth='narrow'
          onNotificationDrawerOpen={() => this.props.fetchNotification()}
          notificationDrawerContents={() => (
            <div>
              {
                this.props.user && <AvatarItem
                  avatar={<Avatar src={this.props.user.avatar} />}
                  key={this.props.user.email}
                  primaryText={`${this.props.user.firstName} ${this.props.user.lastName}`}
                  secondaryText={this.props.user.email}
                />
              }

              {
                this.props.notification.length > 0 ? (
                  <ul
                    style={{
                      listStyleType: 'none',
                      margin: '16px 0',
                      padding: 0,
                    }}
                  >
                    {
                      this.props.notification.map((result: any) => (
                        <li
                          key={
                            result.reference && result.reference.id
                              ? `${result.reference.id}-${Math.random() * 2}` : Math.random() * 10
                          }
                          style={{padding: 8}}>
                          <Link to={
                            result && result.type === 'ordering'
                            ? `${formatRoute(OrderingRoutes.ORDER_CENTER, { id: result.reference.id })}`
                            : `${formatRoute(ConciergeRoutes.CONCIERGE_CENTER, { id: result.reference.id })}`
                          }>
                            {result.description}
                          </Link>
                          <span style={{display: 'block'}}>
                            { moment(result.reference.createdAt).fromNow() }
                          </span>
                        </li>
                      ))
                    }
                  </ul>
                ) : (<></>)
              }
            </div>
          )}
          profileItems={() => (
            <div>
              <ItemGroup>
                <Item onClick={(e: MouseEvent) => {
                  e.preventDefault();
                  this.props.logout();
                }}>
                  Logout
                </Item>
              </ItemGroup>
            </div>
          )}
          profileIconUrl={
            this.props.user
              ? this.props.user.avatar
              : null
          }
          profileTooltip={
            this.props.user
              ? `${this.props.user.firstName} ${this.props.user.lastName}`
              : null
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { user } = state.auth;
  return {
    user,
    notification: state.core.notification,
  };
};

const mapDispatchToProps = (dispatch: any): object => {
  return {
    logout: () => dispatch(logout()),
    fetchNotification: () => dispatch(fetchNotifications()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GlobalSidebar));
