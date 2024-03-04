<template>
  <VCardText>
    <VForm class="mt-6">
      <VRow>
        <VCol cols="12">
          <span class="text-subtitle-1">Projects Details</span>
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="projectTitle"
            label="Project Title"
            Value="First"
            :rules="[requiredValidator]"
          />
        </VCol>

        <VCol cols="12">
          <VTextField
            v-model="description"
            label="Description"
            type="data"
            :rules="[requiredValidator]"
          />
        </VCol>
        <VCol cols="12 py-2">
          <span class="text-subtitle-1">Target Audience</span>
        </VCol>
        <VCol cols="6">
          <v-select
            v-model="targetAudience"
            :items="genders"
            item-title="name"
            item-value="key"
            label="Gender"
            persistent-hint
            :rules="[requiredValidator]"
          ></v-select>
        </VCol>

        <VCol cols="6">
          <v-select
            v-model="ageGroup"
            :items="ageGroups"
            item-title="name"
            item-value="key"
            label="Age Group"
            :rules="[requiredValidator]"
            persistent-hint
          ></v-select>
        </VCol>

        <VCol cols="12">
          <VTextField
            v-model="campaignGoals"
            label="Campaign Goals"
            :rules="[requiredValidator]"
            Value="First"
          />
        </VCol>

        <VCol cols="12">
          <VTextField
            v-model="keyPoints"
            :rules="[requiredValidator]"
            label="Key Points"
            type="data"
          />
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

      keyPoints: "",
      campaignGoals: "",
      ageGroup: null,

      targetAudience: null,

      description: "",
      projectTitle: "",
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
};
</script>
<style></style>
