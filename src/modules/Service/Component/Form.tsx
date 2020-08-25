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
import { createService, fetchService, updateService } from 'modules/Service/Store/actions';

export default withRouter(({ history, match }: any): ReactElement => {
  const { currentItem: service, shouldRedirect }: any = useSelector((state: any) => state.service);

  if (shouldRedirect) {
    history.push(ServiceRoutes.LIST);
  }

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const updateForm = useCallback((data) => {
    if (match.params.id) {
      stableDispatch(updateService({ id: match.params.id, ...data }));
      return;
    }

    stableDispatch(createService(data));
  }, [stableDispatch, match.params.id])

  useEffect(() => {
    if (match.params.id) {
      stableDispatch(fetchService(match.params.id));
    }
  }, [stableDispatch, match.params.id]);

  return (
    <section>
      <ButtonBack path={ServiceRoutes.LIST} titleBefore={'Service Form'} />
      <Form
        onSubmit={(data: { data: object }) => updateForm(prepareFormData(data))}>
        {
          ({ formProps }: { formProps: object }) => (
            <form {...formProps} name={'service'}>

              <Field name={'title'} defaultValue={service.title} isRequired={true} label={'Title'}>
                {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Title'} {...fieldProps} />}
              </Field>

              <Field
                name={'description'}
                defaultValue={service.description}
                isRequired={true}
                label={'Description'}
              >
                {({ fieldProps }: { fieldProps: any }) => <TextArea
                  placeholder={'Description'}
                  style={{ height: 100 }}
                  {...fieldProps}
                />
                }
              </Field>

              <Field
                name={'icon'}
                defaultValue={service.icon}
                isRequired={true}
                label={'Fontawesome Icon'}
              >
                {
                  ({ fieldProps }: { fieldProps: any }) => <TextField
                    placeholder={'Fontawesome Icon'}
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
