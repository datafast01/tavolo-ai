<template>
  <!-- <VSnackbar v-model="show" :timeout="2000" :color="color">
    {{ snkMsg }}
  </VSnackbar>

  <div class="d-flex flex-column">
    <div class="autoDatePicker">
      <AppDateTimePicker
        v-model="scheduleDate"
        label="Schedule Date"
        clear-icon="mdi-close"
        clearable
        style="width: 100%"
      />
      <VRadioGroup v-model="selectedSchedule" :inline="true">
        <VRadio label="Auto Sending" value="notSchedule" color="primary" />
        <VRadio label="Scheduled" value="schedule" color="primary" />
      </VRadioGroup>
    </div>
    <VCard class="email-compose-dialog" elevation="24">
      <VCardItem class="py-3 px-5">
        <div class="d-flex align-center">
          <span class="font-weight-medium">Compose Mail</span>
          <VSpacer />
        </div>
      </VCardItem>
      <div class="px-4">
        <div class="mt-4">
          <VSelect
            v-model="segment"
            :items="segments"
            density="compact"
            item-title="name"
            item-value="_id"
            single-line
          >
            <template #prepend-inner>
              <div class="text-disabled" style="width: max-content">
                Select Segment:
              </div>
            </template>
          </VSelect>
        </div>

        <VTextField v-model="subject" density="compact" class="my-4">
          <template #prepend-inner>
            <div class="text-sm text-disabled">Subject:</div>
          </template>
        </VTextField>

        <VDivider />

        <VTextarea v-model="message" placeholder="Message" />
      </div>

      <VDivider />

      <div class="d-flex align-center px-5 py-4">
        <VBtnGroup color="primary" divided density="comfortable">
          <VBtn @click="sendEmail">Send</VBtn>
          <VBtn icon @click="() => (isMenuOpen = !isMenuOpen)">
            <VIcon
              :icon="isMenuOpen ? 'mdi-menu-up' : 'mdi-menu-down'"
              size="24"
            />
            <VMenu activator="parent">
              <VList :items="['Schedule Mail']" />
            </VMenu>
          </VBtn>
        </VBtnGroup>

        <VSpacer />
      </div>
    </VCard>
  </div> -->
  <!-- <v-dialog width="500" v-model="showModal">
    <v-card>
      <div class="autoDatePicker">
        <VRadioGroup v-model="selectedSchedule" :inline="true">
          <VRadio label="Auto Sending" value="notSchedule" color="primary" />
          <VRadio label="Scheduled" value="schedule" color="primary" />
        </VRadioGroup>
        <AppDateTimePicker
          v-model="scheduleDate"
          label="Schedule Date"
          clear-icon="mdi-close"
          clearable
          style="width: 100%"
          v-if="selectedSchedule == 'schedule'"
        />
      </div>
      <VSelect
        v-model="segment"
        :items="segments"
        density="compact"
        item-title="name"
        item-value="_id"
        single-line
      >
      </VSelect>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close Dialog" @click="showModal = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->

  <VDialog v-model="showModal" max-width="600">
    <!-- Dialog Activator -->

    <!-- Dialog Content -->
    <VCard title="Select Campaign Type">
      <DialogCloseBtn variant="text" size="small" @click="showModal = false" />

      <VCardText>
        <VRow>
          <VCol cols="12">
            <VSelect
              v-model="segment"
              :items="segments"
              density="compact"
              item-title="name"
              item-value="_id"
              single-line
            >
            </VSelect>
          </VCol>
          <VCol cols="12" sm="6">
            <VRadioGroup v-model="selectedSchedule" :inline="true">
              <VRadio
                label="Auto Sending"
                value="notSchedule"
                color="primary"
              />
              <VRadio label="Scheduled" value="schedule" color="primary" />
            </VRadioGroup>
          </VCol>
          <VCol cols="12" sm="6">
            <!-- <AppDateTimePicker
              v-model="scheduleDate"
              label="Schedule Date"
              clear-icon="mdi-close"
              clearable
              style="width: 100%"
              v-if="selectedSchedule == 'schedule'"
            /> -->
            <VTextField
              dense
              type="date"
              v-model="scheduleDate"
              label="Schedule Date"
              clear-icon="mdi-close"
              v-if="selectedSchedule == 'schedule'"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn color="secondary" @click="showModal = false"> Cancel </VBtn>
        <VBtn color="primary" @click="sendCampaign"> Send To Campaign </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
  <div>
    <!-- <Templates :templates="templates" /> -->
    <v-row>
      <v-col cols="12" md="3" @click="handleSocialMedia">
        <div
          v-for="template in templates"
          :key="template"
          class="mb-6 cursor-pointer"
          :class="activeTemplate == template.key ? 'active-border' : ''"
        >
          <img
            src="../../assets/images/email-templates/template01.png"
            alt=""
            style="height: 275px; width: 258px"
            @click="selectTemplate(template)"
          />
        </div>
      </v-col>
      <v-divider :thickness="3" vertical></v-divider>
      <v-col cols="12" md="8" class="">
        <Template01
          ref="t01"
          :template="templates[0]"
          @refresh="getTemplates"
        />
      </v-col>
    </v-row>
    <VBtnGroup
      color="primary"
      divided
      density="comfortable"
      class="d-flex justify-end"
      style="width: 100%"
    >
      <VBtn @click="sendEmail">Send</VBtn>
    </VBtnGroup>
  </div>
