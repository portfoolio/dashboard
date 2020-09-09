import React from 'react';
import {
  HeaderSection,
  MenuSection,
  Item as NavigationItem,
  GroupHeading,
  Separator,
} from '@atlaskit/navigation-next';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import EditorHorizontalRuleIcon from '@atlaskit/icon/glyph/editor/horizontal-rule';
import GraphLineIcon from '@atlaskit/icon/glyph/graph-line';
import EmojiFrequentIcon from '@atlaskit/icon/glyph/emoji/frequent';
import VidRaisedHandIcon from '@atlaskit/icon/glyph/vid-raised-hand';
// import EmailIcon from '@atlaskit/icon/glyph/email';
// import ArrowUpIcon from '@atlaskit/icon/glyph/arrow-up';
import SettingsIcon from '@atlaskit/icon/glyph/settings';

import { uuid4 } from 'util/helper';
import { Route as HomeRoutes } from 'modules/Home/Router/types';
import { Route as HeaderRoutes } from 'modules/Header/Router/types';
import { Route as CounterRoutes } from 'modules/Counter/Router/types';
import { Route as AboutRoutes } from 'modules/About/Router/types';
import { Route as SettingRoutes } from 'modules/Setting/Router/types';

import { NestableService } from 'modules/Core/Component/Layout/Sidebar/Nestable/Service';
import { NestableJourney } from 'modules/Core/Component/Layout/Sidebar/Nestable/Journey';
import { NestableProject } from 'modules/Core/Component/Layout/Sidebar/Nestable/Project';
import { NestableTestimonial } from 'modules/Core/Component/Layout/Sidebar/Nestable/Testimonial';
import { NestableTechnology } from 'modules/Core/Component/Layout/Sidebar/Nestable/Technology';
import { NestableBlog } from 'modules/Core/Component/Layout/Sidebar/Nestable/Blog';

const SidebarItem = styled.div`margin-top: 5px;`;

const isSelected = (route: string, location: any) =>  route === location.pathname;

const ContainerNavigation = ({ location }: any) => (
  <>
    <HeaderSection>
      {
        ({ css }: { css: object }) => (
          <div style={{ ...css, padding: '1rem 1rem 0 1rem' }}>

          </div>
        )
      }
    </HeaderSection>
    <MenuSection className={'menu-section'}>
      {({ className }: { className: string }) => (
        <div className={className} style={{ marginTop: '1rem' }}>
          <div style={{ margin: '-32px 0 8px 0' }}>
            <GroupHeading>Dashboard</GroupHeading>
          </div>
          <Link to={HomeRoutes.HOME} key={'/'} style={{ textDecoration: 'none' }}>
            <NavigationItem
              isSelected={isSelected(HomeRoutes.HOME, location)}
              before={GraphLineIcon}
              text={'Analytics'}
              subText={'Analytics of the site'}
            />
          </Link>

          <Separator/>
          <GroupHeading>Site</GroupHeading>
          <Link
            to={HeaderRoutes.HEADER}
            key={HeaderRoutes.HEADER}
            style={{ textDecoration: 'none' }}
          >
            <NavigationItem
              isSelected={isSelected(HeaderRoutes.HEADER, location)}
              before={EditorHorizontalRuleIcon}
              text={'Header'}
              subText={'Site header'}
            />
          </Link>
          <SidebarItem>
            <Link to={CounterRoutes.LIST} key={uuid4()} style={{ textDecoration: 'none' }}>
              <NavigationItem
                isSelected={isSelected(CounterRoutes.LIST, location)}
                before={EmojiFrequentIcon}
                text={'Counter'}
                subText={'Progress bar\'s'}
              />
            </Link>
          </SidebarItem>

          <SidebarItem>
            <Link to={AboutRoutes.ABOUT} key={uuid4()} style={{ textDecoration: 'none' }}>
              <NavigationItem
                isSelected={isSelected(AboutRoutes.ABOUT, location)}
                before={VidRaisedHandIcon}
                text={'About'}
                subText={'About section'}
              />
            </Link>
          </SidebarItem>

          <Separator/>

          <NestableService />

          <NestableJourney />

          <NestableProject />

          <NestableTestimonial />

          <NestableTechnology />

          <NestableBlog />

          {/*<SidebarItem>
            <Link to={'/'} key={uuid4()} style={{ textDecoration: 'none' }}>
              <NavigationItem
                before={EmailIcon}
                text={'Contact'} subText={'Mail box'}
              />
            </Link>
          </SidebarItem>*/}

          <Separator/>
          <GroupHeading>General</GroupHeading>
          <Link to={SettingRoutes.SETTING} key={uuid4()} style={{ textDecoration: 'none' }}>
            <NavigationItem
              before={SettingsIcon}
              text={'Setting'} subText={'Global settings'}
            />
          </Link>

          {/*<SidebarItem>
            <Link to={'/'} key={uuid4()} style={{ textDecoration: 'none' }}>
              <NavigationItem
                before={ArrowUpIcon}
                text={'SEO'} subText={'SEO settings'}
              />
            </Link>
          </SidebarItem>*/}

        </div>
      )}
    </MenuSection>
  </>
);

export default withRouter(ContainerNavigation);
