<template>
  <VCardText>
    <VForm class="mt-6">
      <VRow>
        <VCol cols="12">
          <span class="text-subtitle-1">Your Business Details </span>
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="businessName"
            label="Business Name"
            Value="First"
            :rules="[requiredValidator, alphaValidator, isNameValid]"
          />
        </VCol>

        <VCol cols="12">
          <VTextField
            v-model="businessNumber"
            label="Contact Number"
            :rules="[requiredValidator, integerValidator]"
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
            label="Social Account"
            item-value="key"
            item-title="name"
            persistent-hint
            :rules="[requiredValidator]"
          ></v-select>
        </VCol>
      </VRow>
    </VForm>
  </VCardText>
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
  data() {
    return {
      emailValidator: emailValidator,
      requiredValidator: requiredValidator,
      lengthValidator: lengthValidator,
      alphaValidator: alphaValidator,
      integerValidator: integerValidator,
      businessName: "",
      businessNumber: "",
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
  computed: {
    isNameValid() {
      return (value) =>
        lengthValidator(value, 1, 15) ||
        "Contract title must be 15 characters or less";
    },
  },
};
</script>
<style></style>
