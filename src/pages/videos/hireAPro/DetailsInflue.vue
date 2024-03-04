<template>
  <VCardText>
    <VForm class="mt-6">
      <VRow>
        <VCol cols="12">
          <span class="text-subtitle-1">Influencer Details</span>
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="influencerName"
            label="Name"
            Value="First"
            :rules="[requiredValidator]"
          />
        </VCol>

        <VCol cols="12">
          <VTextField
            v-model="contactNumber"
            label="Contact Number"
            type="email"
            :rules="[requiredValidator]"
          />
        </VCol>

        <VCol cols="12">
          <VTextField
            v-model="businessEmail"
            class=""
            label="Email"
            type="email"
            :rules="[requiredValidator, emailValidator]"
          />
        </VCol>

        <VCol cols="12">
          <v-select
            v-model="socialAccount"
            :items="socialMedia"
            item-title="name"
            item-value="key"
            label="Social Account"
            persistent-hint
            :rules="[requiredValidator]"
          ></v-select>
        </VCol>
      </VRow>
    </VForm>
  </VCardText>
</template>

<script>
import { emailValidator, requiredValidator } from "@validators";
export default {
  data() {
    return {
      requiredValidator: requiredValidator,
      emailValidator: emailValidator,
      firstName: "",
      contactNumber: "",
      businessEmail: "",
      socialAccount: null,

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
};
</script>
<style></style>
