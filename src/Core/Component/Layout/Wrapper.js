import React from 'react';
import styled from 'styled-components';
import { Grid, GridColumn } from '@atlaskit/page';
import { gridSize } from '@atlaskit/theme';

const Padding = styled.div`
  margin: ${gridSize() * 4}px ${gridSize() * 4}px;
  padding-bottom: ${gridSize() * 3}px;
`;

export default ({ children, medium = 0 }) => (
  <Grid layout="fluid">
    {medium > 0 && <GridColumn medium={(12 - medium) / 2}/>}
    <GridColumn medium={medium}>
      <Padding>{children}</Padding>
    </GridColumn>
    {medium > 0 && <GridColumn medium={(12 - medium) / 2}/>}
  </Grid>
);
