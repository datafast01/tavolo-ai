<script setup>
import axios from "@axios";
import avatar1 from "@images/avatars/avatar-1.png";

const accountData = {
  avatarImg: avatar1,
};

const refInputEl = ref();
const refInputCus = ref();

const isConfirmDialogOpen = ref(false);
const accountDataLocal = ref(structuredClone(accountData));
const isAccountDeactivated = ref(false);
let userData = ref({});
const validateAccountDeactivation = [
  (v) => !!v || "Please confirm account deactivation",
];

// update dashboard data
const updateDashboard = (file) => {
  const { files } = file.target;
  const myCSV = files[0];
  console.log(myCSV);
  let data = new FormData();
  data.append("file", myCSV);
  axios
    .post(`dashboard/upload`, data)

    .then((res) => {
      if (res.data.data != null) {
        console.log(res.data.data, "=============>>>");
      }
    })
    .catch((error) => {});
};

// update customers data
const updateCustomer = (file) => {
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
    .catch((error) => {
      console.log(error);
    });
};

const getUserProfile = () => {
  // console.log("submit form", ApiService);
  axios
    .get(`getprofile`)
    .then((response) => {
      console.log("user", response.data);
      userData.value = response.data;
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};
getUserProfile();
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="sm"
            size="120"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          />

          <!-- 👉 Upload Photo -->
        </VCardText>

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField v-model="userData.firstName" label="First Name" />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol md="6" cols="12">
                <VTextField v-model="userData.lastName" label="Last Name" />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="userData.email"
                  label="E-mail"
                  type="email"
                />
              </VCol>

              <!-- 👉 Organization -->
              <VCol cols="12" md="6">
                <VTextField v-model="userData.resturant" label="Resturant" />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField v-model="userData.phone" label="Phone Number" />
              </VCol>

              <!-- 👉 Address -->
              <!-- <VCol cols="12" md="6">
                <VTextField
                  v-model="accountDataLocal.address"
                  label="Address"
                />
              </VCol> -->

              <!-- 👉 State -->
              <!-- <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.state" label="State" />
              </VCol> -->

              <!-- 👉 Zip Code -->
              <!-- <VCol cols="12" md="6">
                <VTextField v-model="accountDataLocal.zip" label="Zip Code" />
              </VCol> -->

              <!-- 👉 Country -->
              <!-- <VCol cols="12" md="6">
                <VSelect
                  v-model="accountDataLocal.country"
                  label="Country"
                  :items="['USA', 'Canada', 'UK', 'India', 'Australia']"
                />
              </VCol> -->

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn>Save changes</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Data Updates">
        <VCardText>
          <!-- 👉 Checkbox and Button  -->
          <div class="d-flex justify-space-between">
            <form class="d-flex flex-column justify-center gap-4">
              <div class="d-flex flex-wrap gap-4">
                <VBtn color="primary" @click="refInputEl?.click()">
                  <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                  <span class="d-none d-sm-block">Update Dashboard's Data</span>
                </VBtn>

                <input
                  ref="refInputEl"
                  type="file"
                  name="file"
                  accept=".csv"
                  hidden
                  @input="updateDashboard"
                />
              </div>
            </form>
            <div>
              <form class="d-flex flex-column justify-center gap-4">
                <div class="d-flex flex-wrap gap-4">
                  <VBtn color="primary" @click="refInputCus?.click()">
                    <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                    <span class="d-none d-sm-block"
                      >Update Customer's Data</span
                    >
                  </VBtn>

                  <input
                    ref="refInputCus"
                    type="file"
                    name="file"
                    accept=".csv"
                    hidden
                    @input="updateCustomer"
                  />
                </div>
              </form>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Clover Integrations">
        <VCardText>
          <!-- 👉 Checkbox and Button  -->
          <div class="d-flex justify-space-between">
            <span>
              <img src="../../assets/images/logos/clover-logo.svg" alt="" />
            </span>
            <VBtn>SignIn to clover</VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- Confirm Dialog -->
  <ConfirmDialog
    v-model:isDialogVisible="isConfirmDialogOpen"
    confirmation-question="Are you sure you want to deactivate your account?"
    confirm-title="Deactivated!"
    confirm-msg="Your account has been deactivated successfully."
    cancel-title="Cancelled"
    cancel-msg="Account Deactivation Cancelled!"
  />
</template>
