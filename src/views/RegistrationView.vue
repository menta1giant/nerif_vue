<template>
  <v-section responsive padded>
    <div class="registration">
      <h1 class="h2 header-common">Congratulations on joining Nerif!</h1>
      <registration-steps :active-step="activeStep"/>
      <component :is="steps[activeStep]" @change-step="activeStep++"/>
    </div>
  </v-section>
  <leave-sign-up-modal v-model="isLeavingSignUpModalShown" @confirm="continueLeaving" />
</template>
<script>
import PaymentStep from '@/components/Registration/PaymentStep.vue';
import InitialStep from '@/components/Registration/InitialStep.vue';
import FinalStep from '@/components/Registration/FinalStep.vue';
import LeaveSignUpModal from '@/components/Registration/LeaveSignUpModal.vue';
import RegistrationSteps from '@/components/Registration/RegistrationSteps.vue';

import { markRaw } from 'vue';
import userInfoMixin from '@/components/mixins/userInfoMixin.js';

export default {
  name: 'RegistrationView',
  components: {
    RegistrationSteps,
    LeaveSignUpModal
  },
  mixins: [userInfoMixin],
  beforeRouteLeave(to) {
    if (!this.isUserAuthenticated || this.isLeavingSignUpModalShown || to.path.includes('profile')) return true;

    this.leavingTo = to;
    this.isLeavingSignUpModalShown = true;
    return false;
  },
  created() {
    if (this.isUserAuthenticated) this.$router.push('/');
  },
  data() {
    return {
      activeStep: 0,
      steps: [
        markRaw(InitialStep),
        markRaw(PaymentStep),
        markRaw(FinalStep),
      ],

      leavingTo: null,
      isLeavingSignUpModalShown: false,
    };
  },
  watch: {
    isUserAuthenticated(val) {
      if (!val && this.activeStep !== 0) {
        this.$router.replace({ name: 'root', query: { 'log-in': 1 } });
      }
    },
  },
  methods: {
    continueLeaving() {
      this.$router.push(this.leavingTo);
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Registration/registration.scss';
</style>