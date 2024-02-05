<template>
  <VSnackbar v-model="show" :timeout="2000" :color="color">
    {{ snkMsg }}
  </VSnackbar>
  <div>
    <div class="d-flex align-center">
      <!-- 👉 Search -->
      <VTextField
        v-model="emailContent.subject"
        class="email-search flex-grow-1"
      >
        <template v-slot:prepend-inner> Subject: </template>
      </VTextField>
    </div>

    <!-- 👉 Action bar -->

    <div :class="currentTheme == 'dark' ? 'config py-2' : 'py-2'">
      <!-- TODO: Make checkbox primary on indeterminate state -->

      <quill-editor style="height: 400px" v-model:value="emailContent.body" />
    </div>
    <VDialog v-model="showModalGpt" max-width="600">
      <!-- Dialog Activator -->

      <!-- Dialog Content -->
      <VCard title="Generate Email From Tavolo AI">
        <DialogCloseBtn
          variant="text"
          size="small"
          @click="showModalGpt = false"
        />

        <VCardText>
          <VRow>
            <VCol cols="12" sm="12">
              <VTextField
                dense
                label="Give Email Prompt"
                v-model="emailPrompt"
                required
              />
            </VCol>
            <VCol cols="12"> Subject Line: {{ generatedEmail.subject }} </VCol>
            <VCol cols="12"> Body: {{ generatedEmail.body }} </VCol>
          </VRow>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn color="secondary" @click="closeModal"> Cancel </VBtn>
          <VBtn color="primary" @click="generateEmail" :loading="aiLoading">
            Generate Email
          </VBtn>
          <VBtn
            color="success"
            @click="sendToTemplate"
            v-if="generatedEmail.body != ''"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="showModal" max-width="600">
      <!-- Dialog Activator -->

      <!-- Dialog Content -->
      <VCard title="Select Campaign Type">
        <DialogCloseBtn
          variant="text"
          size="small"
          @click="showModal = false"
        />

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
  </div>
</template>

<script>
import store from "@/store/index.js";
import axios from "@axios";
import { quillEditor } from "vue3-quill";

export default {
  components: {
    quillEditor,
  },
  props: {
    emailContent: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      show: false,
      snkMsg: "",
      color: "#9575CD",
      selectedSchedule: "notSchedule",
      segment: "650e0f5b6df52a436ca3f12e",
      subject: "",
      showModalGpt: false,
      scheduleDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      options: {
        debug: "info",
        modules: {
          toolbar: ["bold", "italic", "underline"],
        },
        placeholder: "Compose an epic...",
        readOnly: true,
        theme: "snow",
      },
      aiLoading: false,
      generatedEmail: { subject: "", body: "" },
      emailPrompt: "",
      showModal: false,
      segments: [],
    };
  },
  computed: {
    currentTheme() {
      return store.getters.getTheme;
    },
  },
  methods: {
    closeModal() {
      this.showModalGpt = false;
      this.generatedEmail.subject = "";
      this.generatedEmail.body = "";
      this.emailPrompt = "";
    },
    generateEmail() {
      if (this.emailPrompt.trim() == "") {
        this.show = true;
        this.snkMsg = "Please give the email prompt";
        this.color = "error";
      } else {
        this.aiLoading = true;
        const payload = {
          customer: false,
          text: `${this.emailPrompt} return object like this {"subject":"", "body":""} don't add anything else`,
        };
        try {
          axios.post("ask-tavolo", payload).then((res) => {
            console.log(res.data.data);
            let json = res.data.data;
            console.log(json);
            const email = json.replace(/\n/g, "");
            // console.log(email);
            this.generatedEmail = JSON.parse(email);
            this.aiLoading = false;
          });
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    },
    saveDraftEmail() {
      let payload = {
        subject: this.subject,
        text: this.message,
      };
      axios
        .post(`save-email-draft`, payload)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    },
    sendToTemplate() {
      this.emailContent.subject = this.generatedEmail.subject;
      this.emailContent.body = this.generatedEmail.body;
      this.closeModal();
      this.saveDraftEmail();
    },

    sendCampaign() {
      let payload = {
        segmantId: this.segment,
        subject: this.emailContent.subject,
        text: this.emailContent.body,
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
    getEmailSegmnts() {
      axios
        .get(`dashboard/segmant`)
        .then((res) => {
          this.segments = res.data.data;
          store.dispatch("getPackageHistory");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getEmailSegmnts();
  },
};
</script>

<style scoped>
::v-deep .config .ql-snow .ql-formats .ql-bold svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-italic svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-underline svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-strike svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-blockquote svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-code-block svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-header svg {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-list svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-script svg {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-indent svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-direction svg {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-picker .ql-picker-label::before {
  color: white !important;
}

::v-deep .config .ql-snow .ql-formats .ql-picker .ql-picker-label::before {
  color: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-picker .ql-picker-label::before {
  color: white !important;
}
::v-deep
  .config
  .ql-snow
  .ql-formats
  .ql-picker
  .ql-picker-label
  svg
  .ql-stroke {
  stroke: white !important;
}

::v-deep .config .ql-snow .ql-formats .ql-clean svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-link svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-image svg .ql-stroke {
  stroke: white !important;
}

::v-deep .ql-snow .ql-editor::before {
  color: white;
}
</style>
