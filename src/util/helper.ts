import { toast } from 'react-toastify';

export const uuid4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  // eslint-disable-next-line
  const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});

export const prepareFormData = (formData: any, { image = null, key = null }: { image?: any, key?: any } = {}) => {
  if (!image) {
    return formData;
  }

  const form = new FormData();
  for (const key in formData) {
    if (!formData.hasOwnProperty(key)) {
      continue;
    }

    form.append(key, formData[key]);
  }

  form.append(key ? key : 'image', image);

  return form;
}

export const showToast = (message: string) => {
  toast(message);
  return {};
}
