import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import { Editor, EditorContext, WithEditorActions } from '@atlaskit/editor-core';

import { Route as BlogRoutes } from 'modules/Blog/Router/types';
import ButtonBack from 'modules/Core/Component/Form/ButtonBack';
import FormFooter from 'modules/Core/Component/Form/Footer';
import { prepareFormData } from 'util/helper';
import { createBlog, fetchBlog, updateBlog } from 'modules/Blog/Store/actions';
import FormImageInput from 'modules/Core/Component/Form/ImageInput';

export default withRouter(({ history, match }: any): ReactElement => {
  const { currentItem: blog, shouldRedirect }: any = useSelector((state: any) => state.blog);

  if (shouldRedirect) {
    history.push(BlogRoutes.LIST);
  }

  const [image, setImage]: any = useState(null);
  const [thumbnail, setThumbnail]: any = useState(null);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const updateForm = useCallback(data => {
    if (match.params.id) {
      stableDispatch(updateBlog({ id: match.params.id, ...data }));
      return;
    }

    stableDispatch(createBlog(data));
  }, [stableDispatch, match.params.id])

  const onEditorSave = (actions: any) => () => {
    actions.getValue().then((value: any) => {
      if (value != null) {
        blog.content = JSON.stringify(value.content);
      }
    })
  };

  useEffect(() => {
    if (match.params.id) {
      stableDispatch(fetchBlog(match.params.id));
    }
  }, [stableDispatch, match.params.id]);

  const parseEditorContent = match.params.id && match.params.id.length > 0 && blog.content.length > 1;
  const editorDefaultValue = parseEditorContent ? JSON.parse(blog.content) : [];
  const editorProps: any = parseEditorContent ? { defaultValue: editorDefaultValue } : {};

  return (
    <section>
      <ButtonBack path={BlogRoutes.LIST} titleBefore={'Blog Form'} />
      <Form
        onSubmit={(data: { data: object }) => updateForm(
          prepareFormData({ ...data, content: blog.content }, { image, thumbnail })
        )}>
        {
          ({ formProps }: { formProps: object }) => (
            <form {...formProps} name={'blog'}>

              <Field name={'title'} defaultValue={blog.title} isRequired={true} label={'Title'}>
                {({ fieldProps }: { fieldProps: any }) => <TextField placeholder={'Title'} {...fieldProps} />}
              </Field>

              <Field
                name={'description'}
                defaultValue={blog.description}
                isRequired={true}
                label={'Description'}
              >
                {
                  ({ fieldProps }: { fieldProps: any }) => <TextArea
                    placeholder={'Description'}
                    style={{ height: 100 }}
                    {...fieldProps}
                  />
                }
              </Field>

              <FormImageInput
                form={'blog'}
                fieldName={'thumbnail'}
                isLabelHidden
                fieldValue={blog.thumbnail}
                value={blog.thumbnail}
                fieldLabel={'Thumbnail'}
                imageSelected={setThumbnail}
              />

              <FormImageInput
                form={'blog'}
                fieldName={'image'}
                isLabelHidden
                fieldValue={blog.image}
                value={blog.image}
                fieldLabel={'Image'}
                imageSelected={setImage}
              />

              <Field
                name={'content'}
                isRequired={true}
                label={'Content'}
              >
                {
                  () => parseEditorContent ?
                    <EditorContext>
                      <WithEditorActions
                        render={(actions: any) => {
                          actions.replaceDocument({
                            type: 'doc',
                            version: 1,
                            content: [ ...editorProps.defaultValue ]
                          });

                          return (
                            <Editor
                              onSave={onEditorSave(actions)}
                              onChange={onEditorSave(actions)}
                            />
                          );
                        }}
                      />
                  </EditorContext> :
                  <EditorContext>
                    <WithEditorActions
                      render={actions => (
                        <Editor
                          onSave={onEditorSave(actions)}
                          onChange={onEditorSave(actions)}
                        />
                      )}
                    />
                  </EditorContext>
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
