<template>
  <div class="subscription-plan-field">
    <v-label>Subscription plan</v-label>
    <v-button size="small" type="transparent"><v-icon name="cog" />{{ userInfo.subscription?.plan }} <span>(Until 2023-04-26)</span></v-button>
  </div>
</template>

<script>
import UserInfoMixin from '@/components/UserInfoMixin.js';

export default {
  name: 'SubscriptionPlanField',
  mixins: [UserInfoMixin],
}
</script>

<style lang="scss" scoped>
.subscription-plan-field {
  display: grid;
  gap: .5rem;

  span {
    font-size: .8em;
    color: $primary-ds-400;
  }
}
</style>