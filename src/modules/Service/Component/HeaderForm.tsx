import React, { ReactElement, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import { useDispatch } from 'react-redux';

import { Route as ServiceRoutes } from 'modules/Service/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormFooter from 'modules/Core/Component/Form/Footer';
import { prepareFormData } from 'util/helper';
import { fetchHeader, updateHeader } from 'modules/Service/Store/actions';

export default withRouter(({ history }: any): ReactElement => {
  const { header, shouldRedirect }: any = useSelector((state: any) => state.service);

  if (shouldRedirect) {
    history.push(ServiceRoutes.LIST);
  }

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchHeader());
  }, [stableDispatch]);

  return (
    <section>
      <ButtonBack path={ServiceRoutes.LIST} titleBefore={'Header Form'} />
      <Form
        onSubmit={(data: { data: object }) => stableDispatch(updateHeader(prepareFormData(data)))}>
        {
          ({ formProps }: { formProps: object }) => (
            <form {...formProps} name={'header'}>

              <Field name={'title'} defaultValue={header.title} isRequired={true} label={'Title'}>
                {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Title'} {...fieldProps} />}
              </Field>

              <Field
                name={'description'}
                defaultValue={header.description}
                isRequired={true}
                label={'Description'}
              >
                {
                  ({ fieldProps }: { fieldProps: any }) => <TextArea
                    placeholder={'Description'}
                    style={{ height: 100 }}
                    {...fieldProps}
                  />
                }
              </Field>

              <FormFooter />
            </form>
          )
        }
      </Form>
    </section>
  );
});
