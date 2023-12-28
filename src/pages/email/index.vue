<template>
  <VLayout class="email-app-layout">
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <VNavigationDrawer
      absolute
      touchless
      location="start"
      :temporary="$vuetify.display.mdAndDown"
    >
      <div class="d-flex flex-column h-100">
        <!-- 👉 Compose -->
        <div class="pa-5">
          <VBtn block @click="showModalGpt = true"> Generate Email </VBtn>
        </div>

        <!-- 👉 Folders -->
        <PerfectScrollbar :options="{ wheelPropagation: false }" class="h-100">
          <ul class="email-filters-labels pt-3">
            <div
              v-for="folder in folders"
              :key="folder.title"
              class="d-flex align-center cursor-pointer pa-2 ml-2"
              custom
            >
              <li
                :class="
                  selectedComponent == folder.key
                    ? 'email-filter-active text-primary'
                    : ''
                "
                class="d-flex align-center cursor-pointer"
                @click="navigateComponent(folder)"
              >
                <VIcon :icon="folder.prependIcon" class="me-3" size="20" />
                <span>{{ folder.title }}</span>

                <VSpacer />
              </li>
            </div>
          </ul>
        </PerfectScrollbar>
      </div>
    </VNavigationDrawer>

    <VMain>
      <VCard
        flat
        class="email-content-list d-flex flex-column"
        style="height: 530px"
      >
        <div v-if="selectedComponent == 'newCampaign'">
          <div class="d-flex align-center">
            <!-- 👉 Search -->
            <VTextField v-model="subject" class="email-search px-4 flex-grow-1">
              <template v-slot:prepend-inner> Subject: </template>
              <template v-slot:append>
                <VBtn block class="mb-3" @click="sendEmail"> Send Email </VBtn>
              </template>
            </VTextField>
          </div>

          <VDivider />

          <!-- 👉 Action bar -->
          <div class="py-2 px-5">
            <!-- TODO: Make checkbox primary on indeterminate state -->

            <!-- <VTextarea
              v-model="message"
              placeholder="Message"
              label="Email Body"
              class="email-search"
              rows="10"
            /> -->
            <quill-editor style="height: 200px" v-model:value="message" />
          </div>
          <VDivider />
          <VTextarea
            v-model="footer"
            placeholder="Footer"
            class="email-search"
            rows="3"
          />

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
                      <VRadio
                        label="Scheduled"
                        value="schedule"
                        color="primary"
                      />
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
                <VBtn color="secondary" @click="showModal = false">
                  Cancel
                </VBtn>
                <VBtn color="primary" @click="sendCampaign">
                  Send To Campaign
                </VBtn>
              </VCardActions>
            </VCard>
          </VDialog>

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
                  <VCol cols="12">
                    Subject Line: {{ generatedEmail.subject }}
                  </VCol>
                  <VCol cols="12"> Body: {{ generatedEmail.body }} </VCol>
                </VRow>
              </VCardText>

              <VCardActions>
                <VSpacer />
                <VBtn color="secondary" @click="closeModal"> Cancel </VBtn>
                <VBtn
                  color="primary"
                  @click="generateEmail"
                  :loading="aiLoading"
                >
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
        </div>
        <Campaigns v-if="selectedComponent == 'sent'" style="overflow: auto" />
        <ListTemplates
          v-if="selectedComponent == 'templates'"
          style="overflow: auto"
        />
        <!-- 👉 Emails list -->
      </VCard>
    </VMain>
  </VLayout>
</template>

