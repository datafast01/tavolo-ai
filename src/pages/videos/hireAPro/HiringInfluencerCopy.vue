<template>
  <VCardText>
    <VForm class="mt-6">
      <VRow>
        <VCol cols="12">
          <span class="text-subtitle-1">Contract Details</span>
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="firstName"
            :rules="nameRules"
            label="Contract Title"
          />
        </VCol>

        <VCol cols="6">
          <VTextField
            v-model="dateOfAgreement"
            :rules="dateRules"
            label="Date of Agreement"
            type="date"
          />
        </VCol>
        <VCol cols="6"> </VCol>

        <VCol cols="6">
          <VTextField
            v-model="startDate"
            :rules="dateRules"
            label="Start Date"
            type="date"
          />
        </VCol>

        <VCol cols="6">
          <VTextField
            v-model="endDate"
            :rules="dateRules"
            label="End Date"
            type="date"
          />
        </VCol>

        <VCol cols="12">
          <v-select
            v-model="paymentPlan"
            :items="items"
            :rules="paymentPlanRules"
            append-icon
            label="Payment Plan"
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
            </template>
          </v-select>
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

export default {
  data() {
    return {
      pay1: pay1,
      pay2: pay2,
      pay3: pay3,
      pay4: pay4,
      firstName: "loram",
      dateOfAgreement: null,
      startDate: null,
      endDate: null,
      paymentPlan: null,
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
      ],
      nameRules: [
        (v) => !!v || "Contract Title is required",
        (v) =>
          (v && v.length <= 20) ||
          "Contract Title must be less than 50 characters",
      ],
      dateRules: [(v) => !!v || "Date is required"],
      paymentPlanRules: [(v) => !!v || "Payment Plan is required"],
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" },
      ],
    };
  },

  methods: {
    getIconForState(state) {
      // You can implement your logic here to return different icons based on the state
      return [
        {
          title: "mdi-account",
          iconSuccess: Alabama,
          isValid: true,
        },
        {
          title: "mdi-account",
          iconSuccess: Alabama,
          isValid: true,
        },

        // "mdi-account",
      ]; // Replace "mdi-account" with the icon you want to use
    },
  },
};
</script>

<style></style>
