<template>
  <article class="subscription-plan-card" :class="{ 'subscription-plan-card--popular': plan.isPopular }">
    <div class="subscription-plan-card__header">
      <h3 class="h3 text-display text-semi-bold">{{ plan.header }}</h3>
      <span>{{ plan.subHeader }}</span>
    </div>
    <ul class="subscription-plan-card__features-wrapper">
      <li v-for="(feature, idx) in plan.features" :key="`feature_${idx}`" class="subscription-plan-card__feature" :class="{ 'subscription-plan-card__feature--active': feature.isActive }"><v-icon name="circle-check" /><span v-html="feature.text"></span></li>
    </ul>
    <div class="subscription-plan-card__footer">
      <span class="subscription-plan-card__footer__price"><b>{{ plan.price }}</b>{{ plan.period }}</span>
      <v-button size="small" :type="plan.isPopular ? 'primary-accent' : 'primary'" :to="{ name: 'Registration', query: { plan: plan.header } }" fluid>{{ plan.ctaText }}</v-button>
    </div>
  </article>
</template>

<script>
const AVAILABLE_PERIODS = ['month', 'year', ''];

export default {
  name: 'SubscriptionPlanCard',
  props: {
    plan: {
      type: Object,
      default() {
        return { period: '' };
      },
      validator(val) {
        return 'period' in val && AVAILABLE_PERIODS.includes(val.period);
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Landing/subscription-plan-card.scss';

</style>