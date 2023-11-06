<template>
  <section>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <VSpacer />

        <div class="app-user-search-filter d-flex align-center gap-6">
          <!-- 👉 Search  -->
          <VTextField
            v-model="searchQuery"
            placeholder="Search User"
            density="compact"
          />

          <!-- 👉 Add user button -->
          <VBtn @click="isAddNewUserDrawerVisible = true"> Add Menu Item </VBtn>
        </div>
      </VCardText>

      <!-- SECTION data table -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="menuItems"
        :items-length="totalUsers"
        :headers="headers"
        class="rounded-0"
        @update:options="options = $event"
        :loading="isLoading"
      >
        <!-- Email -->
        <template #item.price="{ item }">
          <span class="text-sm">
            {{ formatCurrency(parseFloat(item.raw.price), "USD") }}
          </span>
        </template>
        <template #item.percentageOfTotalRevenue="{ item }">
          <span class="text-sm">
            {{ item.raw.percentageOfTotalRevenue }}%
          </span>
        </template>

        <!-- Status -->
        <template #item.available="{ item }">
          <VIcon
            icon="mdi-check-outline"
            color="primary"
            v-if="item.raw.available"
          />
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="mdi-dots-vertical" />

            <VMenu activator="parent">
              <VList>
                <VListItem link @click="editMenuItemData(item.raw)">
                  <template #prepend>
                    <VIcon icon="mdi-pencil-outline" />
                  </template>
                  <VListItemTitle>Edit</VListItemTitle>
                </VListItem>

                <VListItem @click="deleteMenuItem(item.raw._id)">
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
    <AddMenuItem
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addMenuItem"
    />

    <EditMenuItem
      v-model:isDrawerOpen="isUserInfoEditDialogVisible"
      :menuItemData="myMenuItem"
      @user-data="updateMenuItem"
    />
  </section>
</template>

<script setup>
import { VDataTableServer } from "vuetify/labs/VDataTable";
// import { paginationMeta } from '@/@fake-db/utils'
// import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue";
import { useUserListStore } from "@/views/apps/user/useUserListStore";
import axios from "@axios";
import AddMenuItem from "./AddMenuItem.vue";
import EditMenuItem from "./EditMenuItem.vue";

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
    title: "Menu Item",
    key: "name",
  },
  {
    title: "NO. Of Customers Ordered",
    key: "noOfCustomersOrdered",
  },
  {
    title: "NO. Of Times Ordered",
    key: "noOfTimesOrdered",
  },
  {
    title: "Percentage Of Total Revenue",
    key: "percentageOfTotalRevenue",
  },
  {
    title: "Price",
    key: "price",
  },

  {
    title: "Availability",
    key: "available",
  },

  {
    title: "ACTION",
    key: "actions",
    sortable: false,
  },
];

// 👉 Fetching users
const fetchMenuItems = () => {
  isLoading.value = true;
  axios
    .get(
      `food-item/list?pageSize=${options.value.itemsPerPage}&page=${options.value.page}`
    )
    .then((response) => {
      console.log("user", response.data);
      menuItems.value = response.data.data;
      isLoading.value = false;
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};

const editMenuItemData = (data) => {
  isUserInfoEditDialogVisible.value = true;
  console.log(data);
  myMenuItem.value = data;
};
watchEffect(fetchMenuItems);

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

const formatCurrency = (number, currencyCode = "USD") => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: currencyCode,
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
