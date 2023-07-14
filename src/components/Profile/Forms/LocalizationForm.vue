<template>
  <form-block 
    header="Localization" 
    subheader="Aloha!"

    :form-fields="formFields"
    :form-api-route="formApiRoute"

    prefetch-required
  />
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';

import { LOCALIZATION_FIELDS } from '../const';

export default {
  name: 'LocalizationForm',
  components: {
    FormBlock,
  },
  data() {
    return {
      formFields: LOCALIZATION_FIELDS,
      formApiRoute: 'users/profile/localization-info',
    }
  },
}
</script>