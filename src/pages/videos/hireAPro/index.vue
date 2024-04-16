<template>
  <section>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>

    <VCard>
      <!-- SECTION data table -->
      <VDataTableServer v-model:items-per-page="options.itemsPerPage" v-model:page="options.page"
        :items="influencersList" :items-length="totalUsers" :headers="headers" class="rounded-0"
        @update:options="options = $event" :loading="isLoading" item-key="key" @click:row="viewDetails">
        <!-- Seegments -->
        <template #item.avatar="{ item }">

          <div class="py-3">
            <img :src="'http://16.171.214.197:8081/' + item.avatar" alt="" width="55" height="50" srcset=""
              style="border-radius: 50%;" v-if="item.avatar" />
            <img :src="avatar" alt="" width="55" height="50" srcset="" style="border-radius: 50%;" v-else />
          </div>
        </template>
        <template #item.firstName="{ item }">

          <div class="py-3">
            {{ item.firstName }} {{ item.lastName }}
          </div>
        </template>

        <!-- Status -->

        <!-- Actions -->

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
                :disabled="options.page <= 1" @click="options.page <= 1 ? (options.page = 1) : options.page--" />

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
      <!-- SECTION -->
    </VCard>
  </section>
</template>

<script setup>
import avatar from "@/assets/images/avatars/avatar-1.png";

import { VDataTableServer } from "vuetify/lib/components/index.mjs";
// import { paginationMeta } from '@/@fake-db/utils'
// import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue";
import { useUserListStore } from "@/views/apps/user/useUserListStore";
import axios from "@axios";
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
const repeated = ref(null);
const availableItems = ref([
  { name: "YES", value: "true" },
  { name: "NO", value: "false" },
  { name: "ALL", value: "all" },
]);
const rangeItems = ref([
  { name: "Greater than", value: "greater" },
  { name: "Less than", value: "smaller" },

  { name: "Equals To", value: "equals" },
]);
// Headers
const headers = [
  {
    id: 0,
    title: "Profile Photo",
    key: "avatar",
  },
  {
    id: 1,
    title: "Full Name",
    key: "firstName",
  },
  {
    id: 2,
    title: "Social Media Username",
    key: "userName",
  },
  {
    id: 3,
    title: "Gender",
    key: "gender",
  },
  {
    id: 4,
    title: "Audience",
    key: "audience",
  },
  {
    id: 5,
    title: "Rating",
    key: "rating",
  },
  {
    id: 6,
    title: "Charges",
    key: "charges",
  },
];




let influencersList = ref([])

// 👉 Fetching users

const getInfluencers = () => {
  isLoading.value = true;
  axios
    .get(
      `influencer/list?pageNo=1&pageSize=10`
    )
    .then((response) => {
      console.log("user", response.data);
      influencersList.value = response.data.data;
      isLoading.value = false;
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};

getInfluencers()

const editMenuItemData = (data) => {
  isUserInfoEditDialogVisible.value = true;
  console.log(data);
  myMenuItem.value = data;
};
// watchEffect(fetchMenuItems);

const isAddNewUserDrawerVisible = ref(false);

const addMenuItem = (userData) => {
  axios
    .post(`food-item/create`, userData)
    .then((response) => {
      console.log("user", response.data);
      show.value = true;
      snkMsg.value = "Menu Item has been added successfully";
      menuItems.value.push(userData);

      fetchMenuItems();
    })
    .catch((err) => {
      console.log(err.response);
      show.value = true;
      if (err.response.status == 400) {
        snkMsg.value = err.response.data.error;
      } else {
        snkMsg.value = "Something went wrong";
      }
      color.value = "error";
    });
};

const updateMenuItem = (userData) => {
  let payload = {
    name: userData.name,
    price: userData.price,
    noOfCustomersOrdered: userData.noOfCustomersOrdered,
    noOfTimesOrdered: userData.noOfTimesOrdered,
    percentageOfTotalRevenue: userData.percentageOfTotalRevenue,
    available: userData.available,
  };
  axios
    .post(`food-item/update/${userData._id}`, payload)
    .then((response) => {
      console.log("user", response.data);
      show.value = true;
      snkMsg.value = "Menu Item has been updated successfully";
      fetchMenuItems();
    })
    .catch((err) => {
      console.log(err.response);
      show.value = true;
      if (err.response.status == 400) {
        snkMsg.value = err.response.data.error;
      } else {
        snkMsg.value = "Something went wrong";
      }
      color.value = "error";
    });
};
const deleteMenuItem = (id) => {
  console.log(id);
  axios
    .get(`food-item/delete/${id}`)
    .then((response) => {
      console.log("user", response.data);
      show.value = true;
      snkMsg.value = "Menu Item has been deleted successfully";
      fetchMenuItems();
    })
    .catch((err) => {
      console.log(err.response);
      show.value = true;
      if (err.response.status == 400) {
        snkMsg.value = err.response.data.error;
      } else {
        snkMsg.value = "Something went wrong";
      }
      color.value = "error";
    });
};
const router = useRouter();
const route = useRoute();
const viewDetails = (item, row) => {

  router.push({
    path: `/influencer-details/${row.item._id}`
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
