<template>
  <VCardText>
    <VForm class="mt-6">
      <VRow>
        <VCol cols="12">
          <span class="text-subtitle-1">Projects Details</span>
        </VCol>
        <VCol cols="12">
          <VTextField v-model="firstName" label="Title" Value="First" />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="firstName" label="Description" type="data" />
        </VCol>
        <VCol cols="12 py-2">
          <span class="text-subtitle-1">Target Audience</span>
        </VCol>
        <VCol cols="6">
          <v-select
            v-model="favorites"
            :items="states"
            label="Gender"
            multiple
            persistent-hint
          ></v-select>
        </VCol>

        <VCol cols="6">
          <v-select
            v-model="favorites"
            :items="states"
            label="Age"
            multiple
            persistent-hint
          ></v-select>
        </VCol>

        <VCol cols="12">
          <VTextField
            v-model="firstName"
            label="Campaign Goals"
            Value="First"
          />
        </VCol>

        <VCol cols="12">
          <VTextField v-model="firstName" label="Key Points" type="data" />
        </VCol>
      </VRow>
    </VForm>
  </VCardText>
</template>

<script>
export default {
  data() {
    return {
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
