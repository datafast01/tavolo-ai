<template>
  <div>
    <VCardText>
      <VForm class="mt-6" ref="contractDetails">
        <VRow>
          <VCol cols="12">
            <span class="text-subtitle-1">Contract Details</span>
          </VCol>
          <VCol cols="12">
            <VTextField v-model="contractDetails.title" :rules="[requiredValidator, alphaValidator]"
              label="Contract Title" />
          </VCol>

          <VCol cols="6">
            <VTextField v-model="contractDetails.dateOfAgreement" :rules="[requiredValidator]" label="Date of Agreement"
              type="date" />
          </VCol>
          <VCol cols="6">
            <v-select v-model="contractDetails.paymentPlan" :items="paymentPlans" :rules="[requiredValidator]"
              append-icon label="Payment Plan" item-value="key" item-title="text">

            </v-select>
          </VCol>

          <VCol cols="6">
            <VTextField v-model="contractDetails.startDate" :rules="[requiredValidator]" label="Start Date"
              type="date" />
          </VCol>

          <VCol cols="6">
            <VTextField v-model="contractDetails.endDate" :rules="[requiredValidator]" label="End Date" type="date" />
          </VCol>


        </VRow>
      </VForm>
    </VCardText>
    <div class="mt-6 d-flex justify-space-between">
      <VCardActions class="pa-0">

      </VCardActions>
      <v-btn color="primary" @click="completeContractDetails"> SAVE & CONTINUE </v-btn>
    </div>
  </div>
</template>

<script>
import pay3 from "@/assets/images/cards/pay11.png";
import pay2 from "@/assets/images/cards/pay12.png";
import pay4 from "@/assets/images/cards/pay13.png";
import pay1 from "@/assets/images/cards/pay14.png";
import { type } from "@/views/demos/components/alert/demoCodeAlert";
import {
  alphaValidator,
  emailValidator,
  lengthValidator,
  requiredValidator,
} from "@validators";

export default {
  props: {
    contractDetails: {
      type: Object
    }
  },
  data() {
    return {
      alphaValidator: alphaValidator,
      emailValidator: emailValidator,
      requiredValidator: requiredValidator,
      lengthValidator: lengthValidator,
      name: "",
      pay1: pay1,
      pay2: pay2,
      pay3: pay3,
      pay4: pay4,



      paymentPlans: [
        { text: "Basic - $40/Recording", key: "basic" },
        { text: "Popular - $75/ 2 Recordings", key: "popular" },
        { text: "Enterprise - $100 / 4 Recordings", key: "enterprise" },
      ],
    };
  },
  computed: {

  },

  methods: {
    async completeContractDetails() {
      const { valid } = await this.$refs.contractDetails.validate()

      if (valid) {
        this.$emit('nextStep')

      }

    }
  },
};
</script>

<style></style>
