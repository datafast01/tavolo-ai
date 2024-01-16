<template>
  <section>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <!-- <v-expansion-panels class="mb-3">
      <v-expansion-panel>
        <v-expansion-panel-title>Advance Filters</v-expansion-panel-title>
        <v-expansion-panel-text>
          <VRow class="mb-3">
            <VCol cols="12" md="2" sm="4">
              <VTextField
                v-model="emailSubject"
                label="Search Subject"
                density="compact"
              />
            </VCol>
            {{ scheduledDate }}
            <VCol cols="12" md="2" sm="4">
              <VTextField
                v-model="scheduledDate"
                type="date"
                label="Schedule Date"
                density="compact"
              />
            </VCol>

            <VCol cols="12" md="2" sm="4">
              <v-select
                label="Schecudled"
                :items="availableItems"
                item-title="name"
                item-value="value"
                density="compact"
                v-model="scheduled"
              ></v-select>
            </VCol>
            <VCol cols="12" md="2" sm="4">
              <v-select
                label="Sent"
                :items="availableItems"
                item-title="name"
                item-value="value"
                density="compact"
                v-model="sent"
              ></v-select>
            </VCol>
          </VRow>
          <div class="d-flex flex-row-reverse">
            <div class="mx-2">
              <VBtn @click="applyFilters()"> Apply Filters </VBtn>
            </div>
            <div>
              <VBtn @click="reset" color="secondary"> Clear Filters </VBtn>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels> -->
    <VCard>
      <!-- SECTION data table -->
      <VDataTableServer
        :items="sampleInfluncerData"
        :headers="headers"
        class="rounded-0"
        @update:options="options = $event"
        :loading="isLoading"
      >
        <!-- Seegments -->
        <template #item.profilePhoto="{ item }">
          <div class="py-3">
            <img
              src="@/assets/images/avatars/avatar-1.png"
              alt=""
              width="55"
              srcset=""
            />
          </div>
        </template>

        <!-- Status -->

        <!-- Actions -->

        <!-- Pagination -->
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>

    <!-- 👉 Add New User -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          title: "Profile Photo",
          key: "profilePhoto",
        },
        {
          title: "Full Name",
          key: "fullName",
        },
        {
          title: "Social Media Username",
          key: "userName",
        },
        {
          title: "Gender",
          key: "gender",
        },
        {
          title: "Audience",
          key: "audience",
        },
        {
          title: "Rating",
          key: "rating",
        },
        {
          title: "Charges",
          key: "charges",
        },
      ],

      sampleInfluncerData: [
        {
          img: "",
          fullName: "Lorem Ipsum",
          userName: "Lorem Ipsum",
          gender: "male",
          audience: "200",
          rating: "4",
          charges: "$45/Recording",
        },
        {
          img: "",
          fullName: "Lorem Ipsum",
          userName: "Lorem Ipsum",
          gender: "male",
          audience: "200",
          rating: "4",
          charges: "$45/Recording",
        },
        {
          img: "",
          fullName: "Lorem Ipsum",
          userName: "Lorem Ipsum",
          gender: "Female",
          audience: "500k",
          rating: "4",
          charges: "$45/Recording",
        },
        {
          img: "",
          fullName: "Lorem Ipsum",
          userName: "Lorem Ipsum",
          gender: "male",
          audience: "100k",
          rating: "4",
          charges: "$45/Recording",
        },
        {
          img: "",
          fullName: "Lorem Ipsum",
          userName: "Lorem Ipsum",
          gender: "Female",
          audience: "100k",
          rating: "4",
          charges: "$45/Recording",
        },
        {
          userName: "Lorem Ipsum",
          rating: "4",
          charges: "$45/Recording",
        },
      ],

      // filters veriables
      availableItems: [
        { name: "YES", value: "true" },
        { name: "NO", value: "false" },
        { name: "ALL", value: "all" },
      ],
    };
  },
};

// Headers
</script>

import axios from "@axios"; import { VDataTableServer } from
"vuetify/lib/components/index.mjs"; import axios from "@axios"; import {
VDataTableServer } from "vuetify/lib/components/index.mjs"; import axios from
"@axios"; import { VDataTableServer } from "vuetify/lib/components/index.mjs";
import axios from "@axios"; import { VDataTableServer } from
"vuetify/lib/components/index.mjs"; import axios from "@axios"; import {
VDataTableServer } from "vuetify/lib/components/index.mjs"; import axios from
"@axios"; import { VDataTableServer } from "vuetify/lib/components/index.mjs";
