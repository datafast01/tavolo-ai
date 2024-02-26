<template>
  <Vue3MultiStepper
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
    <template #2>
      <DetailsInflue />
    </template>
    <template #3>
      <BusinessDetails />
    </template>
    <template #4>
      <ProjectsDetails />
    </template>
    <template #5>
      <PaymentMethod />
    </template>
    <!-- <template #6>
      <PaymentMethod />
    </template> -->
  </Vue3MultiStepper>
</template>

<script>
import { computed } from "vue";
import BusinessDetails from "./BusinessDetails.vue";
import DetailsInflue from "./DetailsInflue.vue";
import HiringInfluencerCopy from "./HiringInfluencerCopy.vue";
import PaymentMethod from "./PaymentMethod.vue";
import ProjectsDetails from "./ProjectsDetails.vue";
import Vue3MultiStepper from "./Vue3MultiStepper.vue";
export default {
  components: {
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
      // NB: Use computed properties just in case you feel like using translations (e.g this.$t)
      tabs: computed(() => {
        return [
          {
            title: "Company",
            iconSuccess: null,
            isValid: true,
          },
          {
            title: "Company Additional Info",
            iconSuccess: null,
            isValid: true,
          },
          {
            title: "Employees",
            iconSuccess: null,
            isValid: true,
          },

          {
            title: "Your Details",
            iconSuccess: null,
            isValid: true,
          },
          {
            title: "Verification",
            iconSuccess: null,
            isValid: true,
          },
        ];
      }),
      details: [
        {
          nextText: "ABOUT",
        },
        {
          nextText: "PROFESSION",
        },
        {
          nextText: "EDUCATION",
        },
      ],
    };
  },
  methods: {
    async handleFormSubmission() {
      this.loading = true;

      // After 2 seconds, reload the page and start the flow again
      setTimeout(() => {
        location.reload();
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
      } else if (step === 5) {
        return this.step5Check();
      }

      return true; // Default to true if no validation is implemented
    },

    /**
     * The `step1Check()` function is responsible for performing a check or validation and returning a boolean value.
     * If the returned value is `true`, it indicates that the check has passed successfully, allowing the code to proceed to the next step in the JavaScript execution flow.
     *
     * This function is commonly used in multi-step processes or conditional branching scenarios. It helps determine whether the conditions required for the next step to be executed have been met.
     *
     * The implementation details of the check performed in `step1Check()` may vary depending on the specific requirements of the software being developed. It could involve verifying certain data, validating user input, or checking the state of the application.
     *
     * Upon receiving a `true` result from `step1Check()`, the calling code can safely proceed to execute the subsequent steps or perform further actions. If `false` is returned, it indicates that the check failed, and appropriate actions can be taken to handle the failed condition.
     *
     * It is important to note that this function plays a crucial role in determining whether the code can progress to the next step based on the successful completion of a specific check or condition.
     *
     * @returns {boolean} - `true` if the check succeeds, allowing the code to proceed to the next step; `false` if the check fails, indicating the need for alternative actions.
     */
    step1Check() {
      return true;
    },
    /**
     * The `step2Check()` function is responsible for performing a check or validation and returning a boolean value.
     * If the returned value is `true`, it indicates that the check has passed successfully, allowing the code to proceed to the next step in the JavaScript execution flow.
     *
     * This function is commonly used in multi-step processes or conditional branching scenarios. It helps determine whether the conditions required for the next step to be executed have been met.
     *
     * The implementation details of the check performed in `step2Check()` may vary depending on the specific requirements of the software being developed. It could involve verifying certain data, validating user input, or checking the state of the application.
     *
     * Upon receiving a `true` result from `step2Check()`, the calling code can safely proceed to execute the subsequent steps or perform further actions. If `false` is returned, it indicates that the check failed, and appropriate actions can be taken to handle the failed condition.
     *
     * It is important to note that this function plays a crucial role in determining whether the code can progress to the next step based on the successful completion of a specific check or condition.
     *
     * @returns {boolean} - `true` if the check succeeds, allowing the code to proceed to the next step; `false` if the check fails, indicating the need for alternative actions.
     */
    step2Check() {
      return true;
    },
    /**
     * The `step3Check()` function is responsible for performing a check or validation and returning a boolean value.
     * If the returned value is `true`, it indicates that the check has passed successfully, allowing the code to proceed to the next step in the JavaScript execution flow.
     *
     * This function is commonly used in multi-step processes or conditional branching scenarios. It helps determine whether the conditions required for the next step to be executed have been met.
     *
     * The implementation details of the check performed in `step3Check()` may vary depending on the specific requirements of the software being developed. It could involve verifying certain data, validating user input, or checking the state of the application.
     *
     * Upon receiving a `true` result from `step3Check()`, the calling code can safely proceed to execute the subsequent steps or perform further actions. If `false` is returned, it indicates that the check failed, and appropriate actions can be taken to handle the failed condition.
     *
     * It is important to note that this function plays a crucial role in determining whether the code can progress to the next step based on the successful completion of a specific check or condition.
     *
     * @returns {boolean} - `true` if the check succeeds, allowing the code to proceed to the next step; `false` if the check fails, indicating the need for alternative actions.
     */
    step3Check() {
      return true;
    },

    /**
     * The `step4Check()` function is responsible for performing a check or validation and returning a boolean value.
     * If the returned value is `true`, it indicates that the check has passed successfully, allowing the code to proceed to the next step in the JavaScript execution flow.
     *
     * This function is commonly used in multi-step processes or conditional branching scenarios. It helps determine whether the conditions required for the next step to be executed have been met.
     *
     * The implementation details of the check performed in `step4Check()` may vary depending on the specific requirements of the software being developed. It could involve verifying certain data, validating user input, or checking the state of the application.
     *
     * Upon receiving a `true` result from `step4Check()`, the calling code can safely proceed to execute the subsequent steps or perform further actions. If `false` is returned, it indicates that the check failed, and appropriate actions can be taken to handle the failed condition.
     *
     * It is important to note that this function plays a crucial role in determining whether the code can progress to the next step based on the successful completion of a specific check or condition.
     *
     * @returns {boolean} - `true` if the check succeeds, allowing the code to proceed to the next step; `false` if the check fails, indicating the need for alternative actions.
     */
    step4Check() {
      return true;
    },
    /**
     * The `step5Check()` function is responsible for performing a check or validation and returning a boolean value.
     * If the returned value is `true`, it indicates that the check has passed successfully, allowing the code to proceed to the next step in the JavaScript execution flow.
     *
     * This function is commonly used in multi-step processes or conditional branching scenarios. It helps determine whether the conditions required for the next step to be executed have been met.
     *
     * The implementation details of the check performed in `step5Check()` may vary depending on the specific requirements of the software being developed. It could involve verifying certain data, validating user input, or checking the state of the application.
     *
     * Upon receiving a `true` result from `step5Check()`, the calling code can safely proceed to execute the subsequent steps or perform further actions. If `false` is returned, it indicates that the check failed, and appropriate actions can be taken to handle the failed condition.
     *
     * It is important to note that this function plays a crucial role in determining whether the code can progress to the next step based on the successful completion of a specific check or condition.
     *
     * @returns {boolean} - `true` if the check succeeds, allowing the code to proceed to the next step; `false` if the check fails, indicating the need for alternative actions.
     */
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
