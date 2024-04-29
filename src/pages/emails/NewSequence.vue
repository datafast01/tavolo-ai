<template>
  <div class="">


    <div>
      <VForm>
        <VRow>

          <VCol cols="12">
            <span class="text-subtitle-1">{{ sequenceDetails }} </span>
          </VCol>
          <VCol cols="12">
            <VTextField v-model="title" label="Title" :rules="[requiredValidator]" />
          </VCol>

          <VCol cols="12">
            <VTextField v-model="schedule" :rules="[requiredValidator]" type="datetime-local" label="Schedule"
              value="Schedule Date & Time" />
          </VCol>
          <VCol cols="12">
            <v-select v-model="thenStatement" :items="segments" label="If" item-value="_id" item-title="name"
              persistent-hint :rules="[requiredValidator]"></v-select>
          </VCol>
          <VCol cols="12">
            <v-select v-model="ifStatement" :items="thenStatements" label="Then" item-value="value" item-title="title"
              persistent-hint :rules="[requiredValidator]"></v-select>
          </VCol>


        </VRow>
      </VForm>
    </div>

  </div>
</template>

<script>

import rokit from "@/assets/images/cards/rokit.png";
import store from "@/store/index.js";
import {

  requiredValidator
} from "@validators";

export default {
  props: {
    sequenceType: {
      type: String,
      default: ''
    }
  },

  data() {
    return {

      requiredValidator: requiredValidator,

      dialog: false,
      rokit: rokit,
      ifStatement: null,
      thenStatement: null,
      schedule: '',
      title: '',

      thenStatements: [
        {
          title: 'Send email',
          value: 'sendEmail'
        },

      ]
    }
  },
  computed: {
    segments() {
      return store.getters.getSegments
    }
  },

  mounted() {
    store.dispatch('listSegments')
  }
}
</script>
