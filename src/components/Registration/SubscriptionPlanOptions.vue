<template>
  <div class="subscription-plan-options-wrapper">
    <subscription-plan-option v-for="(plan, idx) in plans" :key="`plan_${ idx }`" title="Demo" price="$25" :features="['Tasty treats', 'Meow meow', 'Wasabi']" :is-active="activePlan === idx" @click="changeActivePlan(idx)"/>
    <input ref="ghost-input" class="ghost-input" type="number" name="plan" :value="activePlan"/>
  </div>
</template>

<script>
import SubscriptionPlanOption from '@/components/Registration/SubscriptionPlanOption.vue';

export default {
  name: 'SubscriptionPlanOptions',
  components: {
    SubscriptionPlanOption,
  },
  data() {
    return {
      activePlan: null,
      plans: new Array(3),
    }
  },
  methods: {
    changeActivePlan(idx) {
      this.activePlan = this.activePlan === idx ? null : idx;

      const event = new Event('input', {
        bubbles: true,
        cancelable: true,
      });

      this.$refs['ghost-input'].dispatchEvent(event, idx);
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