import React, { ReactElement, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';

import { Route as TestimonialRoutes } from 'modules/Testimonial/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormFooter from 'modules/Core/Component/Form/Footer';
import { prepareFormData } from 'util/helper';
import { createTestimonial, fetchTestimonial, updateTestimonial } from 'modules/Testimonial/Store/actions';

export default withRouter(({ history, match }: any): ReactElement => {
  const { currentItem: testimonial, shouldRedirect }: any = useSelector((state: any) => state.testimonial);

  if (shouldRedirect) {
    history.push(TestimonialRoutes.LIST);
  }

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const updateForm = useCallback((data) => {
    if (match.params.id) {
      stableDispatch(updateTestimonial({ id: match.params.id, ...data }));
      return;
    }

    stableDispatch(createTestimonial(data));
  }, [stableDispatch, match.params.id])

  useEffect(() => {
    if (match.params.id) {
      stableDispatch(fetchTestimonial(match.params.id));
    }
  }, [stableDispatch, match.params.id]);

  return (
    <section>
      <ButtonBack path={TestimonialRoutes.LIST} titleBefore={'Testimonial Form'} />
      <Form
        onSubmit={(data: { data: object }) => updateForm(prepareFormData(data))}>
        {
          ({ formProps }: { formProps: object }) => (
            <form {...formProps} name={'testimonial'}>

              <Field
                name={'comment'}
                defaultValue={testimonial.comment}
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

              <Field name={'author'} defaultValue={testimonial.author} isRequired={true} label={'Author'}>
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
