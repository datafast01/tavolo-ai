<template>
  <div>
    <VCardText>
      <VForm class="mt-6" ref="businessDetails">
        <VRow>
          <VCol cols="12">
            <span class="text-subtitle-1">Your Business Details </span>
          </VCol>
          <VCol cols="12">
            <VTextField v-model="businessDetails.businessName" label="Business Name" Value="First"
              :rules="[requiredValidator, alphaValidator]" />
          </VCol>

          <VCol cols="12">
            <VTextField v-model="businessDetails.businessNumber" label="Contact Number"
              :rules="[requiredValidator, integerValidator]" />
          </VCol>

          <VCol cols="12">
            <VTextField v-model="businessDetails.businessEmail" class="" label="Email" type="email"
              :rules="[requiredValidator, emailValidator]" />
          </VCol>

          <VCol cols="12">
            <v-select v-model="businessDetails.socialAccount" :items="socialMedia" label="Social Account"
              item-value="key" item-title="name" persistent-hint :rules="[requiredValidator]"></v-select>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
    <div class="mt-6 d-flex justify-space-between">
      <VCardActions class="pa-0">
        <v-btn text @click="previousState"> Go Back </v-btn>
      </VCardActions>
      <v-btn color="primary" @click="completeBusinessDetails"> SAVE & CONTINUE </v-btn>
    </div>
  </div>
</template>

<script>
import {
  alphaValidator,
  emailValidator,
  integerValidator,
  lengthValidator,
  requiredValidator,
} from "@validators";
export default {
  props: {
    businessDetails: {
      type: Object
    }
  },
  data() {
    return {
      emailValidator: emailValidator,
      requiredValidator: requiredValidator,
      lengthValidator: lengthValidator,
      alphaValidator: alphaValidator,
      integerValidator: integerValidator,


      socialMedia: [
        {
          key: "instagram",
          name: "Instagram",
          icon: "mdi-instagram",
        },
        {
          key: "facebook",
          name: "Facebook",
          icon: "mdi-facebook",
        },
        {
          key: "tiktok",
          name: "TikTok",
          icon: "mdi-music-note",
        },
      ],
    };
  },
  methods: {
    async completeBusinessDetails() {
      const { valid } = await this.$refs.businessDetails.validate()

      if (valid) {
        this.$emit('nextStep')

      }
    },
    previousState() {
      this.$emit('previousState')
    }
  }
};
</script>
<style></style>
