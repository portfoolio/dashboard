import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { OpsGenieIcon } from '@atlaskit/logo';
import Item, { ItemGroup } from '@atlaskit/item';
import { presetThemes } from '@atlaskit/navigation';
import GlobalNavigation from '@atlaskit/global-navigation';
import Avatar, { AvatarItem } from '@atlaskit/avatar';
import { APP_NAME } from 'config';
import { logout } from 'Auth/Store/actions';

class GlobalSidebar extends Component<any, any> {
  state = {
    isNotificationDrawerOpen: false,
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        <GlobalNavigation
          globalTheme={presetThemes.dark}
          containerTheme={presetThemes.dark}
          productIcon={ OpsGenieIcon }
          onProductClick={() => this.props.history.push('/')}
          productTooltip={APP_NAME}
          productLabel={APP_NAME}
          searchLabel='Search'
          onSettingsClick={() => this.props.history.push('/')}
          isNotificationDrawerOpen={this.state.isNotificationDrawerOpen}
          notificationDrawerWidth='narrow'
          onNotificationDrawerOpen={() => undefined}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GlobalSidebar));
