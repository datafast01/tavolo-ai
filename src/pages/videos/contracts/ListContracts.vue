<template>
  <section>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>

    <v-row justify="end" class="pb-3">
      <v-col cols="3" class="float-right">
        <v-text-field
          style="width: 200px"
          label="Search"
          append-inner-icon="mdi-magnify"
          variant="solo-filled"
          class="float-right"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <Dropdown />
      </v-col>
    </v-row>

    <VCard>
      <!-- SECTION data table -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="sampleInfluncerData"
        :items-length="totalUsers"
        :headers="headers"
        class="rounded-0"
        :loading="isLoading"
        item-key="key"
        @click:row="viewDetails"
      >
        <!-- Seegments -->
        <!-- <template #item.profilePhoto="{ item }">
          <div class="py-3">fullName</div>
        </template> -->
        <template #item.status="{ item }">
          <VChip
            :color="item.status ? 'primary' : 'error'"
            :class="`text-${item.status ? 'primary' : 'error'}`"
            size="small"
            class="font-weight-medium"
          >
            {{ item.status ? "YES" : "NO" }}
          </VChip>
        </template>

        <template #item.dateofAgreement="{ item }">
          <span class="text-sm">
            {{
              item.dateofAgreement == null
                ? "Date Not Available"
                : moment(item.dateofAgreement).format("MMMM Do YYYY, h:mm:ss a")
            }}
          </span>
        </template>

        <template #item.paymentPlan="{ item }">
          <div class="d-flex flex-column">
            <span class="text-sm">
              {{ item.paymentPlan }}
            </span>
            <small>
              {{ item.pricing }}
            </small>
          </div>
        </template>

        <template #item.details="{ item }"
          ><v-btn elevation="24" size="small">
            DETAILS
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
        </template>

        <!-- Pagination -->
        <template #bottom>
          <!-- <VDivider /> -->

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
  </section>
</template>

<script setup>
import moment from "moment";
import { VDataTableServer } from "vuetify/lib/components/index.mjs";
// import { paginationMeta } from '@/@fake-db/utils'
// import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue";
import { useUserListStore } from "@/views/apps/user/useUserListStore";
import { useRouter } from "vue-router";
import Dropdown from "./Dropdown.vue";

const userListStore = useUserListStore();
const searchQuery = ref("");
let isLoading = ref(false);
const totalUsers = ref(0);
const menuItems = ref([]);
const refInputEl = ref();
let isUserInfoEditDialogVisible = ref(false);
let myMenuItem = ref({});
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
    id: 0,
    title: "Influencer Name",
    key: "influencerName",
  },
  {
    id: 1,
    title: "Social Media Username",
    key: "socialMediaUsername",
  },
  {
    id: 2,
    title: "Contract Title",
    key: "contractTitle",
  },
  {
    id: 3,
    title: "Date of Agreement",
    key: "dateofAgreement",
  },
  {
    id: 4,
    title: "Payment Plan",
    key: "paymentPlan",
  },
  {
    id: 5,
    title: "Status",
    key: "status",
  },
  {
    id: 6,
    title: "Details",
    key: "details",
  },
];

const sampleInfluncerData = [
  {
    id: 0,
    img: "",
    influencerName: "Lorem Ipsum",
    socialMediaUsername: "Lorem Ipsum",
    contractTitle: "Lorem Ipsum",
    dateofAgreement: "2023-09-28",
    paymentPlan: "Popular",
    status: true,
    details: "",
    pricing: "$45/Recording",
  },
  {
    id: 1,
    img: "",
    influencerName: "Lorem Ipsum",
    socialMediaUsername: "Lorem Ipsum",
    contractTitle: "Lorem Ipsum",
    dateofAgreement: "2023-09-28",
    paymentPlan: "Popular",
    status: false,
    details: "",
    pricing: "$45/Recording",
  },
  {
    id: 2,
    img: "",
    influencerName: "Lorem Ipsum",
    socialMediaUsername: "Lorem Ipsum",
    contractTitle: "Lorem Ipsum",
    dateofAgreement: "2023-09-28",
    paymentPlan: "Popular",
    status: "4",
    details: "",
    pricing: "$45/Recording",
  },
  {
    id: 3,
    img: "",
    influencerName: "Lorem Ipsum",
    socialMediaUsername: "Lorem Ipsum",
    contractTitle: "Lorem Ipsum",
    dateofAgreement: "2023-09-28",
    paymentPlan: "Popular",
    status: "4",
    details: "",
    pricing: "$45/Recording",
  },
  {
    id: 4,
    img: "",
    influencerName: "Lorem Ipsum",
    socialMediaUsername: "Lorem Ipsum",
    contractTitle: "Lorem Ipsum",
    dateofAgreement: "2023-09-28",
    paymentPlan: "Popular",
    status: "4",
    details: "",
    pricing: "$45/Recording",
  },
  {
    id: 5,
    contractTitle: "Lorem Ipsum",
    status: "4",
    details: "",
    pricing: "$45/Recording",
  },
];

const router = useRouter();
const route = useRoute();
const viewDetails = (item, row) => {
  router.push({ path: `/contract-details/${row.item.id}` });
  console.log(row.item);
};
</script>

<style lang="scss">
.app-user-search-filter {
  inline-size: 24.0625rem;
}

.text-capitalize {
  text-transform: capitalize;
}
.blue-darke {
  background-color: #9155fd;
}
.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