<script>
import store from "@/store/index.js";
import axios from "@axios";
import { reactive } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { quillEditor } from "vue3-quill";
import Campaigns from "./Campaigns.vue";
import ListTemplates from "./ListTemplates.vue";
export default {
  components: { Campaigns, ListTemplates, quillEditor },
  data() {
    return {
      isComposeDialogVisible: false,
      showModalGpt: false,
      selectedComponent: "newCampaign",
      showModal: false,
      segment: "650e0f5b6df52a436ca3f12e",
      scheduleDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      show: false,
      snkMsg: "",
      color: "#9575CD",
      selectedSchedule: "notSchedule",
      segments: [],
      // Ref
      footer: "Copyright (c) 2023 To Unsubscribe Click here",
      folders: [
        {
          title: "New Campaigns",
          prependIcon: "mdi-email-outline",
          key: "newCampaign",
        },
        {
          title: "Sent Campaigns",
          prependIcon: "mdi-send-outline",
          key: "sent",
        },
        {
          title: "Templates",
          prependIcon: "mdi-pencil-outline",
          key: "templates",
        },
      ],
      subject: "Apple Crisp Pre-Sale Is Here! 📣",
      message:
        "This Sunday, on Mother's Day, we're giving all moms a free glass of rosé or mimosa when they dine in. \nJoin us at any Urban Skillet location.Our tables are set and we can't wait to celebrate!\nWe can't wait to serve you soon.\nBest regards,\nUrban Skillet Team!",
      aiLoading: false,
      loading: false,
      emailPrompt: "",
      generatedEmail: { subject: "", body: "" },
    };
  },

  methods: {
    navigateComponent(component) {
      this.selectedComponent = component.key;
    },
    getEmailSegmnts() {
      axios
        .get(`dashboard/segmant`)
        .then((res) => {
          console.log(res.data.data, "=============>>>");
          this.segments = res.data.data;
          store.dispatch("getPackageHistory");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDraftEmail() {
      axios
        .get(`email-draft`)
        .then((res) => {
          console.log(res.data.draft, "alskjdfja;sldkjl");
          let email = res.data.draft;
          if (email.subject && email.text) {
            this.subject = email.subject;
            this.message = email.text;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveDraftEmail() {
      let payload = {
        subject: this.subject,
        text: this.message,
      };
      axios
        .post(`save-email-draft`, payload)
        .then((res) => {
          console.log(res.data.data, "=============>>>");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendCampaign() {
      let payload = {
        segmantId: this.segment,
        subject: this.subject,
        text: this.message,
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
    sendToTemplate() {
      this.subject = this.generatedEmail.subject;
      this.message = this.generatedEmail.body;
      this.closeModal();
      this.saveDraftEmail();
    },
    closeModal() {
      this.showModalGpt = false;
      this.generatedEmail.subject = "";
      this.generatedEmail.body = "";
      this.emailPrompt = "";
    },
  },
  mounted() {
    this.getEmailSegmnts();
    this.getDraftEmail();
  },
  setup() {
    const state = reactive({
      content: "<p>2333</p>",
      _content: "",
      editorOption: {
        placeholder: "core",
        modules: {
          // toolbars: [
          // custom toolbars options
          // will override the default configuration
          // ],
          // other moudle options here
          // otherMoudle: {}
        },
        // more options
      },
      disabled: false,
    });

    const onEditorBlur = (quill) => {
      console.log("editor blur!", quill);
    };
    const onEditorFocus = (quill) => {
      console.log("editor focus!", quill);
    };
    const onEditorReady = (quill) => {
      console.log("editor ready!", quill);
    };
    const onEditorChange = ({ quill, html, text }) => {
      console.log("editor change!", quill, html, text);
      state._content = html;
    };

    setTimeout(() => {
      state.disabled = true;
    }, 2000);

    return {
      state,
      onEditorBlur,
      onEditorFocus,
      onEditorReady,
      onEditorChange,
    };
  },
};

// Compose dialog
</script>

<style lang="scss" scoped>
@use "@styles/variables/_vuetify.scss";
@use "@core/scss/base/_mixins.scss";

// ℹ️ Remove border. Using variant plain cause UI issue, caret isn't align in center
.editor {
  background: rebeccapurple;
}
.email-app-layout {
  border-radius: vuetify.$card-border-radius;

  @include mixins.elevation(vuetify.$card-elevation);

  $sel-email-app-layout: &;

  @at-root {
    .skin--bordered {
      @include mixins.bordered-skin($sel-email-app-layout);
    }
  }
}

.email-content-list {
  border-end-start-radius: 0;
  border-start-start-radius: 0;
}

.email-list {
  white-space: nowrap;

  .email-item {
    block-size: 64px;
    transition: all 0.2s ease-in-out;
    will-change: transform, box-shadow;

    &.email-read {
      background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
    }

    & + .email-item {
      border-block-start: 1px solid
        rgba(var(--v-border-color), var(--v-border-opacity));
    }
  }

  .email-item:hover {
    transform: translateY(-2px);

    @include mixins.elevation(3);

    .email-actions {
      display: block !important;
    }

    .email-meta {
      display: none;
    }

    + .email-item {
      border-color: transparent;
    }
  }
}

.email-compose-dialog {
  position: absolute;
  inset-block-end: 0;
  inset-inline-end: 0;
  min-inline-size: 100%;

  @media only screen and (min-width: 800px) {
    min-inline-size: 712px;
  }
}
.email-filters-labels {
  > li {
    position: relative;
    margin-block-end: 4px;
    padding-block: 4px;
    padding-inline: 20px;
  }

  .email-filter-active,
  .email-label-active {
    &::after {
      position: absolute;
      background: currentcolor;
      block-size: 100%;
      content: "";
      inline-size: 3px;
      inset-block-start: 0;
      inset-inline-start: 0;
    }
  }
}
</style>

<style lang="scss">
.email-search {
  .v-field__outline {
    display: none;
  }
}
</style>
