import React from 'react';

import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form';

import { LoginComponentProps } from 'modules/Auth/Component/Login/types';

export default (props: LoginComponentProps) => {
  const passwordCharactersMinimum = 6;

  return (
    <Form onSubmit={props.onSubmit}>
      {({ formProps, submitting }: { formProps: any, submitting: any }) => (
        <form {...formProps}>
          <Field name={'email'} label={'Email'} isRequired defaultValue={''}>
            {({ fieldProps, error }: { fieldProps: any, error: any }) => (
              <>
                <TextField autoComplete={'off'} {...fieldProps} />
                {error && (
                  <ErrorMessage>
                    The email and password combination is incorrect.
                  </ErrorMessage>
                )}
              </>
            )}
          </Field>
          <Field
            name={'password'}
            label={'Password'}
            defaultValue={''}
            isRequired
            validate={(value: string) => (
              value.length < passwordCharactersMinimum
                ? 'TOO_SHORT'
                : undefined
            )}
          >
            {({
                fieldProps,
                error,
                valid,
              }: {
              fieldProps: any,
              error: any,
              valid: boolean,
            }) => (
              <>
                <TextField type={'password'} {...fieldProps} />
                {error && (
                  <ErrorMessage>
                    Password needs to be more than {passwordCharactersMinimum} characters.
                  </ErrorMessage>
                )}
                {valid && <ValidMessage>The length seems OK.</ValidMessage>}
              </>
            )}
          </Field>
          <CheckboxField name={'remember'} label={'Remember me'} defaultIsChecked>
            {({ fieldProps }: { fieldProps: any }) => (
              <Checkbox {...fieldProps} label={'Always sign in on this device'}/>
            )}
          </CheckboxField>
          <FormFooter>
            <ButtonGroup>
              <Button type={'submit'} appearance={'primary'} isLoading={submitting}>
                Sign in
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  );
};
