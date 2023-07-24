<template>
  <div class="sections-wrapper">
    <v-section>
      <nav class="sections-navigation">
        <button 
          v-for="(section, idx) in sections"
          :key="`section_${ section.id || idx }`" 
          class="sections-navigation__button" 
          :class="{ 'sections-navigation__button--active': idx === modelValue }"
          type="button"
          :disabled="loading && idx !== modelValue || isSearchQueryNonEmpty && !sectionsCounts[section.name]"
          @click="handleSelectSection(idx)"
        >
          <v-loader v-if="loading && idx === modelValue" />
          {{ section.name || section }}
          <span v-if="isSearchQueryNonEmpty && sectionsCounts[section.name]" class="sections-navigation__items-count">{{ sectionsCounts[section.name] }}</span>
        </button>
      </nav>
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
@import '@/assets/styles/Navigation/sections-navigation.scss';
</style>