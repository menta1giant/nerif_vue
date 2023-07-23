import { ValidationRule, EMPTY_INPUT_VALIDATION_RULE } from '@/lib/validation';
import FormField from '@/components/Base/Form/FormField';
import SubscriptionPlanField from './SubscriptionPlanField';
import { markRaw } from 'vue';

const rawFormField = markRaw(FormField);

export const PASSWORD_FORM_VALIDATION_RULES = {
  old_password: new ValidationRule('password', 'Enter valid password. It should contain only letters a-Z and digits 0-9 and be no shorter than 6 characters.'),
  password: new ValidationRule('password', 'Enter valid password. Your password should contain only letters a-Z and digits 0-9 and be no shorter than 6 characters.'),
  password_confirmation: new ValidationRule('password_confirmation', 'Passwords don\'t match'),
};

export const PERSONAL_INFO_FORM_VALIDATION_RULES = {
  first_name: [EMPTY_INPUT_VALIDATION_RULE, new ValidationRule('plain_text', 'Your first name may only contain letters')],
  last_name: [EMPTY_INPUT_VALIDATION_RULE, new ValidationRule('plain_text', 'Your last name may only contain letters')],
  phone: new ValidationRule('phone', 'Enter valid phone number. It should start with a \'+\' character followed by any number of digits.'),
  email: new ValidationRule('email', 'Enter valid e-mail'),
};

export const PERSONAL_INFO_FIELDS = [
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
        type: 'text',
        label: 'Phone number', 
        placeholder: '+79009009090', 
        name: 'phone', 
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'text',
        label: 'E-mail', 
        placeholder: 'placeholder.email@gmail.com', 
        name: 'email', 
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

export const PAYMENT_INFO_FIELDS = [
  [
    {
      component: rawFormField,
      props: {
        type: 'select',
        label: 'Location',
        name: 'location',
        resource: 'locations',
      },
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
    {
      component: markRaw(SubscriptionPlanField),
      props: {}
    }
  ]
]

export const PASSWORD_FIELDS = [
  [
    {
      component: rawFormField,
      props: {
        type: 'password',
        label: 'Current password', 
        name: 'old_password', 
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'password',
        label: 'New password',  
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

export const LOCALIZATION_FIELDS = [
  [
    {
      component: rawFormField,
      props: {
        type: 'select',
        label: 'Language',
        name: 'language',
        resource: 'languages',
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'select',
        label: 'Timezone',
        name: 'timezone',
        resource: 'timezones',
      },
    },
  ],
]

export const NOTIFICATIONS_FIELDS = [
  [
    {
      component: rawFormField,
      props: {
        type: 'switcher',
        label: 'New predictions',
        name: 'new_predictions',
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'switcher',
        label: 'Predictions from selected cappers',
        name: 'cappers_predictions',
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'switcher',
        label: 'Weekly dashboard digests',
        name: 'dashboard_digests',
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'switcher',
        label: 'Special offers',
        name: 'special_offers',
      },
    },
    {
      component: rawFormField,
      props: {
        type: 'switcher',
        label: 'Community mentions',
        name: 'community_mentions',
      },
    },
  ],
]