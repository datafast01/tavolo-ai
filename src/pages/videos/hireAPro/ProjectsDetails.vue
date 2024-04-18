<template>
  <div>
    <VCardText>
      <VForm class="mt-6" ref="projectDetails">
        <VRow>
          <VCol cols="12">
            <span class="text-subtitle-1">Projects Details</span>
          </VCol>
          <VCol cols="12">
            <VTextField v-model="projectDetails.projectTitle" label="Project Title" Value="First"
              :rules="[requiredValidator]" />
          </VCol>

          <VCol cols="12">
            <VTextField v-model="projectDetails.description" label="Description" type="data"
              :rules="[requiredValidator]" />
          </VCol>
          <VCol cols="12 py-2">
            <span class="text-subtitle-1">Target Audience</span>
          </VCol>
          <VCol cols="6">
            <v-select v-model="targetAudience.gender" :items="genders" item-title="name" item-value="key" label="Gender"
              persistent-hint :rules="[requiredValidator]"></v-select>
          </VCol>

          <VCol cols="6">
            <v-select v-model="targetAudience.ageGroup" :items="ageGroups" item-title="name" item-value="key"
              label="Age Group" :rules="[requiredValidator]" persistent-hint></v-select>
          </VCol>

          <VCol cols="12">
            <VTextField v-model="targetAudience.campaignGoals" label="Campaign Goals" :rules="[requiredValidator]"
              Value="First" />
          </VCol>

          <VCol cols="12">
            <VTextField v-model="targetAudience.keyPoints" :rules="[requiredValidator]" label="Key Points"
              type="data" />
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
    <div class="mt-6 d-flex justify-space-between">
      <VCardActions class="pa-0">
        <v-btn text @click="previousState"> Go Back </v-btn>
      </VCardActions>
      <div class="d-flex">

        <v-btn color="primary" @click="completeProjectDetails"> SAVE & CONTINUE </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { emailValidator, requiredValidator } from "@validators";

export default {
  props: {
    projectDetails: {
      type: Object
    },
    targetAudience: {
      type: Object
    }
  },
  data() {
    return {
      requiredValidator: requiredValidator,
      emailValidator: emailValidator,


      genders: [
        {
          key: "male",
          name: "Male",
        },
        {
          key: "female",
          name: "Female",
        },
        {
          key: "other",
          name: "Other",
        },
      ],
      ageGroups: [
        {
          key: ">18",
          name: "Less than 18",
        },
        {
          key: "<18",
          name: "Greater than 18",
        },
      ],
    };
  },
  methods: {
    async completeProjectDetails() {
      const { valid } = await this.$refs.projectDetails.validate()

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
