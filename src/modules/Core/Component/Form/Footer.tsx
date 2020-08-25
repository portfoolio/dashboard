import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { FormFooter as AFormFooter } from '@atlaskit/form';
import Button from '@atlaskit/button';
import CheckIcon from '@atlaskit/icon/glyph/check';

const FormFooter: FunctionComponent<any> = () => {
  return (
    <AFormFooter>
      <Button type={'submit'} appearance={'primary'} iconBefore={<CheckIcon label="Submit" size="small" />}>
        Submit
      </Button>
    </AFormFooter>
  );
};

export default connect()(FormFooter);
