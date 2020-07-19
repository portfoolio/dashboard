import React, { Component } from 'react';

import {
  LayoutManager,
  NavigationProvider,
  ThemeProvider,
  modeGenerator,
} from '@atlaskit/navigation-next';
import GlobalSidebar from './GlobalSidebar';
import ContainerNavigation from './ContainerNavigation';
import Notification from '../../Notification';

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
        <ThemeProvider theme={(theme: any) => ({
          ...theme, mode: modeGenerator({
            product: { text: '#FEFEEE', background: '#469EEF' },
          })
        })}>
          <LayoutManager
            globalNavigation={GlobalSidebar}
            productNavigation={
              () => <ContainerNavigation {...this.props.navLinks} />
            }
            topOffset={this.state.offset}
          >
            <div style={{ padding: '32px 40px' }}>
              {this.props.children}
            </div>
          </LayoutManager>
          <Notification/>
        </ThemeProvider>
      </NavigationProvider>
    );
  }
}

export default Sidebar;
