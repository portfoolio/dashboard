import React, { Fragment } from 'react';
import {
  HeaderSection,
  MenuSection,
  Item as NavigationItem,
  Separator,
  GroupHeading,
} from '@atlaskit/navigation-next';
import { Link, withRouter } from 'react-router-dom';

import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import ReservationIcon from '@atlaskit/icon/glyph/book';
import PageIcon from '@atlaskit/icon/glyph/page';

import TenantSwitcher from 'Tenant/Component/TenantSwitcher';
import NestableUserManagement from './Nestable/UserManagement';
import NestableRenting from './Nestable/Renting';
import NestableDrink from './Nestable/Drink';
import NestableSection from './Nestable/Section';
import NestablePlace from './Nestable/Place';
import NestablePartner from './Nestable/Partner';

import { Route as ReservationRoutes } from 'Concierge/Reservation/Router/types';
import { Route as TripPlanningRoutes } from 'Concierge/TripPlanning/Router/types';
import { Route as ConciergeRoutes } from 'Concierge/Center/Router/types';
import { Route as OrderingRoutes } from 'Order/Center/Router/types';
import { Route as GiftRoutes } from 'Order/Gift/Router/types';
import { Route as PageRoutes } from 'Page/Router/types';
import { Route as BlogRoutes } from 'Blog/Router/types';
import { Route as PersonalServiceRoute } from 'Concierge/Service/Router/types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faTasks } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '@atlaskit/icon/glyph/search';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import LocationIcon from '@atlaskit/icon/glyph/location';

const ContainerNavigation = (props: any) => (
  <Fragment>
    <HeaderSection>
      {
        ({ css }: { css: object }) => (
          <div style={{ ...css, padding: '1rem 1rem 0 1rem' }}>
            <TenantSwitcher />
          </div>
        )
      }
    </HeaderSection>
    <MenuSection className={'menu-section'}>
      {({ className }: { className: string }) => (
        <div className={className} style={{ marginTop: '1rem' }}>
          <div style={{ margin: '-32px 0 8px 0' }}>
            <GroupHeading>Order</GroupHeading>
          </div>

          <Link to={OrderingRoutes.ORDER_CENTER.replace(':id', '')}
                key={OrderingRoutes.ORDER_CENTER.replace(':id', '')}
                style={{ textDecoration: 'none' }}
          >
            <NavigationItem before={LocationIcon} text={'Map'} />
          </Link>

          <Link to={ConciergeRoutes.CONCIERGE_CENTER}
                key={'awdawdawd'}
                style={{ textDecoration: 'none' }}
          >
            <NavigationItem before={DashboardIcon} text={'Center'} />
          </Link>

          <Link to={GiftRoutes.LIST} key={GiftRoutes.LIST} style={{ textDecoration: 'none' }}>
            <NavigationItem before={() =>
              <FontAwesomeIcon icon={faGift} style={{ width: 24, height: 24 }} />} text={'Gift'} />
          </Link>
          <NestablePlace />
          <NestableDrink />

          <Separator />
          <div style={{ margin: '0 0 8px 0' }}>
            <GroupHeading>Concierge</GroupHeading>
          </div>

          <Link to={ConciergeRoutes.CONCIERGE_CENTER.replace(':id', '')}
                key={ConciergeRoutes.CONCIERGE_CENTER.replace(':id', '')}
                style={{ textDecoration: 'none' }}
          >
            <NavigationItem before={DashboardIcon} text={'Center'} />
          </Link>

          <Link to={ReservationRoutes.RESERVATION_ROOT}
                key={ReservationRoutes.RESERVATION_ROOT}
                style={{ textDecoration: 'none' }}
          >
            <NavigationItem
              isSelected={ReservationRoutes.RESERVATION_ROOT === props.location.pathname}
              before={ReservationIcon}
              text={'Reservation'} />
          </Link>

          <Link to={TripPlanningRoutes.TRIP_PLANNING_ROOT}
                key={TripPlanningRoutes.TRIP_PLANNING_ROOT}
                style={{ textDecoration: 'none' }}
          >
            <NavigationItem
              isSelected={TripPlanningRoutes.TRIP_PLANNING_ROOT === props.location.pathname}
              before={() => <FontAwesomeIcon icon={faTasks} style={{ width: 24, height: 24 }} />}
              text={'Trip Planning'} />
          </Link>

          <Link to={PersonalServiceRoute.ITEM_LIST}
                key={PersonalServiceRoute.ITEM_LIST}
                style={{ textDecoration: 'none' }}
          >
            <NavigationItem before={SearchIcon} text={'Service'} />
          </Link>
          <NestableRenting />

          <Separator />
          <GroupHeading>Management</GroupHeading>
          <Link to={PageRoutes.LIST} key={PageRoutes.LIST} style={{ textDecoration: 'none' }}>
            <NavigationItem before={PageIcon} text={'Page'} />
          </Link>
          <Link to={BlogRoutes.LIST} key={BlogRoutes.LIST} style={{ textDecoration: 'none' }}>
            <NavigationItem before={DocumentsIcon} text={'Blog'} />
          </Link>
          <NestableUserManagement />
          <NestableSection />
          <NestablePartner />
        </div>
      )}
    </MenuSection>
  </Fragment>
);

export default withRouter(ContainerNavigation);
