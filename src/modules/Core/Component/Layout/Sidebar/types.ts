import { PureComponent } from 'react';

export interface SidebarNavLink {
  route: string;
  title: string;
  Icon: PureComponent;
}

export interface SidebarProps {
  children?: any;
  navLinks: SidebarNavLink[];
}

export interface ContainerNavigationProps {
  navLinks: SidebarNavLink[];
  activeLevel?: number;
}

export interface GlobalSidebarProps {
  user: any | null;
  logout: any;
}

export interface GlobalSidebarState {
  isNotificationDrawerOpen: boolean;
}
