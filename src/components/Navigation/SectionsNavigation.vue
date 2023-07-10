<template>
  <div class="sections-wrapper">
    <v-section>
      <div class="sections-navigation">
        <div 
          v-for="(section, idx) in sections"
          :key="`section_${ idx }`" 
          class="sections-navigation__item" 
          :class="{ 'sections-navigation__item--active': idx === modelValue }"
          @click="handleSelectSection(idx)"
        >
          {{ section }}
        </div>
      </div>
    </v-section>
  </div>
</template>

<script>
export default {
  name: 'SectionsNavigation',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    sections: Array,
  },
  methods: {
    handleSelectSection(idx) {
      this.$emit('update:modelValue', idx);
    }
  }
}
</script>

<style lang="scss" scoped>
.sections-wrapper {
  width: 100%;
  background: $primary-s-50;
  border-top: 1px solid $primary-ds-100;
  border-bottom: 1px solid $primary-ds-100;

  *::-webkit-scrollbar {
    display: none;
  }
}

.sections-navigation {
  position: relative;

  display: flex;
  gap: 1rem;
  
  width: 100%;

  overflow-x: auto;
  scrollbar-width: none;

  &__item {
    padding: 1rem .5rem;
    background: $primary-s-50;

    color: $primary-ds-600;
    font-weight: $fw-medium;
    white-space: nowrap;

    cursor: pointer;
    
    &--active {
      color: $primary-s-600;
      font-weight: $fw-semi-bold;
      border-bottom: 2px solid $primary-s-400;

      cursor: default;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    padding: 0 1rem;
  }
}
</style>