import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@atlaskit/button';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import { connect } from 'react-redux';

const ButtonContainer = styled.div`
  margin-top: 30px;
`;

const StyledButtonWrapper = styled.div`
  display: inline-block;
  padding: 4px;
  float: right;
  font-size: 14px;
`;

const ButtonWrapper = ({ children }: { children: React.ReactNode }) => (
  <StyledButtonWrapper>{children}</StyledButtonWrapper>
);

const ButtonBack: FunctionComponent<any> = (props) => {
  return (
    <ButtonContainer>
      <h4 style={{ display: 'inline-block' }}>{props.titleBefore}</h4>
      <ButtonWrapper>
        <Link to={props.path}>
          <Button appearance="primary" iconBefore={<ArrowLeftIcon label="Go Back" size="small" />}>
            Back
          </Button>
        </Link>
      </ButtonWrapper>
    </ButtonContainer>
  );
};

export default connect(null, null)(ButtonBack);
