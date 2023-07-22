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
.subscription-plan-option {
  display: grid;
  flex-basis: 100%;

  &__description {
    @include flex-column;
    align-items: center;

    width: 100%;
    padding: 1rem .5rem;

    background: $black-40;
    border-radius: $border-radius-large;
    box-shadow: 0 0 0 1px $primary-s-100;

    cursor: pointer;

    &:focus {
      box-shadow: 0 0 0 2px $primary-s-100;
    }

    ul {
      @include flex-column;

      list-style: none;
      padding: 0 1em;
      margin-top: .5rem;

      color: $primary-s-800;
    }

    ul li::before {
      content: "\2022";
      color: $accent-500; 
      font-weight: $fw-bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }

  &__title {
    @include text-large;
    color: $primary-s-700;
    font-weight: $fw-semi-bold;
    font-family: $ff-display;
  }

  &__price {
    text-align: center;
    margin-block: .5rem;
    font-weight: $fw-medium;
  }

  &--active {
    cursor: default;

    .subscription-plan-option__description {
      box-shadow: 0 0 0 2px $accent-500;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    &--active {
      .subscription-plan-option__header {
        @include divider-bottom;

        padding-bottom: .5rem;
        margin-bottom: .5rem;
      }
    }

    &__description {
      padding: .75rem 1rem;
      align-items: flex-start;
    }

    &__header {
      width: 100%;

      display: grid;
      grid-template-rows: 1fr auto;
      grid-auto-flow: column;

      &-chevron {
        grid-row: span 2;
        align-self: center;
        justify-content: flex-end;
      }
    }
  }
}
</style>