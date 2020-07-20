import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FieldTextStateless } from '@atlaskit/field-text';
import { Field } from '@atlaskit/form';
import styled from 'styled-components';

const DivWrapper = styled.div`
    text-align: center;
    border: 1px solid #dfe1e6;
    padding: 10px;
    margin-top: 10px;
`;

class FormImageInput extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      file: props.fieldValue || props.value || null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });

    this.props.imageSelected(event.target.files[0]);
  }

  render() {
    return (
      <Fragment>
        <Field name={this.props.fieldName} defaultValue={this.props.fieldValue} label={this.props.fieldLabel}>
          {({ fieldProps }: { fieldProps: any }) => (
            <FieldTextStateless
              isLabelHidden
              shouldFitContainer
              type={'file'}
              required={this.props.required}
              onChange={this.handleChange}
              {...fieldProps.others}
            />
          )}
        </Field>
        {
          (this.state.file || (this.props.value !== 'undefined' && this.props.value)) ?
            <DivWrapper>
              <img src={this.state.file || this.props.value} style={{ width: '20%' }} alt={''} />
            </DivWrapper>
            : ''
        }
      </Fragment>
    );
  }
}

export default connect()(FormImageInput);
