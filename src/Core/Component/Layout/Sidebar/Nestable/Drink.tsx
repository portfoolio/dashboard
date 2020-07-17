import React, { Component } from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import DocumentIcon from '@atlaskit/icon/glyph/document';
import AddItemIcon from '@atlaskit/icon/glyph/add-item';

import { Item, Section } from '@atlaskit/navigation-next';
import NestableWrapper from './Wrapper';
import { Route as DrinkRoute } from 'Order/Drink/Router/types';
import { withRouter } from 'react-router';
import { faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const nestedLevels = [
  {
    id: 'drink',
    items: [
      {
        text: 'Drink',
        before: () => <FontAwesomeIcon icon={faWineBottle} style={{ width: 24, height: 24 }} />,
        after: ArrowRightIcon,
        goTo: 1,
      },
    ],
  },
  {
    parentId: 'drink',
    id: 'drink-2',
    items: [
      { text: 'Go Back', before: ArrowLeftIcon, goTo: 0 },
      { text: 'Item', before: AddItemIcon, goTo: DrinkRoute.LIST },
      { text: 'Category', before: DocumentIcon, goTo: DrinkRoute.CATEGORY_LIST },
    ],
  },
];

let dActiveLeve = 0;
class NestableDrink extends Component<any, { activeLevel: number }> {
  constructor(props: any) {
    super(props);

    const shouldExpand = [
      DrinkRoute.LIST,
      DrinkRoute.CREATE,
      DrinkRoute.EDIT,
      DrinkRoute.CATEGORY_LIST,
      DrinkRoute.CATEGORY_CREATE,
      DrinkRoute.CATEGORY_EDIT,
    ].includes(this.props.location.pathname);
    dActiveLeve = shouldExpand ? 1 : 0;
    this.state = {
      activeLevel: dActiveLeve,
    };

    this.resolveClick = this.resolveClick.bind(this);
  }

  resolveClick(goTo: string | number) {
    if (typeof goTo === 'number') {
      return this.setState({ activeLevel: goTo });
    }

    dActiveLeve = 1;
    this.props.history.push(goTo);
  }

  render() {
    const shouldExpand = [
      DrinkRoute.LIST,
      DrinkRoute.CREATE,
      DrinkRoute.EDIT,
      DrinkRoute.CATEGORY_LIST,
      DrinkRoute.CATEGORY_CREATE,
      DrinkRoute.CATEGORY_EDIT,
    ].includes(this.props.location.pathname);
    const routeActiveLevel = shouldExpand && this.state.activeLevel !== 0 ? 1 : this.state.activeLevel;
    const { title, items, ...sectionProps }: any = nestedLevels[routeActiveLevel];

    dActiveLeve = 0;
    return (
      <NestableWrapper>
        <Section key={'nested-drink'} {...sectionProps}>
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

export default withRouter(NestableDrink);
