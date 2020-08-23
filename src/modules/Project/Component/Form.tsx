import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { useDispatch } from 'react-redux';

import { Route as ProjectRoutes } from 'modules/Project/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormFooter from 'modules/Core/Component/Form/Footer';
import { prepareFormData } from 'util/helper';
import { createProject, fetchProject, updateProject } from 'modules/Project/Store/actions';
import FormImageInput from 'modules/Core/Component/Form/ImageInput';

export default withRouter(({ history, match }: any): ReactElement => {
  const { currentItem: project, shouldRedirect }: any = useSelector((state: any) => state.project);

  if (shouldRedirect) {
    history.push(ProjectRoutes.LIST);
  }

  const [image, setImage]: any = useState(null);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const updateForm = useCallback((data) => {
    if (match.params.id) {
      stableDispatch(updateProject({ id: match.params.id, ...data }));
      return;
    }

    stableDispatch(createProject(data));
  }, [stableDispatch, match.params.id])

  useEffect(() => {
    if (match.params.id) {
      stableDispatch(fetchProject(match.params.id));
    }
  }, [stableDispatch, match.params.id]);

  return (
    <section>
      <ButtonBack path={ProjectRoutes.LIST} titleBefore={'Project Form'} />
      <Form
        onSubmit={(data: { data: object }) => updateForm(prepareFormData(data, { image }))}>
        {
          ({ formProps }: { formProps: object }) => (
            <form {...formProps} name={'project'}>

              <Field name={'title'} defaultValue={project.title} isRequired={true} label={'Title'}>
                {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Title'} {...fieldProps} />}
              </Field>

              <Field name={'subtitle'} defaultValue={project.subtitle} isRequired={true} label={'Subtitle'}>
                {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Subtitle'} {...fieldProps} />}
              </Field>

              <FormImageInput
                form={'project'}
                fieldName={'image'}
                isLabelHidden
                fieldValue={project.image}
                value={project.image}
                fieldLabel={'Image'}
                imageSelected={setImage}
              />

              <FormFooter />
            </form>
          )
        }
      </Form>
    </section>
  );
});
