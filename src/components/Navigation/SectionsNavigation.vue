<template>
  <div class="sections-wrapper">
    <v-section>
      <div class="sections-navigation">
        <button 
          v-for="(section, idx) in sections"
          :key="`section_${ section.id || idx }`" 
          class="sections-navigation__button" 
          :class="{ 'sections-navigation__button--active': idx === modelValue, 'sections-navigation__button--disabled': isSearchQueryNonEmpty && !sectionsCounts[section.name] }"
          type="button"
          @click="handleSelectSection(idx)"
        >
          <v-loader v-if="loading && idx === modelValue" />
          {{ section.name || section }}
          <span v-if="isSearchQueryNonEmpty && sectionsCounts[section.name]" class="sections-navigation__items-count">{{ sectionsCounts[section.name] }}</span>
        </button>
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
    sectionsCounts: Object,
    loading: Boolean,
  },
  computed: {
    isSearchQueryNonEmpty() {
      return !!this.$route.query.search;
    },
  },
  methods: {
    handleSelectSection(idx) {
      if (
        this.isSearchQueryNonEmpty && !this.sectionsCounts[this.sections[idx].name] ||
        this.loading
      ) return;

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

  &__button {
    display: flex;
    align-items: center;
    gap: .5rem;

    padding: 1rem .5rem;
    background: $primary-s-50;

    color: $primary-ds-600;
    font-weight: $fw-medium;
    white-space: nowrap;

    cursor: pointer;
    
    &--disabled {
      color: $primary-s-100;

      cursor: default;
    }

    &--active {
      color: $primary-s-600;
      font-weight: $fw-semi-bold;
      border-bottom: 2px solid $primary-s-400;

      cursor: default;
    }
  }

  &__items-count {
    padding: 0 .5rem;
    background: rgba($primary-s-300, .3);
    border-radius: $border-radius-small;
    text-align: center;
  }

  @media screen and (max-width: $mobile-breakpoint) {
    padding: 0 1rem;
  }
}
</style>