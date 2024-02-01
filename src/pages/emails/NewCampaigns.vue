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
      <v-spacer></v-spacer>
      <VCol cols="12" md="4">
        <div class="float-right">
          <VBtn size="large" @click="templatedSelected">
            {{ isTemplate ? "Send" : "Next" }}
          </VBtn>
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
