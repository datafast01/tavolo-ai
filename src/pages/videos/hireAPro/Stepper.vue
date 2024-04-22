<template>
  <!-- <v-card variant="tonal"> -->
  <div>
    <Donepage v-if="isCompleted" />
    <v-stepper v-model="e1" v-else>
      <v-stepper-header>
        <v-stepper-item title="Contract Details" :complete="e1 > 0" value="1">
        </v-stepper-item>

        <v-divider></v-divider>



        <v-stepper-item title="Your Business Details " :complete="e1 > 1" value="2"></v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item title="Project Details " :complete="e1 > 2" value="3"></v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item title="Payment Details " :complete="e1 > 3" value="4"></v-stepper-item>

      </v-stepper-header>
      <v-stepper-window>
        <div class="px-5">
          <v-stepper-window-item value="1">
            <ContractDetails @nextStep="completeStep" :contractDetails="contractDetails" />

          </v-stepper-window-item>
        </div>

        <div class="px-5">
          <v-stepper-window-item value="2">
            <BusinessDetails @nextStep="completeStep" @previousState="previousStep"
              :businessDetails="businessDetails" />

          </v-stepper-window-item>
        </div>
        <div class="px-5">
          <v-stepper-window-item value="3">
            <ProjectsDetails @nextStep="completeStep" @previousState="previousStep" :projectDetails="projectDetails"
              :targetAudience='targetAudience' />


          </v-stepper-window-item>
        </div>
        <div class="px-5">
          <v-stepper-window-item value="4">
            <PaymentDetails @submitDetails="submitDetails" @previousState="previousStep"
              :paymentDetails="paymentDetails" />
            <div class="mt-6 d-flex justify-space-between">
              <VCardActions class="pa-0">
                <v-btn text @click="previousStep"> Go Back </v-btn>
              </VCardActions>
              <div class="d-flex">

                <v-btn color="primary" @click="submitDetails()" :loading="loading"> Confirm & pay </v-btn>
              </div>
            </div>
          </v-stepper-window-item>
        </div>
      </v-stepper-window>
    </v-stepper>
  </div>

  <!-- </v-card> -->
</template>

<script>
import BusinessDetails from "./BusinessDetails.vue";
// import DetailsInflue from "./DetailsInflue.vue";
import ContractDetails from "./ContractDetails.vue";
import PaymentDetails from "./PaymentDetails.vue";
import ProjectsDetails from "./ProjectsDetails.vue";


import Donepage from "./Donepage.vue";
import axios from "@axios";
import { useToast } from "vue-toastification";

export default {
  components: {
    Donepage,

    ContractDetails,
    // DetailsInflue,
    BusinessDetails,
    ProjectsDetails,
    PaymentDetails,

  },
  name: "App",
  data() {
    return {
      toast: useToast(),
      step: 1,
      loading: false,
      isCompleted: false,
      e1: 0,
      contractDetails: {
        title: '',
        dateOfAgreement: '',
        paymentPlan: '',
        startDate: '',
        endDate: ''
      },

      businessDetails: {
        businessName: "",
        businessNumber: "",
        businessEmail: "",
        socialAccount: null,
      },
      projectDetails: {
        description: "",
        title: "",
      },
      targetAudience: {
        keyPoints: "",
        campaignGoals: "",
        ageGroup: null,

        gender: null,
      },
      paymentDetails: {
        cardType: "visa",
        ccv: "",
        date: "",
        cardNumber: "",
        cardHolderName: "",
        saveCard: false
      }
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
    completeStep() {

      this.e1 += 1
    },
    previousStep() {
      this.e1 -= 1
    },
    submitDetails() {


      let payload = {
        influencerId: this.$route.params.id,
        contractDetails: this.contractDetails,
        businessDetails: this.businessDetails,
        paymentMethod: this.paymentDetails,
        projectDetails: this.projectDetails,
        targetAudience: this.targetAudience,

      }
      console.log(payload)
      this.loading = true,
        axios
          .post(
            `influencer/hire`, payload
          )
          .then((response) => {
            console.log("user", response.data);
            this.loading = false
            this.isCompleted = true;
            this.toast.success("Your requst has been sent!");
          })
          .catch((err) => {
            console.log(err.response.status);
            this.toast.error(err.response.status);
            this.loading = false
          });


    }




  },
  mounted() {
    console.log(this.$route.params.id)
  }
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
