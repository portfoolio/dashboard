import React from 'react';
import { FormFooter as AFormFooter } from '@atlaskit/form';
import Button from '@atlaskit/button';
import CheckIcon from '@atlaskit/icon/glyph/check';

export default () => {
  return (
    <AFormFooter>
      <Button type={'submit'} appearance={'primary'} iconBefore={<CheckIcon label='Submit' size='small'/>}>
        Submit
      </Button>
    </AFormFooter>
  );
}
