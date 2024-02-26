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
            label="Contract Title"
            Value="First"
          />
        </VCol>

        <VCol cols="6">
          <VTextField v-model="lastNam" label="Date of Agreement" type="date" />
        </VCol>
        <VCol cols="6"> </VCol>

        <VCol cols="6">
          <VTextField v-model="email" class="" label="Start Date" type="date" />
        </VCol>

        <VCol cols="6">
          <VTextField v-model="restaurantName" label="End Date" type="date" />
        </VCol>

        <VCol cols="12">
          <v-select
            v-model="favorites"
            :items="states"
            label="Payment Plan"
          ></v-select>
        </VCol>

        <!-- <VCol cols="12" class="d-flex justify-space-between">
          <div class=""></div>
          <div>
            <RouterLink
              class="text-primary ms-2 mb-1"
              :to="{ name: 'pages-authentication-login-v2' }"
            >
              <VBtn @click="updateProfile">Save changes </VBtn>
            </RouterLink>
          </div>
        </VCol> -->
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
      favorites: [],
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
    };
  },
};
</script>
<style></style>
