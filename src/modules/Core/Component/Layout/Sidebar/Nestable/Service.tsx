import React, { ReactElement, useState } from 'react';
import { withRouter } from 'react-router';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import AddItemIcon from '@atlaskit/icon/glyph/add-item';
import EditorHorizontalRuleIcon from '@atlaskit/icon/glyph/editor/horizontal-rule';
import BoardIcon from '@atlaskit/icon/glyph/board';
import { Item } from '@atlaskit/navigation-next';

import { NestableWrapper } from 'modules/Core/Component/Layout/Sidebar/Nestable/Wrapper';
import { Route as ServiceRoute } from 'modules/Service/Router/types';

const nestedLevels = [
  {
    id: 'service',
    items: [
      {
        text: 'Service',
        before: BoardIcon,
        after: ArrowRightIcon,
        goTo: 1,
        subText: 'Services section',
      },
    ],
  },
  {
    parentId: 'service',
    id: 'service-2',
    items: [
      { text: 'Go Back', before: ArrowLeftIcon, goTo: 0 },
      { text: 'Header', before: EditorHorizontalRuleIcon, goTo: ServiceRoute.HEADER },
      { text: 'Items', before: AddItemIcon, goTo: ServiceRoute.LIST },
    ],
  },
];

const expandRoutes = [
  ServiceRoute.LIST,
  ServiceRoute.CREATE,
  ServiceRoute.EDIT,
  ServiceRoute.HEADER,
];

export const NestableService = withRouter(({ location, history }: any): ReactElement => {
  const shouldExpand = expandRoutes.includes(location.pathname)
  let [activeLevel, setActiveLevel] = useState(shouldExpand ? 1 : 0);

  const routeActiveLevel = shouldExpand && activeLevel !== 0 ? 1 : activeLevel;
  const { title, items, ...sectionProps }: any = nestedLevels[routeActiveLevel];

  return (
    <NestableWrapper sectionProps={sectionProps}>
      {
        items.map(({ goTo, ...itemProps }: any) => (
          <div
            className={goTo}
            key={itemProps.text}
            style={{ paddingLeft: [0, 1].includes(goTo) ? '0px' : '12px' }}
          >
            <Item
              isSelected={goTo === location.pathname}
              key={itemProps.text}
              onClick={() => {
                if (typeof goTo === 'number') {
                  return setActiveLevel(goTo);
                }

                setActiveLevel(1);
                history.push(goTo);
              }}
              {...itemProps}
            />
          </div>
        ))
      }
    </NestableWrapper>
  );
});
