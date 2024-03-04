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
        :items="sampleInfluncerData"
        :items-length="totalUsers"
        :headers="headers"
        class="rounded-0"
        @update:options="options = $event"
        :loading="isLoading"
        item-key="key"
        @click:row="viewDetails"
      >
        <!-- Seegments -->
        <template #item.profilePhoto="{ item }">
          <div class="py-3">fullName</div>
        </template>
        <template #item.charges="{ item }">
          <button class="blue-darke px-2 py-1 rounded">
            DETAILS
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
          </button>
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
import { VDataTableServer } from "vuetify/lib/components/index.mjs";
// import { paginationMeta } from '@/@fake-db/utils'
// import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue";
import { useUserListStore } from "@/views/apps/user/useUserListStore";
import { useRouter } from "vue-router";

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
    key: "profilePhoto",
  },
  {
    id: 1,
    title: "Social Media Username",
    key: "fullName",
  },
  {
    id: 2,
    title: "Contract Title",
    key: "userName",
  },
  {
    id: 3,
    title: "Date of Agreement",
    key: "gender",
  },
  {
    id: 4,
    title: "Payment Plan",
    key: "audience",
  },
  {
    id: 5,
    title: "Status",
    key: "rating",
  },
  {
    id: 6,
    title: "Details",
    key: "charges",
  },
];

const sampleInfluncerData = [
  {
    id: 0,
    img: "",
    fullName: "Lorem Ipsum",
    userName: "Lorem Ipsum",
    gender: "male",
    audience: "200",
    rating: "4",
    charges: "$45/Recording",
  },
  {
    id: 1,
    img: "",
    fullName: "Lorem Ipsum",
    userName: "Lorem Ipsum",
    gender: "male",
    audience: "200",
    rating: "4",
    charges: "$45/Recording",
  },
  {
    id: 2,
    img: "",
    fullName: "Lorem Ipsum",
    userName: "Lorem Ipsum",
    gender: "Female",
    audience: "500k",
    rating: "4",
    charges: "$45/Recording",
  },
  {
    id: 3,
    img: "",
    fullName: "Lorem Ipsum",
    userName: "Lorem Ipsum",
    gender: "male",
    audience: "100k",
    rating: "4",
    charges: "$45/Recording",
  },
  {
    id: 4,
    img: "",
    fullName: "Lorem Ipsum",
    userName: "Lorem Ipsum",
    gender: "Female",
    audience: "100k",
    rating: "4",
    charges: "$45/Recording",
  },
  {
    id: 5,
    userName: "Lorem Ipsum",
    rating: "4",
    charges: "$45/Recording",
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
