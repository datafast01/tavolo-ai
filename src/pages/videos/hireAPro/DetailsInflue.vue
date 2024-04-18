<template>
  <div>


    <VCardText>
      <VForm class="mt-6" ref="influencerDetails">
        <VRow>
          <VCol cols="12">
            <span class="text-subtitle-1">Influencer Details</span>
          </VCol>
          <VCol cols="12">
            <VTextField v-model="influencerDetails.name" label="Name" Value="First" :rules="[requiredValidator]" />
          </VCol>

          <VCol cols="12">
            <VTextField v-model="influencerDetails.contactNumber" label="Contact Number" type="email"
              :rules="[requiredValidator]" />
          </VCol>

          <VCol cols="12">
            <VTextField v-model="influencerDetails.email" class="" label="Email" type="email"
              :rules="[requiredValidator, emailValidator]" />
          </VCol>

          <VCol cols="12">
            <v-select v-model="influencerDetails.socialAccount" :items="socialMedia" item-title="name" item-value="key"
              label="Social Account" persistent-hint :rules="[requiredValidator]"></v-select>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
    <div class="mt-6 d-flex justify-space-between">
      <VCardActions class="pa-0">
        <v-btn text @click="previousState"> Go Back </v-btn>
      </VCardActions>
      <div class="d-flex">

        <v-btn color="primary" @click="completeInfluencerDetails"> SAVE & CONTINUE </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { emailValidator, requiredValidator } from "@validators";
export default {
  props: {
    influencerDetails: {
      type: Object
    }
  },
  data() {
    return {
      requiredValidator: requiredValidator,
      emailValidator: emailValidator,


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
    async completeInfluencerDetails() {
      const { valid } = await this.$refs.influencerDetails.validate()

      if (valid) {
        this.$emit('nextStep')

      }

    },
    previousState() {
      this.$emit('previousState')
    }
  },
};
</script>
<style></style>
