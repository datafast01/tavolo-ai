<template>
  <Donepage v-if="isCompleted" />
  <Vue3MultiStepper
    v-else
    v-model:step="step"
    :tabs="tabs"
    primaryColor1="#9155FD"
    primaryColor2="##3D3759"
    :loading="loading"
    :finalize="handleFormSubmission"
    :validateStep="validateStep"
  >
    <template #1>
      <HiringInfluencerCopy />
    </template>
    <!-- <template #2>
      <DetailsInflue />
    </template> -->
    <template #2>
      <BusinessDetails />
    </template>
    <template #3>
      <ProjectsDetails />
    </template>
    <template #4>
      <PaymentMethod />
    </template>
    <!-- <template #6>
      <PaymentMethod />
    </template> -->
  </Vue3MultiStepper>
</template>

<script>
import BusinessDetails from "./BusinessDetails.vue";
import DetailsInflue from "./DetailsInflue.vue";
import HiringInfluencerCopy from "./HiringInfluencerCopy.vue";
import PaymentMethod from "./PaymentMethod.vue";
import ProjectsDetails from "./ProjectsDetails.vue";
import Vue3MultiStepper from "./Vue3MultiStepper.vue";

import Donepage from "./Donepage.vue";
export default {
  components: {
    Donepage,
    Vue3MultiStepper,
    HiringInfluencerCopy,
    DetailsInflue,
    BusinessDetails,
    ProjectsDetails,
    PaymentMethod,
  },
  name: "App",
  data() {
    return {
      step: 1,
      loading: false,
      isCompleted: false,
      // NB: Use computed properties just in case you feel like using translations (e.g this.$t)
    };
  },
  methods: {
    async handleFormSubmission() {
      this.loading = true;
      setTimeout(() => {
        this.isCompleted = true;
      }, 2000);
    },

    validateStep(step) {
      // Perform validation based on the current step
      // Return true if the step is valid, otherwise return false
      if (step === 1) {
        return this.step1Check();
      } else if (step === 2) {
        return this.step2Check();
      } else if (step === 3) {
        return this.step3Check();
      } else if (step === 4) {
        return this.step4Check();
      }

      return true; // Default to true if no validation is implemented
    },

    step1Check() {
      return true;
    },

    step2Check() {
      return true;
    },

    step3Check() {
      return true;
    },

    step4Check() {
      return true;
    },

    step5Check() {
      return true;
    },
  },
};
</script>

<style scoped>
.br {
  margin-top: 1rem;
  border-radius: 10px;
}
::v-deep .v-card-text {
  padding: 0px !important;
}
</style>
