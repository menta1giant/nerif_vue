<template>
  <form-block 
    header="Password" 
    subheader="Enter and confirm new password"

    :validation-rules="validationRules"
    :form-fields="formFields"
    :form-api-route="formApiRoute"
  />
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';

import { PASSWORD_FIELDS, PASSWORD_FORM_VALIDATION_RULES } from '../const';

export default {
  name: 'PersonalInfoForm',
  components: {
    FormBlock,
  },
  data() {
    return {
      validationRules: PASSWORD_FORM_VALIDATION_RULES,
      formFields: PASSWORD_FIELDS,
      formApiRoute: 'users/profile/change-password',
    }
  },
}
</script>