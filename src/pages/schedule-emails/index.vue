<template>
  <section>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <v-expansion-panels class="mb-3">
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
    </v-expansion-panels>
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
            {{ item.segmantId?.name }}
          </span>
        </template>

        <template #item.sent="{ item }">
          <VChip
            :color="item.sent ? 'primary' : 'error'"
            :class="`text-${item.sent ? 'primary' : 'error'}`"
            size="small"
            class="font-weight-medium"
          >
            {{ item.sent ? "YES" : "NO" }}
          </VChip>
        </template>
        <template #item.scheduleDate="{ item }">
          <span class="text-sm">
            {{
              item.scheduleDate === null
                ? "Date Not Available"
                : moment(item.scheduleDate).format("MMMM Do YYYY, h:mm:ss a")
            }}
          </span>
        </template>
        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            :color="item.status == 'active' ? 'success' : 'error'"
            :class="`text-${item.status == 'active' ? 'success' : 'error'}`"
            size="small"
            class="font-weight-medium"
          >
            {{ item.status == "active" ? "Active" : "Inactive" }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="mdi-dots-vertical" />

            <VMenu activator="parent">
              <VList>
                <VListItem
                  @click="changeStatus(item.raw)"
                  v-if="item.scheduled"
                >
                  <template #prepend>
                    <VIcon icon="mdi-recycle" />
                  </template>
                  <VListItemTitle>Change Status</VListItemTitle>
                </VListItem>
                <VListItem @click="openViewDetailsModal(item.raw)">
                  <template #prepend>
                    <VIcon icon="mdi-eye" />
                  </template>
                  <VListItemTitle>View Details</VListItemTitle>
                </VListItem>
                <VListItem @click="deleteCampaign(item._id)">
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
    <VDialog v-model="isDetails" max-width="800">
      <!-- Dialog Activator -->

      <!-- Dialog Content -->
      <VCard title="Campaign Details">
        <DialogCloseBtn
          variant="text"
          size="small"
          @click="isDetails = false"
        />

        <VCardText>
          <VRow>
            <VCol cols="12" md="4">
              <div class="d-flex flex-column">
                <span class="font-weight-black"> Segment Name </span>
                <span>{{ details.segmantId.name }}</span>
              </div>
            </VCol>
            <VCol cols="12" md="4">
              <div class="d-flex flex-column">
                <span class="font-weight-black"> Schedule </span>

                {{ details.scheduled ? "YES" : "NO" }}
              </div>
            </VCol>
            <VCol cols="12" md="4">
              <div class="d-flex flex-column">
                <span class="font-weight-black"> Status </span>
                <VChip
                  :color="details.status == 'active' ? 'success' : 'error'"
                  :class="`text-${
                    details.status == 'active' ? 'success' : 'error'
                  }`"
                  size="small"
                  class="font-weight-medium"
                  style="width: fit-content"
                >
                  {{ details.status == "active" ? "Active" : "Inactive" }}
                </VChip>
              </div>
            </VCol>
          </VRow>
          <VRow class="mt-3">
            <span class="font-weight-black ml-3"> Email Opened By </span>
            <VCol cols="12">
              <!-- <VDataTableServer
                :items="details.openedBy"
                :headers="customerHeaders"
                class="rounded-0"
                :pagination="false"
              >
              </VDataTableServer> -->
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">First Name</th>
                    <th class="text-left">Last Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Phone</th>
                    <th class="text-left">AOV</th>
                    <th class="text-left">Total Visits</th>
                    <th class="text-left">Last Dining Behaviour</th>
                    <th class="text-left">Repeated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in details.openedBy" :key="item._id">
                    <td>{{ item.firstname }}</td>
                    <td>{{ item.lastname }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.aov }}</td>
                    <td>{{ item.totalVisits }}</td>
                    <td>{{ item.lastDiningBehaviour }}</td>
                    <td>{{ item.repeated }}</td>
                  </tr>
                </tbody>
              </v-table>
            </VCol>
          </VRow>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn color="secondary" @click="isDetails = false"> Close </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <!-- 👉 Add New User -->
  </section>
</template>

<script setup>
import axios from "@axios";
import { VDataTableServer } from "vuetify/lib/components/index.mjs";

const totalUsers = ref(0);
const customers = ref([]);

let show = ref(false);
let snkMsg = ref("");
let color = ref("#9575CD");
let isDetails = ref(false);
let details = ref({});
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

// filters veriables
const availableItems = ref([
  { name: "YES", value: "true" },
  { name: "NO", value: "false" },
  { name: "ALL", value: "all" },
]);

let emailSubject = ref("" || null);
let scheduledDate = ref("" || null);
let scheduled = ref(null);
let sent = ref(null);

const reset = () => {
  emailSubject.value = "";
  scheduledDate.value = "";
  scheduled.value = null;
  sent.value = null;

  fetchEmails();
};
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

const applyFilters = () => {
  isLoading.value = true;
  axios
    .get(
      `dashboard/list-schedule-email?pageSize=${options.value.itemsPerPage}&pageNo=${options.value.page}&subject=${emailSubject.value}&scheduled=${scheduled.value}&sent=${sent.value}&scheduledDate=${scheduledDate.value}`
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
const openViewDetailsModal = (item) => {
  isDetails.value = true;
  details.value = item;
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
