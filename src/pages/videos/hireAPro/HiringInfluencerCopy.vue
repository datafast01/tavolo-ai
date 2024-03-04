<template>
  <VCardText>
    <VForm class="mt-6">
      <VRow>
        <VCol cols="12">
          <span class="text-subtitle-1">Contract Details</span>
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="contractTitle"
            :rules="[requiredValidator]"
            label="Contract Title"
          />
        </VCol>

        <VCol cols="6">
          <VTextField
            v-model="dateOfAgreement"
            :rules="[requiredValidator]"
            label="Date of Agreement"
            type="date"
          />
        </VCol>
        <VCol cols="6"> </VCol>

        <VCol cols="6">
          <VTextField
            v-model="startDate"
            :rules="[requiredValidator]"
            label="Start Date"
            type="date"
          />
        </VCol>

        <VCol cols="6">
          <VTextField
            v-model="endDate"
            :rules="[requiredValidator]"
            label="End Date"
            type="date"
          />
        </VCol>

        <VCol cols="12">
          <v-select label="User" :items="items" item-title="name">
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props">
                <template v-slot:prepend>
                  <v-icon> {{ item.raw.icon }}</v-icon>
                </template>
              </v-list-item>
            </template>
          </v-select>
          <!-- <v-select
            v-model="paymentPlan"
            :items="paymentPlans"
            :rules="[requiredValidator]"
            append-icon
            label="Payment Plan"
            item-value="key"
            item-title="text"
          >
             <template v-slot:item="{ item }">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :value="item"
                color="primary"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>

                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item>
            </template> -->
          <!-- </v-select> -->
        </VCol>
      </VRow>
    </VForm>
  </VCardText>
</template>

<script>
import pay3 from "@/assets/images/cards/pay11.png";
import pay2 from "@/assets/images/cards/pay12.png";
import pay4 from "@/assets/images/cards/pay13.png";
import pay1 from "@/assets/images/cards/pay14.png";
import { emailValidator, requiredValidator } from "@validators";

export default {
  data() {
    return {
      emailValidator: emailValidator,
      requiredValidator: requiredValidator,

      pay1: pay1,
      pay2: pay2,
      pay3: pay3,
      pay4: pay4,
      contractTitle: "",
      dateOfAgreement: null,
      startDate: null,
      endDate: null,
      paymentPlan: null,

      paymentPlans: [
        { text: "Basic - $40/Recording", key: "basic" },
        { text: "Popular - $75/ 2 Recordings", key: "popular" },
        { text: "Enterprise - $100 / 4 Recordings", key: "enterprise" },
      ],
    };
  },

  methods: {},
};
</script>

<style></style>
