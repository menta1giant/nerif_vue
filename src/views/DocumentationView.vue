<template>
  <sections-navigation v-model="selectedSection" :sections="sections" />
  <v-section responsive>
  </v-section>
</template>

<script>
import SectionsNavigation from '@/components/Navigation/SectionsNavigation.vue';

export default {
  name: 'DocumentationView',
  components: {
    SectionsNavigation,
  },
  data() {
    return {
      sections: ['General questions', 'Payment', 'Telegram feed', 'Personalized dashboards', 'Customer support', 'Special features'],
      selectedSection: 0,
    };
  },
}
</script>