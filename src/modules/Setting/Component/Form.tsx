import React, { ReactElement, useCallback, useState } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import Select from '@atlaskit/select';
import { prepareFormData } from 'util/helper';

import { Route as HomeRoutes } from 'modules/Home/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormFooter from 'modules/Core/Component/Form/Footer';
import Checkbox from 'modules/Core/Component/Form/Checkbox';
import FormImageInput from 'modules/Core/Component/Form/ImageInput';
import { updateSetting } from 'modules/Setting/Store/actions';

const variations: any = [
  {
    label: 'Container light ',
    value: 'Container light ',
  },
  {
    label: 'Product "light" ',
    value: 'Product "light" ',
  },
  {
    label: 'Product "dark"',
    value: 'Product "dark"',
  },
  {
    label: 'Product "settings"',
    value: 'Product "settings"',
  },
  {
    label: 'Product bright and saturated',
    value: 'Product bright and saturated',
  },
  {
    label: 'Product bright and saturated 2',
    value: 'Product bright and saturated 2',
  },
  {
    label: 'Product bright and saturated 3',
    value: 'Product bright and saturated 3',
  },
  {
    label: 'Product bright and dull',
    value: 'Product bright and dull',
  },
  {
    label: 'Product pastel',
    value: 'Product pastel',
  },
  {
    label: 'Product dull',
    value: 'Product dull',
  },
  {
    label: 'Product regular',
    value: 'Product regular',
  },
  {
    label: 'Product white',
    value: 'Product white',
  },
];

