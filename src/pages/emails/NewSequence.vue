<template>
  <div class="">


    <div>
      <VForm>
        <VRow>

          <VCol cols="12">
            <span class="text-subtitle-1">{{ sequenceDetails }} </span>
          </VCol>
          <VCol cols="12">
            <VTextField v-model="title" label="Title" :rules="[requiredValidator, alphaValidator, isNameValid]" />
          </VCol>

          <VCol cols="12">
            <VTextField v-model="schedule" type="datetime-local" label="Schedule" value="Schedule Date & Time" />
          </VCol>

          <VCol cols="12">
            <v-select v-model="ifStatement" :items="ifStatements" label="If" item-value="value" item-title="title"
              persistent-hint :rules="[requiredValidator]"></v-select>
          </VCol>
          <VCol cols="12">
            <v-select v-model="thenStatement" :items="thenStatements" label="Then" item-value="value" item-title="title"
              persistent-hint :rules="[requiredValidator]"></v-select>
          </VCol>

        </VRow>
      </VForm>
    </div>

  </div>
</template>

<script>

import rokit from "@/assets/images/cards/rokit.png";

export default {
  props: {
    sequenceType: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      dialog: false,
      rokit: rokit,
      ifStatement: null,
      thenStatement: null,
      schedule: '',
      title: '',
      ifStatements: [
        {
          title: 'Customer is new',
          value: 'newCustomer'
        },
        {
          title: 'Customer is old',
          value: 'oldCustomer'
        }
      ],
      thenStatements: [
        {
          title: 'Send promo code email',
          value: 'promoEmail'
        },
        {
          title: 'Send welcome email',
          value: 'welcomeEmail'
        }
      ]
    }
  }
}
</script>
