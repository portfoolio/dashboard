export const uuid4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  // eslint-disable-next-line
  const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});

export const prepareFormData = (
  formData: any,
  {
    image = null,
    key = null,
    thumbnail = null,
    thumbnailKey = null,
  }: {
    image?: any,
    key?: any
    thumbnail?: any,
    thumbnailKey?: any,
  } = {}
) => {
  if (!image) {
    if (formData.hasOwnProperty('appearance')) {
      formData.appearance = formData.appearance.value;
    }

    return formData;
  }

  const form = new FormData();
  for (const k in formData) {
    if (!formData.hasOwnProperty(k)) {
      continue;
    }

    if (k === 'appearance') {
      form.append('appearance', formData.appearance.value);
      continue;
    }

    if (['image', 'thumbnail', key, thumbnailKey].includes(k)) {
      continue;
    }

    form.append(k, formData[k]);
  }

  form.append(key ? key : 'image', image);
  form.append(thumbnailKey ? thumbnailKey : 'thumbnail', thumbnail);

  return form;
}
