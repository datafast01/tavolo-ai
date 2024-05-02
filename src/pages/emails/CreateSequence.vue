<template>
  <v-stepper v-model="e1">

    <v-stepper-header>
      <v-stepper-item title="Create Sequence" value="1">
      </v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item title="Select Template" value="2"></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item title="Create an ad" value="3"></v-stepper-item>
    </v-stepper-header>

    <v-stepper-window>
      <div class="px-5">
        <v-stepper-window-item value="1">

          <NewSequence ref="sequenceInfo" />
          <div class="mt-6 d-flex justify-end">

            <v-btn color="primary" @click="nextState(1)"> Continue </v-btn>
          </div>
        </v-stepper-window-item>
      </div>
      <div class="px-5">
        <v-stepper-window-item value="2">
          <SelectTemplate ref="templateSelection" />
          <div class="mt-6 d-flex justify-space-between">
            <VCardActions class="pa-0">
              <v-btn text @click="e1 = 0"> Back </v-btn>
            </VCardActions>
            <v-btn color="primary" @click="nextState(2)"> Continue </v-btn>
          </div>
        </v-stepper-window-item>
      </div>
      <div class="px-5">
        <v-stepper-window-item value="3">
          <CreateEmail ref="createEmail" />
          <PreviewTemplate ref="previewTemplate" />
          <div class="mt-6 d-flex justify-space-between">
            <VCardActions class="pa-0">
              <v-btn text @click="e1 = 1"> Back </v-btn>
            </VCardActions>
            <div class="d-flex">
              <!-- <v-btn color="primary" class="mr-4" @click="previewEmail">
                Preview
              </v-btn> -->
              <v-btn color="primary" @click="nextState(3)" :loading="loading"> Create Sequence </v-btn>
            </div>
          </div>
        </v-stepper-window-item>
      </div>
    </v-stepper-window>
  </v-stepper>
</template>

<script>
import NewSequence from "./NewSequence.vue";
import SelectTemplate from "./SelectTemplate.vue";
import CreateEmail from "./CreateEmail.vue";
import PreviewTemplate from "./PreviewTemplate.vue";
import axios from '@axios'
import { useToast } from "vue-toastification";

export default {
  components: { NewSequence, SelectTemplate, CreateEmail, PreviewTemplate },
  data() {
    return {
      toast: useToast(),
      e1: 0,
      name: '',
      scheduleDate: null,
      templateId: '',
      buttons: [],
      conditionId: '',
      conditionSelection: '',
      subject: '',
      text: '',
      loading: false
    };
  },
  methods: {
    previewEmail() {
      this.$refs.previewTemplate.dialog = true;
    },
    nextState(state) {
      if (state == 1) {
        this.e1 = state
        this.name = this.$refs.sequenceInfo.title,
          this.conditionId = this.$refs.sequenceInfo.ifStatement,
          this.conditionSelection = this.$refs.sequenceInfo.thenStatement,
          this.scheduleDate = this.$refs.sequenceInfo.schedule

      }
      if (state == 2) {
        this.e1 = state
        this.templateId = this.$refs.templateSelection.templateId
      }
      if (state == 3) {
        console.log(this.$refs.createEmail)
        this.text = this.$refs.createEmail.text,
          this.subject = this.$refs.createEmail.subject,
          this.buttons = this.$refs.createEmail.buttons

        const payload = {
          name: this.name,
          conditionId: this.conditionId,
          conditionSelection: this.conditionSelection,
          scheduleDate: this.scheduleDate,
          templateId: this.templateId,
          subject: this.subject,
          text: this.text,
          buttons: this.buttons
        }
        this.loading = true
        axios.post('dashboard/sequence', payload)
          .then((res) => {
            console.log(res)
            this.toast.success('Sequence has been created Successfully!')
            this.loading = false

          })
          .catch((err) => {
            this.toast.success('Something went wrong!')
            this.loading = false


          })

      }


    },
    submitDetials() {
      alert('oskok')
    }
  },
};
</script>