export default withRouter(({ history }: any): ReactElement => {
  const {
    setting,
    shouldRedirect
  }: {
    setting: any,
    shouldRedirect: any
  } = useSelector((state: any) => state.setting);

  if (shouldRedirect) {
    history.push(HomeRoutes.HOME);
  }

  const [image, setImage]: any = useState(null);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  return (
    <section>
      <ButtonBack path={HomeRoutes.HOME} titleBefore={'Setting Form'} />
      <Form
        onSubmit={(data: { data: object }) => stableDispatch(
          updateSetting(prepareFormData({
            ...data,
            ...{
              showCounter: setting.showCounter,
              showAbout: setting.showAbout,
              showService: setting.showService,
              showJourney: setting.showJourney,
              showProject: setting.showProject,
              showTestimonial: setting.showTestimonial,
              showTechnology: setting.showTechnology,
              showBlog: setting.showBlog,
              showContact: setting.showContact,
            },
          }, { image, key: 'favicon' }))
        )}
      >
          {
            ({ formProps }: { formProps: object }) => (
              <form {...formProps} name={'setting'}>

                <Field name={'siteTitle'} defaultValue={setting.siteTitle} isRequired={true} label={'Site Title'}>
                  {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Site Title'} {...fieldProps} />}
                </Field>

                <Field
                  name={'siteDescription'}
                  defaultValue={setting.siteDescription}
                  isRequired={false}
                  label={'Site Description'}
                >
                  {({ fieldProps }: { fieldProps: any }) => <TextArea
                    placeholder={'Site Description'}
                    style={{ height: 50 }}
                    {...fieldProps}
                  />
                  }
                </Field>

                <FormImageInput
                  form={'favicon'}
                  fieldName={'favicon'}
                  isLabelHidden
                  fieldValue={setting.favicon}
                  value={setting.favicon}
                  fieldLabel={'Favicon'}
                  imageSelected={setImage}
                />

                <Field
                  name={'showCounter'}
                  defaultValue={setting.showCounter}
                  isRequired={false}
                  isChecked={setting.showCounter}
                  label={'Show Counter Section'}
                >
                  {({ fieldProps }: { fieldProps: any }) =>
                    <Checkbox
                      label="Default checkbox"
                      isChecked={setting.showCounter}
                      onChecked={(val: any) => setting.showCounter = val}
                      { ...fieldProps }
                    />
                  }
                </Field>

                <Field
                  name={'showAbout'}
                  defaultValue={setting.showAbout}
                  isRequired={false}
                  isChecked={setting.showAbout}
                  label={'Show About Section'}
                >
                  {({ fieldProps }: { fieldProps: any }) =>
                    <Checkbox
                      label="Show About Section"
                      isChecked={setting.showAbout}
                      onChecked={(val: any) => setting.showAbout = val}
                      { ...fieldProps }
                    />
                  }
                </Field>

                <Field
                  name={'showService'}
                  defaultValue={setting.showService}
                  isRequired={false}
                  isChecked={setting.showService}
                  label={'Show Service Section'}
                >
                  {({ fieldProps }: { fieldProps: any }) =>
                    <Checkbox
                      label="Show Service Section"
                      isChecked={setting.showService}
                      onChecked={(val: any) => setting.showService = val}
                      { ...fieldProps }
                    />
                  }
                </Field>

                <Field
                  name={'showJourney'}
                  defaultValue={setting.showJourney}
                  isRequired={false}
                  isChecked={setting.showJourney}
                  label={'Show Journey Section'}
                >
                  {({ fieldProps }: { fieldProps: any }) =>
                    <Checkbox
                      label="Show Journey Section"
                      isChecked={setting.showJourney}
                      onChecked={(val: any) => setting.showJourney = val}
                      { ...fieldProps }
                    />
                  }
                </Field>

                <Field
                  name={'showProject'}
                  defaultValue={setting.showProject}
                  isRequired={false}
                  isChecked={setting.showProject}
                  label={'Show Project Section'}
                >
                  {({ fieldProps }: { fieldProps: any }) =>
                    <Checkbox
                      label="Show Project Section"
                      isChecked={setting.showProject}
                      onChecked={(val: any) => setting.showProject = val}
                      { ...fieldProps }
                    />
                  }
                </Field>

                <Field
                  name={'showTestimonial'}
                  defaultValue={setting.showTestimonial}
                  isRequired={false}
                  isChecked={setting.showTestimonial}
                  label={'Show Testimonial Section'}
                >
                  {({ fieldProps }: { fieldProps: any }) =>
                    <Checkbox
                      label="Show Testimonial Section"
                      isChecked={setting.showTestimonial}
                      onChecked={(val: any) => setting.showTestimonial = val}
                      { ...fieldProps }
                    />
                  }
                </Field>

                <Field
                  name={'showTechnology'}
                  defaultValue={setting.showTechnology}
                  isRequired={false}
                  isChecked={setting.showTechnology}
                  label={'Show Tech Section'}
                >
                  {({ fieldProps }: { fieldProps: any }) =>
                    <Checkbox
                      label="Show Tech Section"
                      isChecked={setting.showTechnology}
                      onChecked={(val: any) => setting.showTechnology = val}
                      { ...fieldProps }
                    />
                  }
                </Field>

                <Field
                  name={'showBlog'}
                  defaultValue={setting.showBlog}
                  isRequired={false}
                  isChecked={setting.showBlog}
                  label={'Show Blog Section'}
                >
                  {({ fieldProps }: { fieldProps: any }) =>
                    <Checkbox
                      label="Show Blog Section"
                      isChecked={setting.showBlog}
                      onChecked={(val: any) => setting.showBlog = val}
                      { ...fieldProps }
                    />
                  }
                </Field>

                <Field
                  name={'showContact'}
                  isRequired={false}
                  isChecked={setting.showContact}
                  label={'Show Contact Section'}
                >
                  {({ fieldProps }: { fieldProps: any }) =>
                    <Checkbox
                      label="Show Contact Section"
                      isChecked={setting.showContact}
                      onChecked={(val: any) => setting.showContact = val}
                      { ...fieldProps }
                    />
                  }
                </Field>

                <Field
                  name={'appearance'}
                  defaultValue={variations.filter(({ value }: any) => setting.appearance === value)}
                  isRequired={false}
                  label={'Dashboard Appearance'}
                >
                  {({ fieldProps }: { fieldProps: any }) => (
                    <Select
                      className={'single-select'}
                      classNamePrefix={'react-select'}
                      options={variations}
                      placeholder={'Dashboard Appearance'}
                      {...fieldProps}
                    />
                  )}
                </Field>

                <FormFooter />
              </form>
            )
          }
      </Form>
    </section>
  );
});
