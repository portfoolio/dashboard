import React, { useEffect, useState} from 'react';
import {
  LayoutManager,
  NavigationProvider,
  ThemeProvider,
  dark,
  light,
  modeGenerator,
  settings,
} from '@atlaskit/navigation-next';
import GlobalSidebar from 'modules/Core/Component/Layout/Sidebar/GlobalSidebar';
import ContainerNavigation from 'modules/Core/Component/Layout/Sidebar/ContainerNavigation';
import Notification from 'modules/Core/Component/Notification';
import { useSelector } from 'react-redux';

const variations = [
  {
    title: 'Container light ',
    themeContext: 'container',
    themeMode: light,
  },
  {
    title: 'Product "light" ',
    themeContext: 'product',
    themeMode: light,
  },
  {
    title: 'Product "dark"',
    themeContext: 'product',
    themeMode: dark,
  },
  {
    title: 'Product "settings"',
    themeContext: 'product',
    themeMode: settings,
  },
  {
    title: 'Product bright and saturated',
    themeContext: 'product',
    themeMode: modeGenerator({
      product: { text: '#FFFEFE', background: '#BD2B25' },
    }),
  },
  {
    title: 'Product bright and saturated 2',
    themeContext: 'product',
    themeMode: modeGenerator({
      product: { text: '#FEFEEE', background: '#469EEF' },
    }),
  },
  {
    title: 'Product bright and saturated 3',
    themeContext: 'product',
    themeMode: modeGenerator({
      product: { text: '#000000', background: '#F6C544' },
    }),
  },
  {
    title: 'Product bright and dull',
    themeContext: 'product',
    themeMode: modeGenerator({
      product: { text: '#222299', background: '#F9F9FB' },
    }),
  },
  {
    title: 'Product pastel',
    themeContext: 'product',
    themeMode: modeGenerator({
      product: { text: '#112222', background: '#9edcc6' },
    }),
  },
  {
    title: 'Product dull',
    themeContext: 'product',
    themeMode: modeGenerator({
      product: { text: '#FFFFFF', background: '#7E7F7E' },
    }),
  },
  {
    title: 'Product regular',
    themeContext: 'product',
    themeMode: modeGenerator({
      product: { text: '#FFFFFF', background: '#5548b1' },
    }),
  },
  {
    title: 'Product white',
    themeContext: 'product',
    themeMode: modeGenerator({
      product: { text: '#EE1111', background: '#FFFFFF' },
    }),
  },
];

export default (props: any) => {
  const { setting }: { setting: any } = useSelector((state: any) => state.setting);
  const [mode, setMode] = useState(dark);

  useEffect(() => {
    variations.find(({ title, themeMode }: any) => {
      if (setting.appearance === title) {
        return setMode(themeMode);
      }

      return null;
    });
  }, [setting.appearance]);

  return (
    <NavigationProvider>
      <ThemeProvider
        theme={(theme: any) => ({
          ...theme,
          mode,
        })}
      >
        <LayoutManager
          globalNavigation={GlobalSidebar}
          productNavigation={() => <ContainerNavigation {...props.navLinks} />}
          topOffset={0}
        >
          <div style={{ padding: '32px 40px' }}>
            {props.children}
          </div>
        </LayoutManager>
        <Notification/>
      </ThemeProvider>
    </NavigationProvider>
  );
}
