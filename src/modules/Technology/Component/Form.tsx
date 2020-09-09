import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Form from '@atlaskit/form';

import { Route as TechnologyRoutes } from 'modules/Technology/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormFooter from 'modules/Core/Component/Form/Footer';
import { prepareFormData } from 'util/helper';
import { createTechnology, fetchTechnology, updateTechnology } from 'modules/Technology/Store/actions';
import FormImageInput from 'modules/Core/Component/Form/ImageInput';

export default withRouter(({ history, match }: any): ReactElement => {
  const { currentItem: technology, shouldRedirect }: any = useSelector((state: any) => state.technology);

  if (shouldRedirect) {
    history.push(TechnologyRoutes.LIST);
  }

  const [image, setImage]: any = useState(null);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const updateForm = useCallback((data) => {
    if (match.params.id) {
      stableDispatch(updateTechnology({ id: match.params.id, ...data }));
      return;
    }

    stableDispatch(createTechnology(data));
  }, [stableDispatch, match.params.id])

  useEffect(() => {
    if (match.params.id) {
      stableDispatch(fetchTechnology(match.params.id));
    }
  }, [stableDispatch, match.params.id]);

  return (
    <section>
      <ButtonBack path={TechnologyRoutes.LIST} titleBefore={'Technology Form'} />
      <Form
        onSubmit={(data: { data: object }) => updateForm(prepareFormData(data, { image }))}>
        {
          ({ formProps }: { formProps: object }) => (
            <form {...formProps} name={'technology'}>

              <FormImageInput
                form={'project'}
                fieldName={'image'}
                isLabelHidden
                fieldValue={technology.image}
                value={technology.image}
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
