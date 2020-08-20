import React, { ReactElement, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';

import { Route as HomeRoutes } from 'modules/Home/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormFooter from 'modules/Core/Component/Form/Footer';
import { useDispatch } from 'react-redux';
import { fetchAbout, updateAbout } from 'modules/About/Store/actions';
import { prepareFormData } from 'util/helper';

export default withRouter(({ history }: any): ReactElement => {
  const { about, shouldRedirect }: any = useSelector((state: any) => state.about);

  if (shouldRedirect) {
    history.push(HomeRoutes.HOME);
  }

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchAbout());
  }, [stableDispatch]);

  if (!about) {
    return (<></>);
  }

  return (
    <section>
      <ButtonBack path={HomeRoutes.HOME} titleBefore={'About Form'} />
      <Form
        onSubmit={(data: { data: object }) => stableDispatch(updateAbout(prepareFormData(data))) }>
          {
            ({ formProps }: { formProps: object }) => (
              <form {...formProps} name={'about'}>

                <Field name={'title'} defaultValue={about.title} isRequired={true} label={'Title'}>
                  {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Title'} {...fieldProps} />}
                </Field>

                <Field
                  name={'description'}
                  defaultValue={about.description}
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

                <FormFooter />
              </form>
            )
          }
      </Form>
    </section>
  );
});
