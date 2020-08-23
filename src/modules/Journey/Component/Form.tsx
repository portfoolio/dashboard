import React, { ReactElement, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { useDispatch } from 'react-redux';

import { Route as JourneyRoutes } from 'modules/Journey/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormFooter from 'modules/Core/Component/Form/Footer';
import { prepareFormData } from 'util/helper';
import { createJourney, fetchJourney, updateJourney } from 'modules/Journey/Store/actions';

export default withRouter(({ history, match }: any): ReactElement => {
  const { currentItem: journey, shouldRedirect }: any = useSelector((state: any) => state.journey);

  if (shouldRedirect) {
    history.push(JourneyRoutes.LIST);
  }

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const updateForm = useCallback((data) => {
    if (match.params.id) {
      stableDispatch(updateJourney({ id: match.params.id, ...data }));
      return;
    }

    stableDispatch(createJourney(data));
  }, [stableDispatch, match.params.id])

  useEffect(() => {
    if (match.params.id) {
      stableDispatch(fetchJourney(match.params.id));
    }
  }, [stableDispatch, match.params.id]);

  return (
    <section>
      <ButtonBack path={JourneyRoutes.LIST} titleBefore={'Journey Form'} />
      <Form
        onSubmit={(data: { data: object }) => updateForm(prepareFormData(data))}>
        {
          ({ formProps }: { formProps: object }) => (
            <form {...formProps} name={'journey'}>

              <Field name={'title'} defaultValue={journey.title} isRequired={true} label={'Title'}>
                {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Title'} {...fieldProps} />}
              </Field>

              <FormFooter />
            </form>
          )
        }
      </Form>
    </section>
  );
});
