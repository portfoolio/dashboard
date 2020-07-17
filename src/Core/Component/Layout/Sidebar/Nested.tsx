import React, { Component } from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';

import { Item, Section, SectionHeading } from '@atlaskit/navigation-next';
import NestableWrapper from './Nestable/Wrapper';

const nestedLevels = [
  {
    id: 'nested-level-1',
    title: 'Level 1',
    items: [{ text: 'Next level', after: ArrowRightIcon, goTo: 1 }],
  },
  {
    parentId: 'nested-level-1',
    id: 'nested-level-2',
    title: 'Level 2',
    items: [
      { text: 'Back', before: ArrowLeftIcon, goTo: 0 },
      { text: 'Go deeper!', goTo: 2, after: ArrowRightIcon },
    ],
  },
  {
    parentId: 'nested-level-2',
    id: 'nested-level-3',
    title: 'Level 3',
    items: [{ text: 'Back', goTo: 1, before: ArrowLeftIcon }],
  },
];

class NestedSection extends Component<{}, { activeLevel: number }> {
  state = {
    activeLevel: 0,
  };

  render() {
    const { title, items, ...sectionProps }: any = nestedLevels[this.state.activeLevel];

    return (
      <NestableWrapper>
        <Section key={'nested-section'} {...sectionProps}>
          {({ className }: { className: string }) => (
            <div className={className}>
              <SectionHeading>{title}</SectionHeading>
              {items.map(({ goTo, ...itemProps }: any) => (
                <Item
                  key={itemProps.text}
                  onClick={() => this.setState({ activeLevel: goTo })}
                  {...itemProps}
                />
              ))}
            </div>
          )}
        </Section>
      </NestableWrapper>
    );
  }
}

export default NestedSection;
