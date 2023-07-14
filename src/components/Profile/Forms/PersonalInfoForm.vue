<template>
  <form-block 
    header="Personal info" 
    subheader="Tell us more about yourself" 
    :form-fields="formFields"
    :validation-rules="validationRules"
    :form-api-route="formApiRoute"

    prefetch-required

    @form-submitted="handleFormSubmitted"
  />
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';

import { PERSONAL_INFO_FORM_VALIDATION_RULES, PERSONAL_INFO_FIELDS } from '../const';

export default {
  name: 'PersonalInfoForm',
  components: {
    FormBlock,
  },
  data() {
    return {
      formApiRoute: 'users/profile/personal-info',
      formFields: PERSONAL_INFO_FIELDS,
      validationRules: PERSONAL_INFO_FORM_VALIDATION_RULES,
    };
  },
  methods: {
    async handleFormSubmitted() {
      await this.$store.commit('setUserInfo');
    },
  },
}
</script>