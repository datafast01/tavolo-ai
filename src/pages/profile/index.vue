<script setup>
import store from "@/store/index.js";
import axios from "@axios";
import avatar1 from "@images/avatars/avatar-1.png";
import {
  alphaValidator,
  emailValidator,
  integerValidator,
  lengthValidator,
  requiredValidator,
  urlValidator,
} from "@validators";
import { onMounted } from "vue";

import AccountSettingsAccount from "./AccountSettingsConnections.vue";
import { ref } from 'vue';

const imageData = ref("");

const previewImage = (event) => {
  const input = event.target;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageData.value = e.target.result;
      // Store the image data in local storage
      localStorage.setItem("imageData", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const openFileInput = () => {
  // Programmatically trigger the click event of the file input
  const fileInput = document.querySelector('input[type="file"]');
  fileInput.click();
};

// Retrieve the image data from local storage when the component is mounted

// Define the isNameValid function
const isNameValid = (value) => {
  return (
    lengthValidator(value, 1, 15) ||
    "Contract title must be between 1 and 15 characters"
  );
};

const accountData = {
  avatarImg: avatar1,
};

const refInputEl = ref();
const refInputCus = ref();

const isConfirmDialogOpen = ref(false);
const accountDataLocal = ref(structuredClone(accountData));
const isAccountDeactivated = ref(false);
let userData = ref({});
let updateProfileLoading = ref(false);

const validateAccountDeactivation = [
  (v) => !!v || "Please confirm account deactivation",
];

let show = ref(false);
let snkMsg = ref("");
let color = ref("#9575CD");

//loading veriables
let cloverLoading = ref(false);

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
    .catch((error) => { });
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

var instagram = ref({});
var igAccessToken = ref(null);
const getUserProfile = () => {
  // console.log("submit form", ApiService);
  axios
    .get(`getprofile`)
    .then((response) => {
      console.log("user", response.data);
      userData.value = response.data;
      store.dispatch("getPackageHistory");
      if (userData.value.instagram.accessToken) {
        igAccessToken.value = userData.value.instagram.accessToken;
      }
      if (userData.value.instagram.posts.length > 0) {
        instagram.value = userData.value.instagram.posts[0];
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateProfile = () => {
  updateProfileLoading.value = true;
  // console.log("submit form", ApiService);
  const payload = {
    email: userData.value.email,
    firstName: userData.value.firstName,
    lastName: userData.value.lastName,
    phoneNo: userData.value.phoneNo,
    restaurantName: userData.value.restaurantName,
    dicountForNewCustomers: userData.value.dicountForNewCustomers,
    dicountForNotRepeatingCustomers:
      userData.value.dicountForNotRepeatingCustomers,
    googleReviewLink: userData.value.googleReviewLink,
    instaUrl: userData.value.instaUrl,
    tikTokUrl: userData.value.tikTokUrl,
    faceBookUrl: userData.value.faceBookUrl,
  };
  axios
    .post(`editprofile`, payload)
    .then((response) => {
      console.log("user", response.data);
      updateProfileLoading.value = false;
      show.value = true;
      snkMsg.value = "User profile has been updated successfully!";
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};
const disConnectToClover = () => {
  cloverLoading.value = true;
  axios
    .get(`clover/disconnect`)
    .then((response) => {
      console.log("user", response.data);
      cloverLoading.value = false;
      userData.value.cloverToken = null;
      show.value = true;
      snkMsg.value = "Disconnected From Clover Successfully!";
      store.dispatch("getProfile");
    })
    .catch((err) => {
      console.log(err);
      cloverLoading.value = false;
      userData.value.cloverToken = null;
    });
};
// const connectToClover = () => {
//   cloverLoading.value = true;

//   axios
//     .get(`clover/connect`)
//     .then((response) => {
//       console.log("user", response.data);
//       cloverLoading.value = false;
//       const redirectUrl = response.data.url;

//       // Open a new window for the redirect URL
//       const redirectWindow = window.open(redirectUrl, "_blank");

//       // Check if the window is closed or not
//       const checkWindowClosed = setInterval(() => {
//         clearInterval(checkWindowClosed);

//         // Extract parameters from the URL of the new tab
//         const newTabParams = new URLSearchParams(
//           redirectWindow.location.search
//         );
//         const merchantID = newTabParams.get("merchant_id");
//         const cloverCode = newTabParams.get("code");

//         if (merchantID && cloverCode) {
//           // Make the second API call
//           sendCloverParams(merchantID, cloverCode);
//         } else {
//           console.error("Merchant ID or Clover Code is null or undefined");
//         }
//       }, 1000);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const sendCloverParams = (merchantID, cloverCode) => {
//   axios
//     .get(`clover/token/${merchantID}/${cloverCode}`)
//     .then((response) => {
//       console.log("user", response.data);
//       cloverLoading.value = false;
//       window.redirect(response.data.url);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const connectToClover = () => {
  cloverLoading.value = true;

  axios
    .get(`clover/connect`)
    .then((response) => {
      console.log("user", response.data);
      cloverLoading.value = false;
      const redirectUrl = response.data.url;

      // Redirect the current tab to the new URL
      window.location.href = redirectUrl;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  // Check for URL parameters after the component is mounted
  checkUrlParameters();
});

const checkUrlParameters = () => {
  // Extract parameters from the URL

  const merchantID = localStorage.getItem("merchant_id");
  const cloverCode = localStorage.getItem("clover_code");
  console.log(cloverCode, merchantID);
  if (merchantID && cloverCode) {
    // Make the second API call
    sendCloverParams(merchantID, cloverCode);
    localStorage.removeItem("merchant_id");
    localStorage.removeItem("clover_code");
  }
};

const sendCloverParams = (merchantID, cloverCode) => {
  axios
    .get(`clover/token/${merchantID}/${cloverCode}`)
    .then((response) => {
      console.log("user", response.data);
      cloverLoading.value = false;
      getUserProfile();
      show.value = true;
      snkMsg.value = "Connected With Clover Successfully!";
      // Handle the response as needed
    })
    .catch((err) => {
      console.log(err);
      // Handle errors as needed
    });
};

const merchantID = localStorage.getItem("merchant_id");
const employeeID = localStorage.getItem("employee_id");

const clientID = localStorage.getItem("client_id");
const cloverCode = localStorage.getItem("clover_code");

console.log(merchantID, "merchantID");
// const sendCloverParams = () => {
//   axios
//     .get(`clover/token/${merchantID}/${cloverCode}`)
//     .then((response) => {
//       console.log("user", response.data);
//       cloverLoading.value = false;
//       window.open(response.data.url);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// if (merchantID && clientID && cloverCode) {
//   sendCloverParams();
// }

getUserProfile();
</script>




<template>
  <VRow>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <VCol cols="12">
      <VCard>
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <div v-if="imageData.length > 0">
            <div class="relative">
              <div>
                <v-avatar :image="imageData" size="120" class="custom-avatar"></v-avatar>
              </div>
              <div class="edit-profile" @click="openFileInput">
                <v-icon>mdi-pencil</v-icon>
              </div>
            </div>

            <div class="file-upload-form">

              <input ref="fileInput" type="file" @change="previewImage" accept="image/*" style="display: none;"
                class="hidden" />
            </div>
          </div>
          <div v-else>
            <div class="relative">
              <div>
                <v-avatar :image="avatar1" size="120" class="custom-avatar"></v-avatar>
              </div>
              <div class="edit-profile" @click="openFileInput">
                <v-icon>mdi-pencil</v-icon>
              </div>
            </div>

            <div class="file-upload-form">

              <input ref="fileInput" type="file" @change="previewImage" accept="image/*" style="display: none;"
                class="hidden" />
            </div>
          </div>

          <!-- 👉 Upload Photo -->
        </VCardText>

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField v-model="userData.firstName" :rules="[requiredValidator, isNameValid, alphaValidator]"
                  label="First Name" />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol md="6" cols="12">
                <VTextField v-model="userData.lastName" :rules="[requiredValidator, isNameValid, alphaValidator]"
                  label="Last Name" />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField v-model="userData.email" :rules="[requiredValidator, emailValidator]" label="E-mail"
                  type="email" />
              </VCol>

              <!-- 👉 Organization -->
              <VCol cols="12" md="6">
                <VTextField v-model="userData.restaurantName" :rules="[requiredValidator]" label="Restaurant" />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField v-model="userData.phoneNo" :rules="[requiredValidator, integerValidator]"
                  label="Phone Number" />
              </VCol>

              <!-- 👉 Address -->
              <VCol cols="12" md="6">
                <VTextField v-model="userData.faceBookUrl" label="Facebook URL"
                  :rules="[requiredValidator, urlValidator]" />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="userData.instaUrl" :rules="[requiredValidator, urlValidator]"
                  label="Instagram URL" />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="userData.tikTokUrl" :rules="[requiredValidator, urlValidator]"
                  label="TikTok URL" />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="userData.googleReviewLink" :rules="[requiredValidator, urlValidator]"
                  label="Google Reviews Link" />
              </VCol>
              <VCol cols="12" md="6">
                <!-- <VTextField
                  v-model="userData.dicountForNewCustomers"
                  label="Discount To New Customers"
                  type="number"
                /> -->
                <v-slider v-model="userData.dicountForNewCustomers" thumb-label="always"></v-slider>
              </VCol>
              <VCol cols="12" md="6">
                <!-- <VTextField
                  v-model="userData.dicountForNotRepeatingCustomers"
                  label="Discount To Customers Haven't Repeated Last 30 Days"
                  type="number"
                /> -->
                <v-slider v-model="userData.dicountForNotRepeatingCustomers" thumb-label="always"></v-slider>
              </VCol>

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
              <VCol cols="12" class="d-flex justify-space-between">
                <div class="">
                  <VBtn @click="updateProfile">Save changes</VBtn>
                </div>
                <div>
                  <RouterLink class="text-primary ms-2 mb-1" :to="{ name: 'pages-authentication-login-v2' }">
                    Update Password?
                  </RouterLink>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="6">
      <AccountSettingsAccount :instagram="instagram" :igAccessToken="igAccessToken" @refresh-data="getUserProfile" />
    </VCol>

    <VCol cols="6">
      <VCard title="Integrations">
        <v-card class="mb-3 ml-3" max-width="304">
          <v-card-text class="text-center">
            <div class="mb-2 text-h5">TAVOLO</div>
            <p>for</p>
            <img src="../../assets/images/logos/clover-logo.svg" alt="" width="120" />
            <br />

            <div class="text--primary">
              Connect Clover POS with Tavolo<br />
            </div>
            <br />
            <v-btn v-if="!userData.cloverToken" @click="connectToClover" :loading="cloverLoading">Connect to
              clover</v-btn>
            <v-btn v-else @click="disConnectToClover" variant="tonal" :loading="cloverLoading">Disconnect to
              clover</v-btn>
          </v-card-text>
          <v-card-actions class="justify-center"> </v-card-actions>
        </v-card>
        <!-- <VCardText>
          <div class="d-flex justify-space-between">
            <span>
              <img src="../../assets/images/logos/clover-logo.svg" alt="" />
            </span>
            <VBtn
              v-if="!userData.cloverToken"
              @click="connectToClover"
              :loading="cloverLoading"
              >Connect to clover</VBtn
            >
            <VBtn v-else @click="disConnectToClover" :loading="cloverLoading"
              >Disconnect to clover</VBtn
            >
          </div>
        </VCardText> -->
      </VCard>
    </VCol>
  </VRow>

  <!-- Confirm Dialog -->
  <ConfirmDialog v-model:isDialogVisible="isConfirmDialogOpen"
    confirmation-question="Are you sure you want to deactivate your account?" confirm-title="Deactivated!"
    confirm-msg="Your account has been deactivated successfully." cancel-title="Cancelled"
    cancel-msg="Account Deactivation Cancelled!" />
</template>
<style>
.edit-profile {
  border: 2px solid #8d53f6;
  padding: 7px;
  border-radius: 37px;
  position: absolute;
  bottom: -3px;
  right: -14px;
  color: #8d53f6;
  z-index: 20;

}

.relative {
  position: relative !important;
}
</style>