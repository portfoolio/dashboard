import React, { Component } from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import DocumentIcon from '@atlaskit/icon/glyph/document';
import AddItemIcon from '@atlaskit/icon/glyph/add-item';

import { Item, Section } from '@atlaskit/navigation-next';
import NestableWrapper from './Wrapper';
import { Route as SectionRoute } from 'Section/Router/types';
import { withRouter } from 'react-router';

const nestedLevels = [
  {
    id: 'section',
    items: [{ text: 'Section', before: AppSwitcherIcon, after: ArrowRightIcon, goTo: 1 }],
  },
  {
    parentId: 'section',
    id: 'section-2',
    items: [
      { text: 'Go Back', before: ArrowLeftIcon, goTo: 0 },
      { text: 'Item', before: AddItemIcon, goTo: SectionRoute.LIST },
      { text: 'Category', before: DocumentIcon, goTo: SectionRoute.CATEGORY_LIST },
    ],
  },
];

let sActiveLevel = 0;
class NestableSection extends Component<any, { activeLevel: number }> {
  constructor(props: any) {
    super(props);

    const shouldExpand = [
      SectionRoute.LIST,
      SectionRoute.CREATE,
      SectionRoute.EDIT,
      SectionRoute.CATEGORY_LIST,
      SectionRoute.CATEGORY_CREATE,
      SectionRoute.CATEGORY_EDIT,
    ].includes(this.props.location.pathname);
    sActiveLevel = shouldExpand ? 1 : 0;
    this.state = {
      activeLevel: sActiveLevel,
    };

    this.resolveClick = this.resolveClick.bind(this);
  }

  resolveClick(goTo: string | number) {
    if (typeof goTo === 'number') {
      return this.setState({ activeLevel: goTo });
    }

    sActiveLevel = 1;
    this.props.history.push(goTo);
  }

  render() {
    const shouldExpand = [
      SectionRoute.LIST,
      SectionRoute.CREATE,
      SectionRoute.EDIT,
      SectionRoute.CATEGORY_LIST,
      SectionRoute.CATEGORY_CREATE,
      SectionRoute.CATEGORY_EDIT,
    ].includes(this.props.location.pathname);
    const routeActiveLevel = shouldExpand && this.state.activeLevel !== 0 ? 1 : this.state.activeLevel;
    const { title, items, ...sectionProps }: any = nestedLevels[routeActiveLevel];

    sActiveLevel = 0;
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

export default withRouter(NestableSection);
