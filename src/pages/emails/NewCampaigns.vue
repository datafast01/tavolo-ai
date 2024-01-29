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
          <VBtn size="large" @click="templatedSelected"> Next </VBtn>
        </div>
      </VCol>
    </VRow>
    <div class="mt-6" v-if="!isTemplate">
      <EmailTemplates />
    </div>
    <div class="mt-6" v-else>
      <ComposeEmail />
    </div>
  </div>
</template>

<script>
import ComposeEmail from "./components/ComposeEmail.vue";
import EmailTemplates from "./components/EmailTemplates.vue";

export default {
  components: { EmailTemplates, ComposeEmail },
  data() {
    return {
      isTemplate: false,
    };
  },
  methods: {
    templatedSelected() {
      this.isTemplate = true;
    },
  },
};
</script>

<style></style>
