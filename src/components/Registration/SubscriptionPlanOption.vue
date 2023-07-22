<template>
<div class="subscription-plan-option" :class="{ 'subscription-plan-option--active': isActive }">
  <button class="subscription-plan-option__description" type="button">
    <div class="subscription-plan-option__header">
      <span class="subscription-plan-option__title">{{ title }}</span>
      <span class="subscription-plan-option__price-mobile mobile">{{ price }}</span>
      <div class="subscription-plan-option__header-chevron mobile"><v-chevron :model-value="isActive"/></div>
    </div>
    <ul class="desktop" :class="{ mobile: isActive }">
      <li v-for="(feature, idx) in features" :key="`feature_${ idx }`" >{{ feature }}</li>
    </ul>
  </button>
  <span class="subscription-plan-option__price desktop">Free</span>
</div>
</template>

<script>
export default {
  name: 'SubscriptionPlanOption',
  props: {
    isActive: Boolean,
    features: Array,
    title: String,
    price: String,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Registration/subscription-plan-option.scss';
</style>