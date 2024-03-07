<template>
  <v-container class="contact pa-0">
    <v-row class="pa-0 ma-0 pb-3">
      <v-col cols="6" class="pa-0">
        <div class="d-flex align-center green-1 justify-space-between">
          <v-card
            width="200"
            class="py-2 px-3"
            v-if="currentStatus == 'completed'"
          >
            <v-radio-group color="#3CB22B" v-model="currentStatus">
              <div class="d-flex align-center green-1 justify-space-between">
                <span class="mr-5">Completed</span>
                <v-radio class="flex-grow-0" color="red" value="1"></v-radio>
              </div>
            </v-radio-group>
          </v-card>
          <v-card
            width="200"
            class="py-2 px-3 mr-2"
            v-if="currentStatus == 'inProgress'"
          >
            <v-radio-group color="red" v-model="ex7">
              <div class="d-flex align-center red-1 justify-space-between">
                <span class="mr-5">In Progress</span>
                <v-radio class="flex-grow-0" color="red" value="1"></v-radio>
              </div>
            </v-radio-group>
          </v-card>
          <v-card
            width="200"
            class="py-2 px-3"
            v-if="currentStatus == 'pending'"
          >
            <v-radio-group v-model="ex7">
              <div class="d-flex align-center blue-1 justify-space-between">
                <span class="mr-5">Pending</span>
                <v-radio class="flex-grow-0" value="1"></v-radio>
              </div>
            </v-radio-group>
          </v-card>
        </div>
      </v-col>
      <v-col cols="6" class="pa-0 d-flex align-center justify-end">
        <div class="float-right">
          <v-btn color="#312D4B" size="large" class="mr-4" @click="showChat">
            <v-img
              :src="chat"
              class="flex-grow-0"
              height="30"
              width="30"
              alt="John"
            ></v-img
          ></v-btn>
          <v-btn elevation="24" size="large">
            OPTIONS
            <v-icon>mdi-chevron-down</v-icon>
            <VMenu activator="parent">
              <VList>
                <VListItem @click="changeStatus(item.raw)">
                  <template #prepend>
                    <!-- <VIcon icon="mdi-recycle" /> -->
                  </template>
                  <VListItemTitle>chat</VListItemTitle>
                </VListItem>
                <VListItem @click="deleteCampaign(item.raw._id)">
                  <template #prepend>
                    <!-- <VIcon icon="mdi-delete-outline" /> -->
                  </template>
                  <VListItemTitle>Details</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-card>
    <v-container class="contact">
      <v-row class="pa-5">
        <v-col cols="12">
          <div class="">
            <h2>Contract Title</h2>
          </div>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Business Name </v-card-subtitle>
              <v-card-title> Lorem Ipsum </v-card-title>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle class="pb-2"> Status </v-card-subtitle>
              <div class="d-flex align-center">
                <v-progress-linear
                  v-model="slider"
                  color="#3CB22B"
                  hide-details
                  class="mr-3"
                  style="height: 6px; left: 0%; transform: translateX(0%)"
                >
                </v-progress-linear>
                <span class="green-1">45%</span>
              </div>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Payment Plan </v-card-subtitle>
              <v-card-title>Popular - $45/Recording</v-card-title>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Date of Agreement </v-card-subtitle>
              <v-card-title>DD/MM/YYYY</v-card-title>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Start to End Date</v-card-subtitle>
              <v-card-title>DD/MM/YYYY</v-card-title>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> End Date </v-card-subtitle>
              <v-card-title>DD/MM/YYYY</v-card-title>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Goals and Key Points </v-card-subtitle>
              <ul class="ul pt-3">
                <li>Lorem ipsum dolor sit amet sed ante</li>
                <li>consectetur adipiscing elit dolor sit</li>
                <li>Praesent sed ante nec</li>
              </ul>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Description </v-card-subtitle>
              <p class="pt-3 ma-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent sed ante nec velit viverra vehicula. Mauris ultrices
                viverra lorem, nec porttitor nisl maximus vitae.
              </p>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="12">
          <VCard>
            <v-card-subtitle class="pt-5"> Activity Timeline </v-card-subtitle>
            <VCardText>
              <VTimeline
                density="compact"
                align="start"
                line-inset="8"
                truncate-line="both"
              >
                <VTimelineItem dot-color="error" size="x-small">
                  <div
                    class="d-flex justify-space-between align-center flex-wrap"
                  >
                    <h4 class="app-timeline-title me-1 mb-2">
                      Project Awaiting Completion
                    </h4>
                    <small class="app-timeline-meta text-no-wrap"
                      >Yesterday</small
                    >
                  </div>
                  <p class="mb-0 app-timeline-text">
                    Project is in progress and will be completed once you do it.
                  </p>
                </VTimelineItem>

                <VTimelineItem dot-color="primary" size="x-small">
                  <div
                    class="d-flex justify-space-between align-center flex-wrap"
                  >
                    <h4 class="app-timeline-title me-1 mb-2">
                      Contract Approval 😎
                    </h4>
                    <small class="app-timeline-meta text-no-wrap"
                      >Wednesday</small
                    >
                  </div>

                  <p class="mb-1 app-timeline-text">
                    The contract has been approved by both parties.
                  </p>
                </VTimelineItem>

                <VTimelineItem dot-color="info" size="x-small">
                  <div
                    class="d-flex justify-space-between align-center flex-wrap"
                  >
                    <h4 class="app-timeline-title me-1 mb-2">
                      Contract Initiation
                    </h4>
                    <small class="app-timeline-meta text-no-wrap"
                      >Yesterday</small
                    >
                  </div>
                  <p class="mb-0 app-timeline-text">
                    The contract has been accepted and initiated by the
                    influencer.
                  </p>
                </VTimelineItem>
              </VTimeline>
            </VCardText>
          </VCard>
        </v-col>

        <VCol cols="12">
          <v-card>
            <v-card-subtitle class="pt-5"> Submissions </v-card-subtitle>
            <VRadioGroup class="pl-4" v-model="selectedSchedule" :inline="true">
              <VRadio label="Original" value="notSchedule" color="primary" />
              <VRadio label="Revised" value="schedule" color="primary" />
            </VRadioGroup>
            <v-card-item>
              <v-row no-gutters>
                <!-- <v-col cols="12" v-for="n in 4">
                  <div
                    class="me-3 border-t py-2 d-flex align-center justify-space-between"
                  >
                    <div rounded class="d-flex align-center justifycenter">
                      <div class="bg-darken2">
                        <v-img
                          :src="play1"
                          height="20"
                          width="20"
                          alt="John"
                        ></v-img>
                      </div>
                      <div>
                        <span class="font-12">Yesterday</span>
                        <h4 class="l-h">File Name</h4>
                        <span class="font-12">{{ n }}.8 GB</span>
                      </div>
                    </div>
                    <div>
                      <div class="d-flex align-center justify-center">
                        <v-img
                          :src="download"
                          height="30"
                          width="30"
                          alt="John"
                        ></v-img>
                        <v-btn
                          class="ml-2"
                          @click="sendRequest"
                          elevation="24"
                          size="large"
                          >Ask for revision</v-btn
                        >
                      </div>
                    </div>
                  </div>
                </v-col> -->
                <v-col cols="12" class="text-center">
                  <!-- <v-btn color="grey-darken-2 " size="small"> View More </v-btn> -->

                  <ContactItem />
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </VCol>

        <v-responsive width="100%"></v-responsive>
      </v-row>
    </v-container>
    <CustomChat ref="chat_dialog" />
  </v-card>

  <VDialog v-model="showModal" max-width="700">
    <!-- Dialog Activator -->

    <!-- Dialog Content -->
    <VCard class="pa-3">
      <DialogCloseBtn variant="text" size="small" @click="showModal = false" />
      <VCardText class="text-center text-h5"
        >Send Revision Request<br />
        <span class="text-body-2">For File ‘Lorem Ipsum’</span>
      </VCardText>
      <VCardText>
        <VRow>
          <VCol cols="2"></VCol>
          <VCol cols="8">
            <VCard class="pa-3">
              <div class="me-3 py-1 d-flex align-center justify-space-between">
                <div rounded class="d-flex align-center justifycenter">
                  <div class="bg-darken2">
                    <v-img
                      :src="play1"
                      height="20"
                      width="20"
                      alt="John"
                    ></v-img>
                  </div>
                  <div>
                    <h4 class="text-subtitle-1 l-h">File Name</h4>
                    <span class="font-12">2.8 GB</span>
                  </div>
                </div>
                <div>
                  <div class="text-body-2">Yesterday</div>
                </div>
              </div>
            </VCard>
            <v-textarea
              v-model="text"
              label="Comments"
              row-height="25"
              rows="5"
              variant="outlined"
              auto-grow
              shaped
              class="pt-8"
            ></v-textarea>

            <div class="text-center pt-6">
              <VBtn color="primary mr-4 " @click="sendCampaign"> SEND </VBtn>
              <VBtn color="secondary" @click="showModal = false"> Cancel </VBtn>
            </div>
          </VCol>
          <VCol cols="2"></VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script>
