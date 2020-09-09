import React, { ReactElement, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { OpsGenieIcon } from '@atlaskit/logo';
import Item, { ItemGroup } from '@atlaskit/item';
import GlobalNavigation from '@atlaskit/global-navigation';
import Avatar, { AvatarItem } from '@atlaskit/avatar';
import { APP_NAME } from 'config';
import { logout } from 'modules/Auth/Store/actions';

export default withRouter((props): ReactElement => {
  const { auth: { user } }: any = useSelector((state: any) => state);

  const [isNotificationDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  return (
    <div style={{ height: '100%' }}>
      <GlobalNavigation
        productIcon={ OpsGenieIcon }
        onProductClick={() => props.history.push('/')}
        productTooltip={APP_NAME}
        productLabel={APP_NAME}
        searchLabel='Search'
        onSettingsClick={() => props.history.push('/')}
        isNotificationDrawerOpen={isNotificationDrawerOpen}
        notificationDrawerWidth='narrow'
        onNotificationDrawerOpen={() => undefined}
        notificationDrawerContents={() => (
          <div>
            {
              user && <AvatarItem
                avatar={<Avatar src={user.avatar} />}
                key={user.email}
                primaryText={`${user.firstName} ${user.lastName}`}
                secondaryText={user.email}
              />
            }
          </div>
        )}
        profileItems={() => (
          <div>
            <ItemGroup>
              <Item onClick={(e: MouseEvent) => {
                e.preventDefault();
                stableDispatch(logout());
              }}>
                Logout
              </Item>
            </ItemGroup>
          </div>
        )}
        profileIconUrl={
          user
            ? user.avatar
            : null
        }
        profileTooltip={
          user ? `${user.firstName} ${user.lastName}` : null
        }
      />
    </div>
  );
});
