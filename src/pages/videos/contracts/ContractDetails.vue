<template>
  <v-col cols="12" md="6" sm="6">
    <v-radio-group v-model="ex7" column>
      <v-radio color="red" value="1"></v-radio>
    </v-radio-group>
  </v-col>
  <v-card>
    <v-container class="contact">
      <v-row class="pa-5">
        <v-col cols="12">
          <div class="">
            <h3>Contract Title Card title</h3>
          </div>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
              <v-card-title>Title Card title </v-card-title>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle class="pb-0"> Status </v-card-subtitle>
              <v-slider
                v-model="slider"
                :max="max"
                :min="min"
                class="align-center"
                color="#3CB22B"
                hide-details
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="slider"
                    class="border-0"
                    density="compact"
                    style="width: 70px"
                    type="number"
                    hide-details
                    single-line
                  ></v-text-field>
                </template>
              </v-slider>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
              <v-card-title>Title Card title </v-card-title>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
              <v-card-title>Title Card title </v-card-title>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
              <ul class="ul pt-3">
                <li>Lorem ipsum dolor sit amet sed ante</li>
                <li>Lorem ipsum dolor sit amet sed ante</li>
                <li>Lorem ipsum dolor sit amet sed ante</li>
              </ul>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
              <ul class="ul pt-3">
                <li>Lorem ipsum dolor sit amet sed ante</li>
                <li>Lorem ipsum dolor sit amet sed ante</li>
                <li>Lorem ipsum dolor sit amet sed ante</li>
              </ul>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="12">
          <VCard>
            <v-card-subtitle class="pt-5">
              Card subtitle secondary text
            </v-card-subtitle>
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
                      Email Campaign Launched
                    </h4>
                    <small class="app-timeline-meta text-no-wrap"
                      >Wednesday</small
                    >
                  </div>
                  <p class="mb-0 app-timeline-text">
                    34 conversions in last 2 days
                  </p>
                  <span class="d-flex align-center mt-2">
                    <!-- <VIcon
              color="error"
              icon="mdi-file-pdf-box"
              class="me-1"
               /> -->
                    <span class="font-weight-medium text-sm"
                      >$853 in sales</span
                    >
                  </span>
                </VTimelineItem>

                <VTimelineItem dot-color="primary" size="x-small">
                  <div
                    class="d-flex justify-space-between align-center flex-wrap"
                  >
                    <h4 class="app-timeline-title me-1 mb-2">
                      Text Campaign Launched 😎
                    </h4>
                    <small class="app-timeline-meta text-no-wrap"
                      >Wednesday</small
                    >
                  </div>

                  <p class="mb-1 app-timeline-text">
                    51 conversions in last 2 days
                  </p>

                  <div class="d-flex align-center mt-3">
                    <!-- <VAvatar
              size="24"
              class="me-2"
              :image="avatar2"
            /> -->
                    <div>
                      <p class="font-weight-medium mb-0">$1,083 in sales</p>
                    </div>
                  </div>
                </VTimelineItem>

                <VTimelineItem dot-color="info" size="x-small">
                  <div
                    class="d-flex justify-space-between align-center flex-wrap"
                  >
                    <h4 class="app-timeline-title me-1 mb-2">
                      Organic Video Launched on 4 Platforms
                    </h4>
                    <small class="app-timeline-meta text-no-wrap"
                      >Wednesday</small
                    >
                  </div>
                  <p class="mb-0 app-timeline-text">
                    382k impressions in last 7 days
                  </p>
                </VTimelineItem>
              </VTimeline>
            </VCardText>
          </VCard>
        </v-col>

        <VCol cols="12">
          <v-card>
            <v-card-subtitle class="pt-5"> Card subtitle </v-card-subtitle>
            <VRadioGroup class="pl-4" v-model="selectedSchedule" :inline="true">
              <VRadio
                label="Auto Sending"
                value="notSchedule"
                color="primary"
              />
              <VRadio label="Scheduled" value="schedule" color="primary" />
            </VRadioGroup>
            <v-card-item>
              <v-row no-gutters>
                <v-col cols="12" v-for="n in 4">
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
                        <v-btn class="ml-2" elevation="24" size="large"
                          >Ask for revision</v-btn
                        >
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-btn color="grey-darken-2 " size="small"> View More </v-btn>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </VCol>

        <v-responsive width="100%"></v-responsive>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import download from "../../../assets/images/cards/download.png";
import play1 from "../../../assets/images/cards/folder.png";
export default {
  data() {
    return {
      ex7: null,
      ex8: null,
      play1: play1,
      download: download,
      selectedSchedule: "notSchedule",
      max: 90,
      slider: 40,
    };
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
</style>
