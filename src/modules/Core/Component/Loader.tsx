import React, { useState, FunctionComponent } from 'react';
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

const Loader: FunctionComponent<any> = () => {
  const [loading] = useState(true);

  return (
    <>
      <div className={'sweet-loading'}>
        <GridLoader css={override} size={15} color={'#123abc'} loading={loading} />
      </div>
    </>
  );
};

export default Loader;
