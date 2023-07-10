<template>
<form-block header="Choose your subscription plan" cta-text="Activate your subscription" fluid @proceed="handleChangeStep">
  <form-field type="radio" label="Monthly" name="subscription_period" :value="0" fluid/>
  <form-field type="radio" label="Annual" name="subscription_period" :value="1" fluid/>
  <div class="subscription-plan-options-wrapper">
    <subscription-plan-option v-for="(plan, idx) in plans" :key="`plan_${ idx }`" title="Demo" price="$25" :features="['Tasty treats', 'Meow meow', 'Wasabi']" :is-active="activePlan === idx" @click="activePlan = activePlan === idx ? null : idx"/>
    <input class="ghost-input" type="number" name="subscription_plan" :value="activePlan"/>
  </div>
  <form-field type="select" label="Currency" name="currency" fluid/>
  <form-field type="payment" label="Credit or debit card info" name="card_info" placeholder="Add credit or debit card info" fluid/>
</form-block>

</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';
import SubscriptionPlanOption from '@/components/Registration/SubscriptionPlanOption.vue';

export default {
  name: 'PaymentStep',
  emits: ['change-step'],
  components: {
    FormBlock,
    FormField,
    SubscriptionPlanOption,
  },
  data() {
    return {
      activePlan: null,
      plans: new Array(3),
    };
  },
  methods: {
    handleChangeStep() {
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