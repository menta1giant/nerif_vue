import { ValidationRule, EMPTY_INPUT_VALIDATION_RULE } from '@/lib/validation';
import FormField from '@/components/Base/Form/FormField';
import SubscriptionPlanOptions from './SubscriptionPlanOptions';
import { markRaw } from 'vue';

const rawFormField = markRaw(FormField);

export const INITIAL_STEP_VALIDATION_RULES = {
  email: new ValidationRule('email', 'Enter valid e-mail'),
  password: new ValidationRule('password', 'Enter valid password. Your password should contain only letters a-Z and digits 0-9 and be no shorter than 6 characters.'),
  password_confirmation: new ValidationRule('password_confirmation', 'Passwords don\'t match'),
};

export const PAYMENT_STEP_VALIDATION_RULES = {
  plan: new ValidationRule('select', 'Select subscription plan'),
  default: ['plan']
};

export const FINAL_STEP_VALIDATION_RULES = {
  first_name: [EMPTY_INPUT_VALIDATION_RULE, new ValidationRule('plain_text', 'Your first name may only contain letters')],
  last_name: [EMPTY_INPUT_VALIDATION_RULE, new ValidationRule('plain_text', 'Your last name may only contain letters')],
};

export const LOGIN_FIELDS = [
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
        type: 'password',
        label: 'Password',  
        name: 'password', 
      },
    },
  ],
]

export const INITIAL_STEP_FIELDS = [
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
        type: 'password',
        label: 'Password',  
        name: 'password', 
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'password',
        label: 'Confirm password', 
        name: 'password_confirmation', 
      },
    },
  ],
]

export const PAYMENT_STEP_FIELDS = [
  [
    {
      component: rawFormField,
      props: {
        type: 'radio',
        label: 'Monthly', 
        name: 'period', 
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'radio',
        label: 'Annual',  
        name: 'period', 
      },
    },
    {
      component: markRaw(SubscriptionPlanOptions),
      props: {},
    },
    {
      component: rawFormField,
      props: {
        type: 'select',
        label: 'Currency',
        name: 'currency',
        resource: 'currencies',
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'payment',
        label: 'Credit or debit card info',
        placeholder: 'Add credit or debit card info',
        name: 'card_info',
      },
    },
  ],
]

export const FINAL_STEP_FIELDS = [
  [
    {
      component: rawFormField,
      props: {
        type: 'text',
        label: 'First name', 
        placeholder: 'Maria', 
        name: 'first_name', 
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'text',
        label: 'Last name', 
        placeholder: 'Santos', 
        name: 'last_name', 
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'select',
        label: 'Location',
        name: 'location',
        resource: 'locations',
      },
    },
  ],
  [
    {
      component: rawFormField,
      props: {
        type: 'image',
        label: 'Profile photo', 
        name: 'profile_photo', 
      },
    },
  ]
]