<template>
  <sections-navigation v-model="selectedSection" :sections="sections" />
  <v-section responsive padded>
    <div class="profile-wrapper">
      <component :is="profileSections[selectedSection]" />
    </div>
  </v-section>
</template>

<script>
import { markRaw } from 'vue';

import SectionsNavigation from '@/components/Navigation/SectionsNavigation.vue';
import FormBlock from '@/components/FormBlock.vue';
import PersonalInfoForm from '@/components/Profile/Forms/PersonalInfoForm.vue';
import PaymentInfoForm from '@/components/Profile/Forms/PaymentInfoForm.vue';
import PasswordForm from '@/components/Profile/Forms/PasswordForm.vue';
import LocalizationForm from '@/components/Profile/Forms/LocalizationForm.vue';
import NotificationsForm from '@/components/Profile/Forms/NotificationsForm.vue';

const profileSections = [
  markRaw(PersonalInfoForm), 
  markRaw(PaymentInfoForm), 
  markRaw(PasswordForm),
  markRaw(LocalizationForm),
  markRaw(NotificationsForm),
];

export default {
  name: 'ProfileView',
  components: {
    SectionsNavigation,
    FormBlock,
  },
  data() {
    return {
      sections: ['Personal info', 'Payment info', 'Password and security', 'Localization', 'Notifications'],
      selectedSection: 0,
      profileSections: profileSections,
    };
  },
}
</script>
<style lang="scss" scoped>
.profile-wrapper {
  width: 100%;
}
</style>