import download from "../../../assets/images/cards/download.png";
import play1 from "../../../assets/images/cards/folder.png";
import chat from "../../../assets/images/iconify-svg/chat.svg";
import CustomChat from "../../apps/customeChat/chatDialog.vue";
import ContactItem from "./ContactItem.vue";
export default {
  components: { CustomChat, ContactItem },
  data() {
    return {
      ex7: null,
      ex8: null,
      chat: chat,
      play1: play1,
      download: download,
      selectedSchedule: "notSchedule",
      max: 90,
      slider: 45,
      currentStatus: "inProgress",
      showModal: false,
    };
  },
  methods: {
    showChat() {
      this.$refs.chat_dialog.dialog = true;
    },

    sendRequest() {
      this.showModal = true;
    },
  },
};
</script>

<style>
.ul {
  list-style: inside;
}

.contact .v-field {
  display: inline !important;
}

.font-12 {
  font-size: 10px;
}
.bg-darken2 {
  background-color: #524d6b;
  height: 52px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 12px;
}
.l-h {
  line-height: 14px;
}

/* ::v-deep .v-progress-linear {
  height: 4px;
  left: 0 !important;
  transform: translateX(0%) !important;
} */

.green-1 {
  color: #3cb22b;
}
.red-1 {
  color: #b22b2b;
}
.blue-1 {
  color: #1d42b9;
}
</style>
./ContactItem.vue
