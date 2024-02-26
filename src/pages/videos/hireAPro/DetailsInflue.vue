<template>
  <VCardText>
    <VForm class="mt-6">
      <VRow>
        <VCol cols="12">
          <span class="text-subtitle-1">Influencer Details</span>
        </VCol>
        <VCol cols="12">
          <VTextField v-model="firstName" label="Name" Value="First" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="number" label="Contact Number" type="email" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="email" class="" label="Email" type="email" />
        </VCol>

        <VCol cols="12">
          <v-select
            v-model="favorites"
            :items="states"
            label="Social Account"
            multiple
            persistent-hint
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
export default {
  data() {
    return {
      firstName: "loram",
      number: "+1 (613) 353-3096",
      email: "loremipsum@gmail.com",
      social: "loram",
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
