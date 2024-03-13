<template>
  <section>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>

    <VCard style="border: none">
      <VCardText class="d-flex align-center input-cutom justify-space-between">
        <div>Total Sent Campaigns: 43</div>
        <div class="d-flex">
          <v-text-field
            style="width: 200px"
            label="Search"
            append-inner-icon="mdi-magnify"
            variant="solo-filled"
          ></v-text-field>
          <VBtn class="ml-3" size="large"> Filter </VBtn>
        </div>
      </VCardText>

      <!-- SECTION data table -->

      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="campaigns"
        :items-length="totalUsers"
        :headers="headers"
        class="rounded-0"
        @update:options="options = $event"
        :loading="isLoading"
      >
        <!-- Email -->
        <!-- <template #item.email="{ item }">
          <span class="text-sm">
            {{ item.email }}
          </span>
        </template> -->

        <!-- Pagination -->
        <template #bottom>
          <VDivider />

          <div class="d-flex justify-end gap-x-6 pa-2 flex-wrap">
            <div class="d-flex align-center gap-x-2 text-sm">
              Rows Per Page:
              <VSelect
                v-model="options.itemsPerPage"
                class="per-page-select text-high-emphasis"
                variant="plain"
                density="compact"
                :items="[10, 20, 25, 50, 100]"
              />
            </div>

            <!-- <span class="d-flex align-center text-sm me-2 text-high-emphasis">{{ paginationMeta(options, totalUsers) }}</span> -->

            <div class="d-flex gap-x-2 align-center me-2">
              <VBtn
                icon="mdi-chevron-left"
                class="flip-in-rtl"
                variant="text"
                density="comfortable"
                color="default"
                :disabled="options.page <= 1"
                @click="options.page <= 1 ? (options.page = 1) : options.page"
              />

              <VBtn
                icon="mdi-chevron-right"
                class="flip-in-rtl"
                density="comfortable"
                variant="text"
                color="default"
                :disabled="
                  options.page >= Math.ceil(totalUsers / options.itemsPerPage)
                "
                @click="
                  options.page >= Math.ceil(totalUsers / options.itemsPerPage)
                    ? (options.page = Math.ceil(
                        totalUsers / options.itemsPerPage
                      ))
                    : options.page++
                "
              />
            </div>
          </div>
        </template>
      </VDataTableServer>

      <!-- SECTION -->
    </VCard>
  </section>
</template>

<script setup>
import { VDataTableServer } from "vuetify/lib/components/index.mjs";
// import { paginationMeta } from '@/@fake-db/utils'
// import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue";

// import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";

let isLoading = ref(false);
const totalUsers = ref(0);
const campaigns = [
  {
    campaignName: "Campaign 1",
    date: "01/01/2024",
    edited: false,
    segment: "Segment 1",
  },
  {
    campaignName: "Campaign 2",
    date: "01/02/2024",
    edited: false,
    segment: "Segment 2",
  },
  {
    campaignName: "Campaign 3",
    date: "01/03/2024",
    edited: true,
    segment: "Segment 3",
  },
  {
    campaignName: "Campaign 4",
    date: "01/04/2024",
    edited: false,
    segment: "Segment 4",
  },
  {
    campaignName: "Campaign 5",
    date: "01/05/2024",
    edited: true,
    segment: "Segment 5",
  },
];

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
    key: "campaignName",
  },
  {
    title: "Date",
    key: "date",
  },
  {
    title: "Segmentation",
    key: "segment",
  },
];

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
