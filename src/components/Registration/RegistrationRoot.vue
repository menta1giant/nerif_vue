<template>
  <v-section responsive padded>
    <div class="registration">
      <h2>Congratulations on joining Nerif!</h2>
      <registration-steps :active-step="activeStep"/>
      <component :is="steps[activeStep]" @change-step="activeStep++"/>
    </div>
  </v-section>
</template>
<script>
import PaymentStep from './PaymentStep.vue';
import InitialStep from './InitialStep.vue';
import FinalStep from './FinalStep.vue';

import RegistrationSteps from './RegistrationSteps.vue';

import { markRaw } from 'vue';

export default {
  name: 'RegistrationRoot',
  components: {
    RegistrationSteps,
  },
  data() {
    return {
      activeStep: 2,
      steps: [
        markRaw(InitialStep),
        markRaw(PaymentStep),
        markRaw(FinalStep),
      ]
    };
  },
}
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 1.5rem;
}
</style>