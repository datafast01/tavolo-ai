<template>
  <div class="text-center" v-if="loading">
    <Loader />
  </div>
  <section v-else>
    <VRow class="match-height">
      <VCol cols="12" md="6">
        <CrmTransactions :data="transactionData" />
      </VCol>
      <VCol
        v-for="statistics in statisticsWithImages"
        :key="statistics.title"
        cols="12"
        md="3"
        sm="6"
        class="d-flex flex-column align-self-end"
      >
        <CardStatisticsWithImages v-bind="statistics" />
      </VCol>
    </VRow>

    <VRow class="match-height">
      <VCol cols="12" md="6">
        <CrmSalesOverview
          v-if="!loading"
          :dashboard="top3FoodItemsSold"
          :totalSales="totalSales"
        />
      </VCol>
      <VCol cols="12" md="6">
        <CrmActivityTimeline />
      </VCol>
    </VRow>
    <VRow class="">
      <!-- <VCol cols="12" sm="12" md="4">
        <CrmTotalSales />
      </VCol> -->
      <VCol cols="12" sm="12" md="12">
        <CrmTransactions :data="emailStates" />
      </VCol>
    </VRow>
  </section>
</template>

<script setup>
import router from "@/router";
import store from "@/store";
import CrmActivityTimeline from "@/views/dashboards/crm/CrmActivityTimeline.vue";
import CrmSalesOverview from "@/views/dashboards/crm/CrmSalesOverview.vue";
import CrmTransactions from "@/views/dashboards/crm/CrmTransactions.vue";
import axios from "@axios";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import illustration2 from "@images/cards/illustration-2.png";
import miscMaskDark from "@images/pages/misc-mask-dark.png";
import miscMaskLight from "@images/pages/misc-mask-light.png";
import { onMounted } from "vue";
const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);

const statisticsWithImages = [
  {
    title: "Revenue",
    subtitle: "This week",
    stats: "15.3k",
    change: 15.6,
    icon: "mdi-currency-usd",
    color: "primary",
  },
  {
    title: "Repeated Customers",
    subtitle: "This Week",
    stats: "382",
    change: 22,
    image: illustration2,
    color: "secondary",
    icon: "mdi-currency-usd",
  },
];

// refernce variables
let dashboard = ref(null);
let totalSales = ref(0);
let tableData = ref([]);
let isDasboard = ref(false);
const refInputEl = ref();
let data = ref(null);
let totalCustomers = ref(null);
let top3FoodItemsSold = ref([]);

let loading = ref(false);

onMounted(async () => {
  try {
    loading.value = true;
    axios.get(`dashboard`).then((res) => {
      data.value = res.data;
      top3FoodItemsSold.value = data.value.top3FoodItemsSold;
      totalSales.value = data.value.totalSales;
      totalCustomers.value = data.value.totalCustomers;
      dashboard.value = res.data.data;
      store.dispatch("getPackageHistory");
      isDasboard.value = true;
      loading.value = false;
      let transaction = {
        label: "Transactions",
        statistics: [
          {
            title: "Sales",
            stats: "1.2k",
            icon: "mdi-trending-up",
            color: "primary",
          },
          {
            title: "Customers",
            stats: totalCustomers.value,
            icon: "mdi-account-outline",
            color: "success",
          },
          {
            title: "Online Conversions",
            stats: "23%",
            icon: "mdi-cellphone-link",
            color: "warning",
          },
        ],
      };
      transactionData.value = transaction;
      let email = {
        label: "Email Stats",
        statistics: [
          {
            title: "Total Emails",
            stats: data.value.totalEmails,
            icon: "mdi-email",
            color: "primary",
          },
          {
            title: "Pending Emails",
            stats: data.value.noOfEmailsPending,
            icon: "mdi-email-alert",
            color: "success",
          },
          {
            title: "Open Rate",
            stats: data.value.noOfEmailsOpened,
            icon: "mdi-email-open",
            color: "warning",
          },
        ],
      };
      emailStates.value = email;
    });
  } catch (error) {
    console.log(error);
  }
  let cloverMerchantID = router;
});
let transactionData = ref({});
let emailStates = ref({});
const uploadDashboard = (file) => {
  const fileReader = new FileReader();
  const { files } = file.target;
  const myCSV = files[0];
  let data = new FormData();
  data.append("file", myCSV);
  axios
    .post(`dashboard/upload`, data)

    .then((res) => {
      if (res.data.data != null) {
        dashboard.value = res.data.data;
        tableData.value = res.data.data.data;
        isDasboard.value = true;
      }
    })
    .catch((error) => {});
};
</script>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
@use "@core/scss/template/pages/misc.scss";

.misc-footer-tree {
  inline-size: 18rem;
  inset-block-end: 3.5rem;
  inset-inline-start: 2rem;
}
</style>
