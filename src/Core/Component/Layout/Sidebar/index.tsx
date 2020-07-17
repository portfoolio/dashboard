import React, { Component } from 'react';

import {
  LayoutManager,
  NavigationProvider,
  ThemeProvider,
  settings,
} from '@atlaskit/navigation-next';
import GlobalSidebar from './GlobalSidebar';
import ContainerNavigation from './ContainerNavigation';
import Notification from '../../Notification';
import WebPushBanner from '../WebPush';

class Sidebar extends Component<any, any> {
  static defaultProps = {
    navLinks: [],
  };

  constructor(props: any) {
    super(props);
    this.state = { offset: 0 };
    this.setOffset = this.setOffset.bind(this);
  }

  setOffset(value: any) {
    this.setState({
      ...this.state,
      offset: value,
    });
  }

  render() {
    return (
      <NavigationProvider>
        <ThemeProvider theme={(theme: any) => ({ ...theme, mode: settings })}>
          <WebPushBanner setOffset={(value: any) => this.setOffset(value)} />
          <LayoutManager
            globalNavigation={GlobalSidebar}
            productNavigation={
              () => <ContainerNavigation navLinks={this.props.navLinks} />
            }
            topOffset={this.state.offset}
          >
            <div css={{ padding: '32px 40px' }}>
              {this.props.children}
            </div>
          </LayoutManager>
          <Notification />
        </ThemeProvider>
      </NavigationProvider>
    );
  }
}

export default Sidebar;
