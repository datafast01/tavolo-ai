<template>
  <div>
    <VRow>
      <VCol cols="12" md="4">
        <v-select
          label="Select Template"
          :items="[
            'California',
            'Colorado',
            'Florida',
            'Georgia',
            'Texas',
            'Wyoming',
          ]"
          variant="solo-filled"
          dense
        ></v-select>
      </VCol>
      <VCol cols="12" md="4">
        <v-text-field
          label="Search Template"
          append-inner-icon="mdi-magnify"
          variant="solo-filled"
        ></v-text-field>
      </VCol>
      <VCol cols="12" md="4">
        <div class="float-right">
          <VBtn size="large"> Send </VBtn>
        </div>
      </VCol>
    </VRow>
    <div class="mt-6">
      <v-card>
        <v-card-item>
          <v-card-title>Select A Template</v-card-title>

          <v-card-subtitle
            >What kind of email template would you like to
            send?</v-card-subtitle
          >
        </v-card-item>

        <v-card-text>
          <EmailTemplates />
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import EmailTemplates from "./components/EmailTemplates.vue";
export default {
  components: { EmailTemplates },
};
</script>

<style></style>