</template>

<script>
import axios from "@axios";
// import Templates from "./Templates.vue";
import Template01 from "./Template01.vue";

export default {
  components: { Template01 },
  data() {
    return {
      showModal: false,
      segment: "650e0f5b6df52a436ca3f12e",
      scheduleDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      selectedSchedule: "notSchedule",
      segments: [],
      show: false,
      snkMsg: "",
      color: "#9575CD",
      templates: [],
      activeTemplate: "t01",
      base64Image: null,
      loading: false,
    };
  },
  methods: {
    getEmailSegmnts() {
      axios
        .get(`dashboard/segmant`)
        .then((res) => {
          console.log(res.data.data, "=============>>>");
          this.segments = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendCampaign() {
      console.log(this.$refs.t01.message);

      let payload = {
        segmantId: this.segment,
        subject: this.$refs.t01.subject,
        text: this.$refs.t01.message,
        schedule: this.selectedSchedule == "schedule" ? "true" : "false",
        scheduleDate: this.scheduleDate,
      };

      console.log(payload);
      axios
        .post(`dashboard/email`, payload)
        .then((res) => {
          console.log(res.data.data, "=============>>>");
          this.show = true;
          this.snkMsg = "Email sent successfully";
          this.showModal = false;
        })
        .catch((err) => {
          console.log(err.response);
          this.show = true;

          if (err.response.status == 400) {
            this.snkMsg = err.response.data.error;
          } else {
            this.snkMsg = "Something went wrong";
          }
          this.color = "error";
        });
    },
    sendEmail() {
      this.showModal = true;
    },

    getTemplates() {
      this.loading = true;
      axios
        .get(`dashboard/list-email-templates`)
        .then((res) => {
          console.log(res.data, "=============>>>");
          this.templates = res.data.data;
          this.base64Image =
            "data:image;base64," + this.templates[0].userFiles.companyLogo;
          console.log(this.base64Image);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectTemplate(template) {
      this.activeTemplate = template.key;
    },
    templateIsSelected() {
      let payload = {
        templateId: this.activeTemplate,
      };
      axios
        .post(`dashboard/select-email-template`, payload)
        .then((res) => {
          console.log(res.data.data, "=============>>>");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  mounted() {
    this.getTemplates();
    this.getEmailSegmnts();
  },
};

//Methods
</script>

<style lang="scss" scoped>
.email-compose-dialog {
  z-index: 910 !important;

  .v-field--prepended {
    padding-inline-start: 20px;
  }

  .v-card-item {
    background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
  }

  .v-textarea .v-field {
    --v-field-padding-start: 20px;
  }

  .v-field__outline {
    display: none;
  }
}

.active-border {
  border: 6px solid rgb(var(--v-theme-primary));
  padding-top: 6px;
  padding-bottom: 6px;
}
.top-logo {
  height: 150px;
  width: 150px;
  border: 3px dotted rgb(var(--v-theme-primary));
}
.center-logo {
  height: 150px;
  width: 450px;
  border: 3px dotted rgb(var(--v-theme-primary));
}
.cursor-pointer {
  cursor: pointer;
}
</style>
