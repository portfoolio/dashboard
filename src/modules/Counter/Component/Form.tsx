import React, { ReactElement, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { useDispatch } from 'react-redux';

import { Route as CounterRoutes } from 'modules/Counter/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormFooter from 'modules/Core/Component/Form/Footer';
import { prepareFormData } from 'util/helper';
import { createCounter, fetchCounter, updateCounter } from 'modules/Counter/Store/actions';

export default withRouter(({ history, match }: any): ReactElement => {
  const { currentItem: counter, shouldRedirect }: any = useSelector((state: any) => state.counter);

  if (shouldRedirect) {
    history.push(CounterRoutes.LIST);
  }

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const updateForm = useCallback((data) => {
    if (match.params.id) {
      stableDispatch(updateCounter({ id: match.params.id, ...data }));
      return;
    }

    stableDispatch(createCounter(data));
  }, [stableDispatch, match.params.id])

  useEffect(() => {
    if (match.params.id) {
      stableDispatch(fetchCounter(match.params.id));
    }
  }, [stableDispatch, match.params.id]);

  if (!counter) {
    return (<></>);
  }

  return (
    <section>
      <ButtonBack path={CounterRoutes.LIST} titleBefore={'Counter Form'} />
      <Form
        onSubmit={(data: { data: object }) => updateForm(prepareFormData(data))}>
        {
          ({ formProps }: { formProps: object }) => (
            <form {...formProps} name={'counter'}>

              <Field name={'title'} defaultValue={counter.title} isRequired={true} label={'Title'}>
                {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Title'} {...fieldProps} />}
              </Field>

              <Field
                name={'number'}
                defaultValue={counter.number}
                isRequired={true}
                label={'Number'}
                type={'number'}
              >
                {({ fieldProps }: { fieldProps: any }) => <TextField
                  placeholder={'50'} {...fieldProps} />}
              </Field>

              <FormFooter />
            </form>
          )
        }
      </Form>
    </section>
  );
});
