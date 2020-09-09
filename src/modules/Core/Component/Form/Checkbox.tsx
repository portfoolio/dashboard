import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Checkbox as ACheckbox } from '@atlaskit/checkbox';

const CheckboxWrapper = styled.div`
  background-color: #FAFBFC;
  border-color: #DFE1E6;
  border-radius: 3px;
  border-style: solid;
`;

export default ({ label, isChecked: value, onChecked }: any) => {
  const [isChecked, setIsChecked]: any = useState(false);

  useEffect(() => {
    setIsChecked(value);
  }, [value])

  return (
    <CheckboxWrapper>
      <ACheckbox
        isChecked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
          onChecked(!isChecked);
        }}
        label={label}
      />
    </CheckboxWrapper>
  );
}
