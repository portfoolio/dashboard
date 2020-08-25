import React, { FunctionComponent, useState } from 'react';

import { LayoutManager, NavigationProvider, ThemeProvider, dark } from '@atlaskit/navigation-next';
import GlobalSidebar from 'modules/Core/Component/Layout/Sidebar/GlobalSidebar';
import ContainerNavigation from 'modules/Core/Component/Layout/Sidebar/ContainerNavigation';
import Notification from 'modules/Core/Component/Notification';
import PropTypes from 'prop-types';

const Sidebar: FunctionComponent<any> = (props) => {
  const [state, setOffset] = useState({ offset: 0 });
  /*
  TODO: Could not see where the current setOffset was being used so left this in here in case i missed something
  setOffset = (value: any) => {
    state = {
      ...state,
      offset: value,
    };
  };
*/
  return (
    <NavigationProvider>
      <ThemeProvider
        theme={(theme: any) => ({
          ...theme,
          mode: dark,
        })}
      >
        <LayoutManager
          globalNavigation={GlobalSidebar}
          productNavigation={() => <ContainerNavigation {...props.navLinks} />}
          topOffset={offset}
        >
          <div style={{ padding: '32px 40px' }}>{props.children}</div>
        </LayoutManager>
        <Notification />
      </ThemeProvider>
    </NavigationProvider>
  );
};

Sidebar.propTypes = {
  navLinks: PropTypes.array,
};

Sidebar.defaultProps = {
  navLinks: [],
};

export default Sidebar;
