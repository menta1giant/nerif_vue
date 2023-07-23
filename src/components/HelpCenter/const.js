import FormField from '@/components/Base/Form/FormField';
import UploadButton from '@/components/UploadButton.vue';
import { markRaw } from 'vue';

const rawFormField = markRaw(FormField);

export const CONTACT_FORM_FIELDS = [
  [
    {
      component: rawFormField,
      props: {
        type: 'text',
        label: 'E-mail', 
        placeholder: 'placeholder.email@gmail.com', 
        name: 'email', 
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'textarea',
        label: 'Enter your message', 
        maxlength: 301,
        name: 'message', 
      },
    },
    {
      component: markRaw(UploadButton),
      props: {
        size: 'small',
        accept: '',
        multiple: true
      },
    },
  ],
]