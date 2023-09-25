<template>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <VBtn color="primary" @click="refInputEl?.click()">
          <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
          <span class="d-none d-sm-block">Upload Customers</span>
        </VBtn>
        <input
          ref="refInputEl"
          type="file"
          name="file"
          accept=".csv"
          hidden
          @input="uploadCustomerCsv"
        />

        <VSpacer />

        <div class="app-user-search-filter d-flex align-center gap-6">
          <!-- 👉 Search  -->
          <VTextField
            v-model="searchQuery"
            placeholder="Search User"
            density="compact"
          />

          <!-- 👉 Add user button -->
          <VBtn @click="isAddNewUserDrawerVisible = true"> Add Customer </VBtn>
        </div>
      </VCardText>

      <!-- SECTION data table -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="customers"
        :items-length="totalUsers"
        :headers="headers"
        show-select
        class="rounded-0"
        @update:options="options = $event"
      >
        <!-- Email -->
        <!-- <template #item.email="{ item }">
          <span class="text-sm">
            {{ item.raw.email }}
          </span>
        </template> -->

        <!-- Status -->
        <!-- <template #item.status="{ item }">
          <VChip
            :color="resolveUserStatusVariant(item.raw.status)"
            density="comfortable"
            class="text-capitalize"
          >
            {{ item.raw.status }}
          </VChip>
        </template> -->

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="mdi-dots-vertical" />

            <VMenu activator="parent">
              <VList>
                <VListItem link @click="isUserInfoEditDialogVisible = true">
                  <template #prepend>
                    <VIcon icon="mdi-pencil-outline" />
                  </template>
                  <VListItemTitle>Edit</VListItemTitle>
                </VListItem>

                <VListItem @click="deleteUser(item.raw.id)">
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
    <AddNewUserDrawer
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />

    <!-- <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="props.userData"
  /> -->
  </section>
</template>

<script setup>
import { VDataTableServer } from "vuetify/labs/VDataTable";
// import { paginationMeta } from '@/@fake-db/utils'
import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue";
import { useUserListStore } from "@/views/apps/user/useUserListStore";
import axios from "@axios";

const userListStore = useUserListStore();
const searchQuery = ref("");
const selectedRole = ref();
const selectedPlan = ref();
const selectedStatus = ref();
const totalPage = ref(1);
const totalUsers = ref(0);
const customers = ref([]);
const refInputEl = ref();
const isUserInfoEditDialogVisible = ref(false);

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
    title: "First Name",
    key: "firstname",
  },
  {
    title: "Last Name",
    key: "lastname",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Phone",
    key: "role",
  },
  {
    title: "Customers AOV",
    key: "aov",
  },
  {
    title: "Repeated Customer",
    key: "repeated",
  },

  {
    title: "ACTION",
    key: "actions",
    sortable: false,
  },
];

const uploadCustomerCsv = (file) => {
  const fileReader = new FileReader();
  const { files } = file.target;
  const myCSV = files[0];
  console.log(myCSV);
  let data = new FormData();
  data.append("file", myCSV);
  axios
    .post(`upload-customers`, data)

    .then((res) => {
      console.log(res);
    })
    .catch((error) => {});
  // if (files && files.length) {
  //   fileReader.readAsDataURL(files[0]);
  //   fileReader.onload = () => {
  //     if (typeof fileReader.result === "string")
  //       accountDataLocal.value.avatarImg = fileReader.result;
  //   };
  // }
};
// 👉 Fetching users
const fetchCustomers = () => {
  axios
    .get(`list-customers?pageSize=10&pageNo=1`)
    .then((response) => {
      console.log("user", response.data);
      customers.value = response.data.data;
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};

watchEffect(fetchCustomers);

const isAddNewUserDrawerVisible = ref(false);

const addNewUser = (userData) => {
  userListStore.addUser(userData);

  // refetch User
  fetchCustomers();
};

const deleteUser = (id) => {
  userListStore.deleteUser(id);

  // refetch User
  fetchCustomers();
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
