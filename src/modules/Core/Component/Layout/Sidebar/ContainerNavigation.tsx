import React, { Fragment } from 'react';
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
import BitbucketPipelinesIcon from '@atlaskit/icon/glyph/bitbucket/pipelines';
import EditorBoldIcon from '@atlaskit/icon/glyph/editor/bold';
import EmailIcon from '@atlaskit/icon/glyph/email';
import BoardIcon from '@atlaskit/icon/glyph/board';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import CreditcardIcon from '@atlaskit/icon/glyph/creditcard';
import ArrowUpIcon from '@atlaskit/icon/glyph/arrow-up';
import SettingsIcon from '@atlaskit/icon/glyph/settings';

const SidebarItem = styled.div`
  margin-top: 5px;
`;

const ContainerNavigation = () => (
  <Fragment>
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
          <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
            <NavigationItem before={GraphLineIcon} text={'Analytics'} subText={'Analytics of the site'}
            />
          </Link>

          <Separator/>
          <GroupHeading>Site</GroupHeading>
          <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
            <NavigationItem
              before={EditorHorizontalRuleIcon} text={'Header'} subText={'Site header'}
            />
          </Link>
          <SidebarItem>
            <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
              <NavigationItem
                before={EmojiFrequentIcon} text={'Counter'} subText={'Progress bar\'s'}
              />
            </Link>
          </SidebarItem>

          <SidebarItem>
            <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
              <NavigationItem
                before={VidRaisedHandIcon} text={'About'} subText={'About section'}
              />
            </Link>
          </SidebarItem>

          <SidebarItem>
            <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
              <NavigationItem
                before={BoardIcon} text={'Services'} subText={'Services section'}
              />
            </Link>
          </SidebarItem>

          <SidebarItem>
            <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
              <NavigationItem
                before={BitbucketPipelinesIcon}
                text={'Journey'} subText={'Journey section'}
              />
            </Link>
          </SidebarItem>

          <SidebarItem>
            <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
              <NavigationItem
                before={StarFilledIcon}
                text={'Projects'} subText={'Projects section'}
              />
            </Link>
          </SidebarItem>

          <SidebarItem>
            <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
              <NavigationItem
                before={EditorBoldIcon}
                text={'Blog'} subText={'Site blog'}
              />
            </Link>
          </SidebarItem>

          <SidebarItem>
            <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
              <NavigationItem
                before={EmailIcon}
                text={'Contact'} subText={'Mail box'}
              />
            </Link>
          </SidebarItem>

          <Separator/>
          <GroupHeading>General</GroupHeading>
          <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
            <NavigationItem
              before={SettingsIcon}
              text={'Settings'} subText={'Global settings'}
            />
          </Link>

          <SidebarItem>
            <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
              <NavigationItem
                before={ArrowUpIcon}
                text={'SEO'} subText={'SEO settings'}
              />
            </Link>
          </SidebarItem>

          <SidebarItem>
            <Link to={'/'} key={'/'} style={{ textDecoration: 'none' }}>
              <NavigationItem
                before={CreditcardIcon}
                text={'Credentials'} subText={'API Credentials'}
              />
            </Link>
          </SidebarItem>

        </div>
      )}
    </MenuSection>
  </Fragment>
);

export default withRouter(ContainerNavigation);
