import React, { ReactElement, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';

import { Route as JourneyRoutes } from 'modules/Journey/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormFooter from 'modules/Core/Component/Form/Footer';
import { prepareFormData } from 'util/helper';
import {
  createJourneyItem,
  fetchJourneyItem,
  updateJourneyItem
} from 'modules/Journey/Store/actions';

export default withRouter(({ history, match }: any): ReactElement => {
  const { journeyItem, shouldRedirect }: any = useSelector((state: any) => state.journey);

  if (shouldRedirect) {
    history.push(JourneyRoutes.LIST);
  }

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const updateForm = useCallback((data) => {
    if (match.params.journeyId && match.params.id) {
      stableDispatch(updateJourneyItem({ id: match.params.id, ...data }));
      return;
    }

    stableDispatch(createJourneyItem(match.params.journeyId, data));
  }, [stableDispatch, match.params.journeyId, match.params.id])

  useEffect(() => {
    if (match.params.journeyId && match.params.id) {
      stableDispatch(fetchJourneyItem(match.params.id));
    }
  }, [stableDispatch, match.params.journeyId, match.params.id]);

  return (
    <section>
      <ButtonBack path={JourneyRoutes.LIST} titleBefore={'Journey Form'} />
      <Form
        onSubmit={(data: { data: object }) => updateForm(prepareFormData(data))}>
        {
          ({ formProps }: { formProps: object }) => (
            <form {...formProps} name={'journey'}>

              <Field name={'title'} defaultValue={journeyItem.title} isRequired={true} label={'Title'}>
                {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Title'} {...fieldProps} />}
              </Field>

              <Field name={'subtitle'} defaultValue={journeyItem.subtitle} isRequired={true} label={'Subtitle'}>
                {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Subtitle'} {...fieldProps} />}
              </Field>

              <Field
                name={'description'}
                defaultValue={journeyItem.description}
                isRequired={true}
                label={'Description'}
              >
                {
                  ({ fieldProps }: { fieldProps: any }) => <TextArea
                    placeholder={'Description'}
                    {...fieldProps}
                    style={{ height: 200 }}
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
