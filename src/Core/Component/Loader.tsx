import React, { Component } from 'react';
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

class Loader extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <>
        <div className={'sweet-loading'}>
          <GridLoader
            css={override}
            size={15}
            color={'#123abc'}
            loading={this.state.loading}
          />
        </div>
      </>
    );
  }
}

export default Loader;
