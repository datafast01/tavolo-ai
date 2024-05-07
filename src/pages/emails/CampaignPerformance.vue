<template>
  <div>
    <v-row>
      <v-col class="align-self-center">Total Sent Campaigns: 43</v-col>
      <v-col class="d-flex input-cutom">
        <v-text-field style="width: 200px" label="Search" append-inner-icon="mdi-magnify"
          variant="solo-filled"></v-text-field>
        <VBtn class="ml-3" size="large"> Filter </VBtn>
      </v-col>
    </v-row>
    <VCard style="border: none" class="my-4">
      <VCardTitle> Key Performance Indicators </VCardTitle>
      <VCardText class="d-flex align-center justify-space-between">
        <v-carousel hide-delimiters height="400" show-arrows hide-delimiter-background>
          <template v-slot:prev="{ props }">
            <v-icon @click="props.onClick">mdi-chevron-left</v-icon>
          </template>
          <template v-slot:next="{ props }">
            <!-- <v-btn variant="elevated" color="info" @click="props.onClick"
              >Next slide</v-btn
            > -->
            <v-icon @click="props.onClick">mdi-chevron-right</v-icon>
          </template>
          <template v-for="(item, index) in slider">
            <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
              <v-row class="">
                <template v-for="(n, i) in columns">
                  <template v-if="+index + i < slider.length">
                    <v-col :key="i" style="width: 50%; height: 300px">
                      <div class="mt-5">Campaign Name</div>
                      <BarChart :chart-data="data" :chart-options="chartOptions" />
                    </v-col>
                  </template>
                </template>
              </v-row>
            </v-carousel-item>
          </template>
        </v-carousel>
      </VCardText>
    </VCard>
    <!-- SECTION data table -->

    <VDataTableServer v-model:items-per-page="options.itemsPerPage" v-model:page="options.page" :items="campaigns"
      :items-length="totalUsers" :headers="headers" class="rounded-0" @update:options="options = $event"
      :loading="isLoading">
      <!-- Email -->
      <template #item.segmantId="{ item }">
        <span class="text-sm">
          {{ item.segmantId.name }}
        </span>
      </template>
      <template #item.createdAt="{ item }">
        <span class="text-sm">
          {{ moment(item.createdAt).format("ll") }}

        </span>
      </template>


      <!-- Pagination -->
      <template #bottom>
        <VDivider />

        <div class="d-flex justify-end gap-x-6 pa-2 flex-wrap">
          <div class="d-flex align-center gap-x-2 text-sm">
            Rows Per Page:
            <VSelect v-model="options.itemsPerPage" class="per-page-select text-high-emphasis" variant="plain"
              density="compact" :items="[10, 20, 25, 50, 100]" />
          </div>

          <!-- <span class="d-flex align-center text-sm me-2 text-high-emphasis">{{ paginationMeta(options, totalUsers) }}</span> -->

          <div class="d-flex gap-x-2 align-center me-2">
            <VBtn icon="mdi-chevron-left" class="flip-in-rtl" variant="text" density="comfortable" color="default"
              :disabled="options.page <= 1" @click="options.page <= 1 ? (options.page = 1) : options.page" />

            <VBtn icon="mdi-chevron-right" class="flip-in-rtl" density="comfortable" variant="text" color="default"
              :disabled="options.page >= Math.ceil(totalUsers / options.itemsPerPage)
                " @click="
                  options.page >= Math.ceil(totalUsers / options.itemsPerPage)
                    ? (options.page = Math.ceil(
                      totalUsers / options.itemsPerPage
                    ))
                    : options.page++
                  " />
          </div>
        </div>
      </template>
    </VDataTableServer>
  </div>
</template>

<script setup>
import BarChart from "@/@core/libs/chartjs/components/BarChart";
import { getLatestBarChartConfig } from "@core/libs/chartjs/chartjsConfig";
import { useTheme } from "vuetify";
import { VDataTableServer } from "vuetify/lib/components/index.mjs";
import axios from "@axios";
import moment from "moment";

// import { paginationMeta } from '@/@fake-db/utils'
// import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue";

// import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";

let isLoading = ref(false);
const totalUsers = ref(0);
const slider = [
  "red",
  "green",
  "orange",
  "blue",
  "pink",
  "purple",
  "indigo",
  "cyan",
  "deep-purple",
  "light-green",
  "deep-orange",
  "blue-grey",
];
const columns = 4;
const campaigns = ref([]);

let show = ref(false);
let snkMsg = ref("");
let color = ref("#9575CD");

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
});

// Headers
const headers = [
  {
    title: "Campaign Name",
    key: "subject",
  },
  {
    title: "Date Sent",
    key: "createdAt",
  },
  {
    title: "Delivered %",
    key: "percentage",
  },
  {
    title: "Opened %",
    key: "opened",
  },
  {
    title: "Clicked %",
    key: "date",
  },
  {
    title: "Segmentation",
    key: "segmantId",
  },
];
const vuetifyTheme = useTheme();
const chartOptions = computed(() =>
  getLatestBarChartConfig(vuetifyTheme.current.value)
);

const getEamils = (item) => {
  axios
    .get(
      `dashboard/list-schedule-email?pageNo=1&pageSize=10`
    )
    .then((response) => {
      show.value = true;
      campaigns.value = response.data.data
      console.log(response)
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};
getEamils()

const data = {
  labels: ["", "", ""],
  datasets: [
    {
      maxBarThickness: 51,
      backgroundColor: ["#9660FA", "#BE9BFF", "#BC98FE"],
      borderColor: "transparent",
      borderRadius: {
        topRight: 15,
        topLeft: 15,
      },
      data: [27, 90, 19, 1],
    },
  ],
};

// 👉 Fetching users
// const fetchCustomers = () => {
//   isLoading.value = true;
//   axios
//     .get(
//       `list-customers?pageNo=${options.value.page}&pageSize=${options.value.itemsPerPage}`
//     )
//     .then((response) => {
//       customers.value = response.data.data;
//       isLoading.value = false;
//       store.dispatch("getPackageHistory");
//     })
//     .catch((err) => {
//       console.log(err.response.status);
//       snkMsg.value = "Connect to Clover";
//       isLoading.value = false;
//     });
// };

// watchEffect(fetchCustomers);
</script>

<style>
.input-cutom .v-input--density-default .v-field--variant-solo-filled {
  --v-input-control-height: 18px;
  --v-field-padding-bottom: 0px;
}
</style>
