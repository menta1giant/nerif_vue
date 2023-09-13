<template>
  <div class="subscription-plan-options-wrapper">
    <subscription-plan-option v-for="(plan, idx) in plans" :key="`plan_${ idx }`" title="Demo" price="$25" :features="['Feature 1', 'Feature 2', 'Feature 3']" :is-active="activePlan === idx" @click="changeActivePlan(idx)"/>
    <input ref="ghost-input" class="ghost-input" type="number" name="plan" :value="activePlan"/>
  </div>
</template>

<script>
import SubscriptionPlanOption from '@/components/Registration/SubscriptionPlanOption.vue';

const PLANS_MAP = {
  'Demo': 0,
  'Standard': 1,
  'Premium': 2,
}

export default {
  name: 'SubscriptionPlanOptions',
  components: {
    SubscriptionPlanOption,
  },
  created() {
    const activePlan = this.$route.query.plan;
    if (!activePlan) return;

    this.activePlan = PLANS_MAP[activePlan];
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
@import '@/assets/styles/Registration/subscription-plan-options.scss';
</style>