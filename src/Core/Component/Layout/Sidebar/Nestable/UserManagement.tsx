import React, { Component } from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import PersonIcon from '@atlaskit/icon/glyph/person';
import CustomerIcon from '@atlaskit/icon/glyph/people-group';
import CourierIcon from '@atlaskit/icon/glyph/location';
import InviteTeamIcon from '@atlaskit/icon/glyph/invite-team';

import { Item, Section } from '@atlaskit/navigation-next';
import NestableWrapper from './Wrapper';
import { Route } from 'Dispatcher/Router/types';
import { Route as CourierRoute } from 'Courier/Router/types';
import { withRouter } from 'react-router';

const nestedLevels = [
  {
    id: 'user-management',
    items: [{ text: 'Account', before: InviteTeamIcon, after: ArrowRightIcon, goTo: 1 }],
  },
  {
    parentId: 'user-management',
    id: 'user-management-2',
    items: [
      { text: 'Go Back', before: ArrowLeftIcon, goTo: 0 },
      { text: 'Dispatcher', before: PersonIcon, goTo: Route.LIST },
      { text: 'Courier', before: CourierIcon, goTo: CourierRoute.LIST },
      { text: 'Customer', before: CustomerIcon, goTo: Route.EDIT },
    ],
  },
];

let uActiveLevel = 0;
class NestableUserManagement extends Component<any, { activeLevel: number }> {
  constructor(props: any) {
    super(props);

    const shouldExpand = [
      Route.LIST,
      Route.CREATE,
      Route.EDIT,
      CourierRoute.LIST,
    ].includes(this.props.location.pathname);
    uActiveLevel = shouldExpand ? 1 : 0;
    this.state = {
      activeLevel: uActiveLevel,
    };

    this.resolveClick = this.resolveClick.bind(this);
  }

  resolveClick(goTo: string | number) {
    if (typeof goTo === 'number') {
      return this.setState({ activeLevel: goTo });
    }

    uActiveLevel = 1;
    this.props.history.push(goTo);
  }

  render() {
    const shouldExpand = [
      Route.LIST,
      Route.CREATE,
      Route.EDIT,
      CourierRoute.LIST,
    ].includes(this.props.location.pathname);
    const routeActiveLevel = shouldExpand && this.state.activeLevel !== 0 ? 1 : this.state.activeLevel;
    const { title, items, ...sectionProps }: any = nestedLevels[routeActiveLevel];

    uActiveLevel = 0;
    return (
      <NestableWrapper>
        <Section key={'nested-section'} {...sectionProps}>
          {({ className }: { className: string }) => (
            <div className={className} style={{ paddingLeft: '0px' }}>
              {items.map(({ goTo, ...itemProps }: any) => (
                <div className={goTo}
                     key={itemProps.text}
                     style={{ paddingLeft: [0, 1].includes(goTo) ? '0px' : '12px' }}>
                  <Item
                    isSelected={goTo === this.props.location.pathname}
                    key={itemProps.text}
                    onClick={() => this.resolveClick(goTo)}
                    {...itemProps}
                  />
                </div>
              ))}
            </div>
          )}
        </Section>
      </NestableWrapper>
    );
  }
}

export default withRouter(NestableUserManagement);
