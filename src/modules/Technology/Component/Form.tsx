import React, { ReactElement, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';

import { Route as TechnologieRoutes } from 'modules/Technologie/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormFooter from 'modules/Core/Component/Form/Footer';
import { prepareFormData } from 'util/helper';
import { createTechnologie, fetchTechnologie, updateTechnologie } from 'modules/Technologie/Store/actions';

export default withRouter(({ history, match }: any): ReactElement => {
  const { currentItem: technologie, shouldRedirect }: any = useSelector((state: any) => state.technologie);

  if (shouldRedirect) {
    history.push(TechnologieRoutes.LIST);
  }

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const updateForm = useCallback((data) => {
    if (match.params.id) {
      stableDispatch(updateTechnologie({ id: match.params.id, ...data }));
      return;
    }

    stableDispatch(createTechnologie(data));
  }, [stableDispatch, match.params.id])

  useEffect(() => {
    if (match.params.id) {
      stableDispatch(fetchTechnologie(match.params.id));
    }
  }, [stableDispatch, match.params.id]);

  return (
    <section>
      <ButtonBack path={TechnologieRoutes.LIST} titleBefore={'Technologie Form'} />
      <Form
        onSubmit={(data: { data: object }) => updateForm(prepareFormData(data))}>
        {
          ({ formProps }: { formProps: object }) => (
            <form {...formProps} name={'technologie'}>

              <Field
                name={'comment'}
                defaultValue={technologie.comment}
                isRequired={true}
                label={'Comment'}
              >
                {({ fieldProps }: { fieldProps: any }) => <TextArea
                  placeholder={'Comment'}
                  style={{ height: 200 }}
                  {...fieldProps}
                />
                }
              </Field>

              <Field name={'author'} defaultValue={technologie.author} isRequired={true} label={'Author'}>
                {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Author'} {...fieldProps} />}
              </Field>

              <FormFooter />
            </form>
          )
        }
      </Form>
    </section>
  );
});
