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
            {{ item.raw.segmantId?.name }}
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

<script>
import moment from "moment";
import { VDataTableServer } from "vuetify/labs/VDataTable";

import axios from "@axios";

export default {
  components: { VDataTableServer },
  data() {
    return {
      totalUsers: 0,
      customers: [],
      moment: moment,
      show: false,
      snkMsg: "",
      color: "#9575CD",
      options: {
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        groupBy: [],
        search: undefined,
      },
      isLoading: false,
      // Headers
      headers: [
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
      ],
    };
  },
  methods: {
    fetchEmails() {
      this.isLoading = true;
      axios
        .get(
          `dashboard/list-schedule-email?pageSize=${this.options.itemsPerPage}&pageNo=${this.options.page}`
        )
        .then((response) => {
          console.log("user", response.data);
          this.customers = response.data.data;
          this.totalUsers = response.data.count;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response.status);
        });
    },

    changeStatus(item) {
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
          this.show = true;
          this.snkMsg = `${
            item.status == "active"
              ? "Campaign Inactivated!"
              : "Campaing Activated!"
          }`;
          this.fetchEmails();
        })
        .catch((err) => {
          console.log(err.response.status);
        });
    },

    deleteCampaign(id) {
      // console.log("submit form", ApiService);

      axios
        .get(`dashboard/delete-schedule-email/${id}`)
        .then((response) => {
          console.log("user", response.data);

          this.show = true;
          this.snkMsg = "Campaign deleted successfully!";
          this.fetchEmails();
        })
        .catch((err) => {
          console.log(err.response.status);
        });
    },
  },
  mounted() {
    this.fetchEmails();
  },
};

// 👉 Fetching users
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
