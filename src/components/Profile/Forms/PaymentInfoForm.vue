<template>
  <form-block 
    header="Payment info" 
    subheader="All data is secure" 
    :form-fields="formFields"
    :form-api-route="formApiRoute"

    prefetch-required
  >
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import { PAYMENT_INFO_FIELDS } from '../const';

export default {
  name: 'PersonalInfoForm',
  components: {
    FormBlock,
  },
  data() {
    return {
      formFields: PAYMENT_INFO_FIELDS,
      formApiRoute: 'users/profile/payment-info',
    };
  },
}
</script>