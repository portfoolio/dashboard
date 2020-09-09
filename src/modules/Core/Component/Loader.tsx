import React from 'react';
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';

const override = css`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 60px;
  width: 60px;
  margin: 0px auto;
`;

export default () => {
  return (
    <>
      <div className={'sweet-loading'}>
        <GridLoader
          css={override}
          size={15}
          color={'#123abc'}
          loading={true}
        />
      </div>
    </>
  );
}
