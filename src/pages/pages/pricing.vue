<template>
  <div>


    <VCard class="pt-6">
      <VCardText class="pt-12 mb-16 pb-16">
        <!-- 👉 App Pricing components -->
        <VRow>
          <VCol cols="12" sm="8" md="12" lg="10" class="mx-auto">
            <AppPricing md="4" :monthlyPkgs="monthlyPkgs" :yearlyPkgs="yearlyPkgs" :currentPkg="currentPkg" />
          </VCol>
        </VRow>
      </VCardText>
      <!-- {{ currentPkg?.packageId?.price }} -->
      <!-- 👉 Free trial Banner -->
      <!-- {{ currentPkg.packageId }} -->
      <!-- <VRow
      class="page-pricing-free-trial-banner-bg"
      v-if="currentPkg?.packageId?.price > 1"
    >
      <VCol
        cols="12"
        md="10"
        class="d-flex align-center flex-md-row flex-column position-relative mx-auto"
      >
        <div class="text-center text-md-start py-10 px-10 px-sm-0">
          <h3 class="text-h5 text-primary mb-2">
            Still not convinced? Start with a 14-day FREE trial!
          </h3>
          <p class="text-sm">
            You will get full access to all the features for 14 days.
          </p>

          <VBtn class="mt-4"> Start-14-day FREE trial </VBtn>
        </div>

        <div class="free-trial-illustrator">
          <VImg :src="poseFs9" :width="250" />
        </div>
      </VCol>
    </VRow>

    <VRow class="page-pricing-free-trial-banner-bg" v-else>
      <VCol
        cols="12"
        md="10"
        class="d-flex align-center flex-md-row flex-column position-relative mx-auto"
      >
        <div class="text-center text-md-start py-10 px-10 px-sm-0">
          <h3 class="text-h5 text-primary mb-2">
            Still not convinced? Start with a 14-day FREE trial!
          </h3>
          <p class="text-sm">
            You will get full access to all the features for 14 days.
          </p>

          <VBtn class="mt-4" @click="showConfirmation = true">
            Cancel Subscription
          </VBtn>
        </div>

        <div class="free-trial-illustrator">
          <VImg :src="poseFs9" :width="250" />
        </div>
      </VCol>
    </VRow> -->

      <!-- 👉 Plans -->
      <!-- <VCardText class="text-center mt-16">
      <h4 class="text-h5 mb-6">Pick a plan that works best for you</h4>
      <p>Stay cool, we have a 48-hour money back guarantee!</p>
    </VCardText> -->

      <!-- 👉 Features & Tables -->
      <VCardText class="mb-16 mt-2">
        <VRow>
          <VCol cols="12" md="10" class="mx-auto">
            <VTable class="text-no-wrap border rounded">
              <!-- 👉 Table head -->
              <!-- <thead>
              <tr>
                <th scope="col" class="py-4">
                  <h6 class="text-xs font-weight-medium mb-1">FEATURES</h6>
                  <h6 class="font-weight-regular text-xs">
                    Native Front Features
                  </h6>
                </th>

                <th scope="col" class="text-center py-4">
                  <h6 class="text-xs font-weight-medium mb-1">BASIC</h6>
                  <h6 class="font-weight-regular text-xs">FREE</h6>
                </th>

                <th scope="col" class="text-center py-4">
                  <h6 class="text-xs font-weight-medium mb-1">
                    STANDARD
                    <VAvatar size="22" color="primary" class="mt-n2">
                      <VIcon size="16" icon="mdi-star" />
                    </VAvatar>
                  </h6>

                  <h6 class="font-weight-regular text-xs">$7.5/MONTH</h6>
                </th>

                <th scope="col" class="text-center py-4">
                  <h6 class="text-xs font-weight-medium mb-1">ENTERPRISE</h6>
                  <h6 class="font-weight-regular text-xs">$16/MONTH</h6>
                </th>
              </tr>
            </thead> -->

              <!-- 👉 Table Body -->
              <!-- <tbody>
              <tr v-for="feature in features" :key="feature.feature">
                <td>{{ feature.feature }}</td>
                <td class="text-center">
                  <VIcon
                    v-if="!feature.addOnAvailable.starter"
                    size="20"
                    :color="feature.basic ? 'primary' : 'disabled'"
                    :icon="
                      feature.basic ? 'mdi-check-circle' : 'mdi-close-circle'
                    "
                  />

                  <VChip
                    v-if="feature.addOnAvailable.starter"
                    color="primary"
                    size="small"
                  >
                    ADD-ON AVAILABLE
                  </VChip>
                </td>

                <td class="text-center">
                  <VIcon
                    v-if="!feature.addOnAvailable.pro"
                    :color="feature.standard ? 'primary' : 'disabled'"
                    size="20"
                    :icon="
                      feature.standard ? 'mdi-check-circle' : 'mdi-close-circle'
                    "
                  />

                  <VChip
                    v-if="feature.addOnAvailable.pro"
                    color="primary"
                    size="small"
                  >
                    ADD-ON AVAILABLE
                  </VChip>
                </td>

                <td class="text-center">
                  <VIcon
                    v-if="!feature.addOnAvailable.enterprise"
                    :color="feature.enterprise ? 'primary' : 'disabled'"
                    size="20"
                    :icon="
                      feature.enterprise
                        ? 'mdi-check-circle'
                        : 'mdi-close-circle'
                    "
                  />

                  <VChip
                    v-if="feature.addOnAvailable.enterprise"
                    color="primary"
                    size="small"
                  >
                    ADD-ON AVAILABLE
                  </VChip>
                </td>
              </tr>
            </tbody> -->

              <!-- 👉 Table footer -->
              <!-- <tfoot>
              <tr>
                <td class="py-4">Data storage for 365 days</td>

                <td class="text-center py-4">
                  <VBtn variant="tonal"> Choose Plan </VBtn>
                </td>
                <td class="text-center py-4">
                  <VBtn> Choose Plan </VBtn>
                </td>
                <td class="text-center py-4">
                  <VBtn variant="tonal"> Choose Plan </VBtn>
                </td>
              </tr>
            </tfoot> -->
            </VTable>
          </VCol>
        </VRow>
      </VCardText>

      <!-- 👉 FAQ -->
      <!-- <div>
      <VCardText class="bg-var-theme-background py-sm-16">
        <div class="text-center mt-4">
          <h5 class="text-h5 mb-2">FAQ's</h5>
          <p>Let us help answer the most common questions.</p>
        </div>

        <VExpansionPanels class="py-sm-6 px-md-16">
          <VExpansionPanel
            v-for="faq in faqs"
            :key="faq.question"
            :title="faq.question"
            :text="faq.answer"
          />
        </VExpansionPanels>
      </VCardText>
    </div> -->
    </VCard>
    <confirmation-dialog ref="confirmationDialog"></confirmation-dialog>
  </div>
