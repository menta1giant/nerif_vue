<template>
  <v-section responsive padded>
    <div class="registration">
      <h1 class="h2 text-bold">Congratulations on joining Nerif!</h1>
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
    if (this.isFirstStep || this.isLeavingSignUpModalShown || to.path.includes('profile')) return true;

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
  computed: {
    isFirstStep() {
      return this.activeStep === 0;
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
.registration {
  @include flex-column;
  gap: .5rem;

  max-width: 100%;

  > :first-child {
    margin-bottom: 1rem;
  }
}
</style>