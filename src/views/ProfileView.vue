<template>
  <sections-navigation v-model="selectedSection" :sections="sections" />
  <v-section responsive padded>
    <div class="profile-wrapper">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </v-section>
</template>

<script>
import SectionsNavigation from '@/components/Navigation/SectionsNavigation.vue';
import FormBlock from '@/components/FormBlock.vue';

export default {
  name: 'ProfileView',
  components: {
    SectionsNavigation,
    FormBlock,
  },
  created() {
    this.selectedSection = this.profileSections.findIndex(section => this.$route.path.includes(section));
  },
  beforeRouteUpdate(to) {
    this.selectedSection = this.profileSections.findIndex(section => to.path.includes(section));
  },
  data() {
    return {
      sections: ['Personal info', 'Payment info', 'Password and security', 'Localization', 'Notifications'],
      selectedSection: null,
      profileSections: ['personal', 'payment', 'password', 'localization', 'notifications'],
    };
  },
  watch: {
    selectedSection: {
      immediate: true,
      handler(val) {
        if (val === null) return;

        this.$router.push(`/profile/${ this.profileSections[val] }`);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.profile-wrapper {
  width: 100%;
}
</style>