<template>
  <div>
    <VRow>
      <VCol cols="12" md="1" v-if="isTemplate">
        <VBtn size="large" @click="isTemplate = !isTemplate"> Back </VBtn>
      </VCol>
      <VCol cols="12" md="4">
        <v-text-field
          label="Search Template"
          append-inner-icon="mdi-magnify"
          variant="solo-filled"
        ></v-text-field>
      </VCol>
      <VCol cols="12" md="2">
        <VBtn size="large" v-if="isTemplate" @click="showModalGpt">
          Magic Button
        </VBtn>
      </VCol>
      <v-spacer></v-spacer>
      <VCol cols="12" md="4">
        <div class="float-right">
          <VBtn size="large" @click="templatedSelected" v-if="!isTemplate">
            Next
          </VBtn>
          <VBtn size="large" @click="sendCampaign" v-else> Send </VBtn>
        </div>
      </VCol>
    </VRow>

    <div class="mt-6" v-if="!isTemplate">
      <EmailTemplates ref="emailTemplate" />
    </div>
    <div class="mt-6" v-else>
      <ComposeEmail :emailContent="selectedTemplate" ref="composeEmail" />
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
      selectedCategory: null,
      selectedTemplate: null,
      emailContent: {},
    };
  },
  methods: {
    templatedSelected() {
      this.selectedCategory = this.$refs.emailTemplate.currentCategory;
      this.selectedTemplate = this.$refs.emailTemplate.currentTemplate;
      if (this.selectedCategory == null || this.selectedTemplate == null) {
        alert("select tempalte and category");
        return;
      } else {
        // this.emailContent = this.$refs.emailTemplate.emailContent;
        this.isTemplate = true;
      }
    },
    showModalGpt() {
      this.$refs.composeEmail.showModalGpt = true;
    },
    sendCampaign() {
      this.$refs.composeEmail.sendEmail();
    },
  },
};
</script>

<style></style>
