<template>
<form-block 
  header="Choose your subscription plan" 
  cta-text="Activate your subscription" 
  :validation-rules="validationRules"
  :error-message="errorMessages[defaultError]" 

  :has-error="!!defaultError" 
  :is-form-processing="isFormProcessing"
  fluid 

  @submit="handleFormSubmit" 
  @invalid="handleFormValidationFail"
  @input="handleInput"
>
  <form-field type="radio" label="Monthly" name="period" :value="0" fluid/>
  <form-field type="radio" label="Annual" name="period" :value="1" fluid/>
  <div class="subscription-plan-options-wrapper">
    <subscription-plan-option v-for="(plan, idx) in plans" :key="`plan_${ idx }`" title="Demo" price="$25" :features="['Tasty treats', 'Meow meow', 'Wasabi']" :is-active="activePlan === idx" @click="changeActivePlan(idx)"/>
    <input class="ghost-input" type="number" name="plan" :value="activePlan"/>
  </div>
  <form-field type="select" label="Currency" name="currency" :options="currencies" fluid/>
  <form-field type="payment" label="Credit or debit card info" name="card_info" placeholder="Add credit or debit card info" fluid/>
</form-block>

</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';
import SubscriptionPlanOption from '@/components/Registration/SubscriptionPlanOption.vue';

import { apiRequestPost, fetchResource } from '@/lib/api';
import { PAYMENT_STEP_VALIDATION_RULES } from './const';
import formHandlerMixin from '../formHandlerMixin';

export default {
  name: 'PaymentStep',
  emits: ['change-step'],
  components: {
    FormBlock,
    FormField,
    SubscriptionPlanOption,
  },
  mixins: [formHandlerMixin],
  async created() {
    const currencies = await fetchResource('currencies');

    this.currencies = currencies;
  },
  data() {
    return {
      activePlan: null,
      plans: new Array(3),
      currencies: [],

      validationRules: PAYMENT_STEP_VALIDATION_RULES,
    };
  },
  computed: {
    defaultError() {
      return 'default' in this.validationRules ? this.validationRules.default.find(rule => !!this.errorMessages[rule]) : null;
    }
  },
  methods: {
    changeActivePlan(idx) {
      this.activePlan = this.activePlan === idx ? null : idx;
      this.resetErrors();
    },
    handleInput() {
      this.resetErrors();
    },
    async handleFormSubmit(formData) {
      this.resetErrors();
      this.isFormProcessing = true;
      await apiRequestPost('users/sign-up/set-up-plan', formData);
      this.isFormProcessing = false;

      this.$emit('change-step');
    },
  },
}
</script>

<style lang="scss" scoped>
.subscription-plan-options-wrapper {
  @include divider-bottom;

  display: flex;
  gap: 1.5rem;

  padding: .75rem 0 1.25rem;

  @media screen and (max-width: $mobile-breakpoint) {
    flex-wrap: wrap;
  }
}
</style>