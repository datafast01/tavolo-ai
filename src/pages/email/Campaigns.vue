<template>
  <section>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <VCard>
      <!-- SECTION data table -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="customers"
        :items-length="totalUsers"
        :headers="headers"
        class="rounded-0"
        @update:options="options = $event"
        :loading="isLoading"
      >
        <!-- Seegments -->
        <template #item.segmantId="{ item }">
          <span class="text-sm">
            {{ item.raw.segmantId.name }}
          </span>
        </template>

        <template #item.sent="{ item }">
          <VChip
            :color="item.raw.sent ? 'primary' : 'error'"
            :class="`text-${item.raw.sent ? 'primary' : 'error'}`"
            size="small"
            class="font-weight-medium"
          >
            {{ item.raw.sent ? "YES" : "NO" }}
          </VChip>
        </template>
        <template #item.scheduleDate="{ item }">
          <span class="text-sm">
            {{
              item.raw.scheduleDate === null
                ? "Date Not Available"
                : moment(item.raw.scheduleDate).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )
            }}
          </span>
        </template>
        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            :color="item.raw.status == 'active' ? 'success' : 'error'"
            :class="`text-${item.raw.status == 'active' ? 'success' : 'error'}`"
            size="small"
            class="font-weight-medium"
          >
            {{ item.raw.status == "active" ? "Active" : "Inactive" }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="mdi-dots-vertical" />

            <VMenu activator="parent">
              <VList>
                <VListItem @click="changeStatus(item.raw)">
                  <template #prepend>
                    <VIcon icon="mdi-recycle" />
                  </template>
                  <VListItemTitle>Change Status</VListItemTitle>
                </VListItem>
                <VListItem @click="deleteCampaign(item.raw._id)">
                  <template #prepend>
                    <VIcon icon="mdi-delete-outline" />
                  </template>
                  <VListItemTitle>Delete</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>

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
                @click="options.page <= 1 ? (options.page = 1) : options.page--"
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

    <!-- 👉 Add New User -->
  </section>
</template>

<script setup>
import moment from "moment";
import { VDataTableServer } from "vuetify/labs/VDataTable";

import axios from "@axios";

const totalUsers = ref(0);
const customers = ref([]);

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
let isLoading = ref(false);
// Headers
const headers = [
  {
    title: "Segment Name",
    key: "segmantId",
  },
  {
    title: "Subject",
    key: "subject",
  },
  {
    title: "Sent",
    key: "sent",
  },
  {
    title: "Schedule Date",
    key: "scheduleDate",
  },
  {
    title: "Status",
    key: "status",
  },

  {
    title: "ACTION",
    key: "actions",
    sortable: false,
  },
];

const segments = [
  { id: "650e0f5b6df52a436ca3f12e", name: "All Customers" },
  { id: "650e0f896df52a436ca3f130", name: "Customers with AOV > 20" },

  { id: "650e0fc86df52a436ca3f132", name: "Customers with AOV < 20" },

  { id: "650e10236df52a436ca3f134", name: "Customers who haven't repeated" },
  { id: "650e106d6df52a436ca3f136", name: "Customers who repeated this week" },
];

// const segmantName = (segmantId) => {
//   const segmant = segments.find((seg) => seg.id == segmantId);

//   return segmant.name;
// };
// 👉 Fetching users
const fetchEmails = () => {
  isLoading.value = true;
  axios
    .get(
      `dashboard/list-schedule-email?pageSize=${options.value.itemsPerPage}&pageNo=${options.value.page}`
    )
    .then((response) => {
      console.log("user", response.data);
      customers.value = response.data.data;
      totalUsers.value = response.data.count;
      isLoading.value = false;
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};

watchEffect(fetchEmails);

const isAddNewUserDrawerVisible = ref(false);

const changeStatus = (item) => {
  console.log(item);

  axios
    .get(
      `dashboard/${
        item.status == "active"
          ? "pause-schedule-email"
          : "resume-schedule-email"
      }/${item._id}`
    )
    .then((response) => {
      console.log("user", response.data);
      show.value = true;
      snkMsg.value = `${
        item.status == "active"
          ? "Campaign Inactivated!"
          : "Campaing Activated!"
      }`;
      fetchEmails();
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};

const deleteCampaign = (id) => {
  // console.log("submit form", ApiService);

  axios
    .get(`dashboard/delete-schedule-email/${id}`)
    .then((response) => {
      console.log("user", response.data);

      show.value = true;
      snkMsg.value = "Campaign deleted successfully!";
      fetchEmails();
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};
</script>

<style lang="scss">
.app-user-search-filter {
  inline-size: 24.0625rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
