import React, { Component } from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import BookIcon from '@atlaskit/icon/glyph/book';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';

import { Item, Section } from '@atlaskit/navigation-next';
import NestableWrapper from './Wrapper';
import { Route } from 'Partner/Router/types';
import { withRouter } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

const nestedLevels = [
  {
    id: 'partner',
    items: [
      {
        text: 'Partner', before: () => <FontAwesomeIcon icon={faHandshake} style={{ width: 24, height: 24 }} />,
        after: ArrowRightIcon,
        goTo: 1,
      },
    ],
  },
  {
    parentId: 'partner',
    id: 'partner-2',
    items: [
      { text: 'Go Back', before: ArrowLeftIcon, goTo: 0 },
      { text: 'Item', before: BookIcon, goTo: Route.PARTNER_LIST },
      { text: 'Type', before: BacklogIcon, goTo: Route.TYPE_LIST },
    ],
  },
];

let partnerActiveLevel = 0;
class NestablePartner extends Component<any, { activeLevel: number }> {
  constructor(props: any) {
    super(props);

    const shouldExpand = [
      Route.TYPE_LIST,
      Route.TYPE_CREATE,
      Route.TYPE_EDIT,
      Route.PARTNER_LIST,
      Route.PARTNER_EDIT,
      Route.PARTNER_CREATE,
    ].includes(this.props.location.pathname);
    partnerActiveLevel = shouldExpand ? 1 : 0;
    this.state = {
      activeLevel: partnerActiveLevel,
    };

    this.resolveClick = this.resolveClick.bind(this);
  }

  resolveClick(goTo: string | number) {
    if (typeof goTo === 'number') {
      return this.setState({ activeLevel: goTo });
    }

    partnerActiveLevel = 1;
    this.props.history.push(goTo);
  }

  render() {
    const shouldExpand = [
      Route.TYPE_LIST,
      Route.TYPE_CREATE,
      Route.TYPE_EDIT,
      Route.PARTNER_LIST,
      Route.PARTNER_EDIT,
      Route.PARTNER_CREATE,
    ].includes(this.props.location.pathname);
    const routeActiveLevel = shouldExpand && this.state.activeLevel !== 0 ? 1 : this.state.activeLevel;
    const { title, items, ...sectionProps }: any = nestedLevels[routeActiveLevel];

    partnerActiveLevel = 0;
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

export default withRouter(NestablePartner);
