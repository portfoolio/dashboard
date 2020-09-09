import React from 'react';
import { Section } from '@atlaskit/navigation-next';
import { uuid4 } from 'util/helper';

export const NestableWrapper = (props: any) => (
  <div style={{ marginBottom: 10 }}>
    <Section key={uuid4()} {...props.sectionProps}>
      {
        ({ className }: { className: string }) => (
          <div className={className} style={{ paddingLeft: '0px' }}>
            { props.children }
          </div>
        )
      }
    </Section>
  </div>
);
