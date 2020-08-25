import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';

import { Route as HomeRoutes } from 'modules/Home/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormImageInput from 'modules/Core/Component/Form/ImageInput';
import FormFooter from 'modules/Core/Component/Form/Footer';
import { useDispatch } from 'react-redux';
import { fetchHeader, updateHeader } from 'modules/Header/Store/actions';
import { prepareFormData } from 'util/helper';

export default withRouter(({ history }: any): ReactElement => {
  const { header, shouldRedirect }: any = useSelector((state: any) => state.header);

  if (shouldRedirect) {
    history.push(HomeRoutes.HOME);
  }

  const [image, setImage]: any = useState(null);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    stableDispatch(fetchHeader());
  }, [stableDispatch]);

  return (
    <section>
      <ButtonBack path={HomeRoutes.HOME} titleBefore={'Header Form'} />
      <Form
        onSubmit={(data: { data: object }) => stableDispatch(updateHeader(prepareFormData(data, { image }))) }>
        {({ formProps }: { formProps: object }) => (
          <form {...formProps} name={'header'}>

            <Field name={'title'} defaultValue={header.title} isRequired={true} label={'Title'}>
              {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Title'} {...fieldProps} />}
            </Field>

            <Field name={'subtitle'} defaultValue={header.subtitle} isRequired={true} label={'Subtitle'}>
              {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Subtitle'} {...fieldProps} />}
            </Field>

            <Field name={'description'} defaultValue={header.description} isRequired={true} label={'Description'}>
              {({ fieldProps }: { fieldProps: any }) => <TextArea placeholder={'Description'} {...fieldProps} />}
            </Field>

            <Field name={'links.facebook'} defaultValue={header.links.facebook} label={'Facebook'}>
              {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Facebook'} {...fieldProps} />}
            </Field>

            <Field name={'links.instagram'} defaultValue={header.links.instagram} label={'Instagram'}>
              {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Instagram'} {...fieldProps} />}
            </Field>

            <Field name={'links.twitter'} defaultValue={header.links.twitter} label={'Twitter'}>
              {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Twitter'} {...fieldProps} />}
            </Field>

            <Field name={'links.linkedIn'} defaultValue={header.links.linkedIn} label={'LinkedIn'}>
              {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'LinkedIn'} {...fieldProps} />}
            </Field>

            <Field name={'links.github'} defaultValue={header.links.github} label={'GitHub'}>
              {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'GitHub'} {...fieldProps} />}
            </Field>

            <FormImageInput
              form={'header'}
              fieldName={'image'}
              isLabelHidden
              fieldValue={header.image}
              value={header.image}
              fieldLabel={'Image'}
              imageSelected={setImage}
            />

            <FormFooter />
          </form>
        )}
      </Form>
    </section>
  );
});