</template>

<script>
import store from "@/store/index.js";
import axios from "@axios";


import poseFs9 from "@images/pages/pose-fs-9.png";

export default {

  data() {
    return {
      poseFs9: poseFs9,
      showConfirmation: false,
      features: [
        {
          feature: "14-days free trial",
          basic: true,
          standard: true,
          enterprise: true,
          addOnAvailable: {
            starter: false,
            pro: false,
            enterprise: false,
          },
        },
        {
          feature: "No user limit",
          basic: false,
          standard: false,
          enterprise: true,
          addOnAvailable: {
            starter: false,
            pro: false,
            enterprise: false,
          },
        },
        {
          feature: "Product Support",
          basic: false,
          standard: true,
          enterprise: true,
          addOnAvailable: {
            starter: false,
            pro: false,
            enterprise: false,
          },
        },
        {
          feature: "Email Support",
          basic: false,
          standard: false,
          enterprise: true,
          addOnAvailable: {
            starter: false,
            pro: true,
            enterprise: false,
          },
        },
        {
          feature: "Integrations",
          basic: false,
          standard: true,
          enterprise: true,
          addOnAvailable: {
            starter: false,
            pro: false,
            enterprise: false,
          },
        },
        {
          feature: "Removal of Front branding",
          basic: false,
          standard: false,
          enterprise: true,
          addOnAvailable: {
            starter: false,
            pro: true,
            enterprise: false,
          },
        },
        {
          feature: "Active maintenance & support",
          basic: false,
          standard: false,
          enterprise: true,
          addOnAvailable: {
            starter: false,
            pro: false,
            enterprise: false,
          },
        },
        {
          feature: "Data storage for 365 days",
          basic: false,
          standard: false,
          enterprise: true,
          addOnAvailable: {
            starter: false,
            pro: false,
            enterprise: false,
          },
        },
      ],

      faqs: [
        {
          question: "General settings",
          answer:
            "Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.",
        },
        {
          question: "Users",
          answer:
            "We accept Visa®, MasterCard®, American Express®, and PayPal®. So you can be confident that your credit card information will be kept safe and secure.",
        },
        {
          question: "Personal data",
          answer: "2Checkout accepts all types of credit and debit cards.",
        },
        {
          question: "Advanced settings",
          answer:
            "Yes. You may request a refund within 30 days of your purchase without any additional explanations.",
        },
      ],
      monthlyPkgs: [],
      yearlyPkgs: [],
      packages: [],
    };
  },
  computed: {
    currentPkg() {
      return store.getters.getCurrentPkg;
    },
  },
  methods: {
    getPackages() {
      // console.log("submit form", ApiService);
      axios
        .get(`packages`)
        .then((response) => {
          // console.log("user", response.data.data);
          this.packages = response.data.data;
          this.packages.forEach((obj) => {
            if (obj.monthly) {
              this.monthlyPkgs.push(obj);
            } else {
              this.yearlyPkgs.push(obj);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelSubscription() {
      axios
        .get(`cancel-subscription`)
        .then((response) => {
          console.log("user", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confirmDelete() {
      this.$refs.confirmationDialog.openDialog('Are you sure you want to delete this item?', this.cancelSubscription());
    },
    // deleteItem() {
    //   // Your delete logic here
    //   console.log('Item deleted');
    // }
  },
  mounted() {
    // console.log(store);
    this.getPackages();
    store.dispatch("getPackageHistory");
  },
};
</script>

<style lang="scss">
.page-pricing-free-trial-banner-bg {
  /* stylelint-disable-next-line color-function-notation */
  background-color: rgba(var(--v-theme-primary), var(--v-idle-opacity));
}

@media screen and (min-width: 960px) {
  .free-trial-illustrator {
    position: absolute;
    inset-block-end: 0;
    inset-inline-end: 10%;
  }
}

@media screen and (max-width: 959px) {
  .free-trial-illustrator {
    position: relative;
    inset-block-end: -11px;
  }
}
</style>
