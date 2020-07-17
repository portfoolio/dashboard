import React, { Component } from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import RentingIcon from '@atlaskit/icon/glyph/ship';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';
import BitBucketBranchesIcon from '@atlaskit/icon/glyph/bitbucket/branches';

import { Item, Section } from '@atlaskit/navigation-next';
import NestableWrapper from './Wrapper';
import { Route } from 'Concierge/Renting/Router/types';
import { withRouter } from 'react-router';

const nestedLevels = [
  {
    id: 'renting',
    items: [{ text: 'Renting', before: RentingIcon, after: ArrowRightIcon, goTo: 1 }],
  },
  {
    parentId: 'renting',
    id: 'renting-2',
    items: [
      { text: 'Go Back', before: ArrowLeftIcon, goTo: 0 },
      { text: 'Type', before: BacklogIcon, goTo: Route.TYPE_LIST },
      { text: 'Subtype', before: BitBucketBranchesIcon, goTo: Route.SUBTYPE_LIST  },
    ],
  },
];

let rActiveLevel = 0;
class NestableRenting extends Component<any, { activeLevel: number }> {
  constructor(props: any) {
    super(props);

    const shouldExpand = [
      Route.TYPE_LIST,
      Route.TYPE_CREATE,
      Route.TYPE_EDIT,
      Route.SUBTYPE_LIST,
      Route.SUBTYPE_CREATE,
      Route.SUBTYPE_EDIT,
    ].includes(this.props.location.pathname);
    rActiveLevel = shouldExpand ? 1 : 0;
    this.state = {
      activeLevel: rActiveLevel,
    };

    this.resolveClick = this.resolveClick.bind(this);
  }

  resolveClick(goTo: string | number) {
    if (typeof goTo === 'number') {
      return this.setState({ activeLevel: goTo });
    }

    rActiveLevel = 1;
    this.props.history.push(goTo);
  }

  render() {
    const shouldExpand = [
      Route.TYPE_LIST,
      Route.TYPE_CREATE,
      Route.TYPE_EDIT,
      Route.SUBTYPE_LIST,
      Route.SUBTYPE_CREATE,
      Route.SUBTYPE_EDIT,
    ].includes(this.props.location.pathname);
    const routeActiveLevel = shouldExpand && this.state.activeLevel !== 0 ? 1 : this.state.activeLevel;
    const { title, items, ...sectionProps }: any = nestedLevels[routeActiveLevel];

    rActiveLevel = 0;
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

export default withRouter(NestableRenting);
