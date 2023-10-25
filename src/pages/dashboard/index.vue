<template>
  <div class="misc-wrapper" v-if="!isDasboard && !loading">
    <ErrorHeader
      error-title="No CSV Data Found ⚠️"
      error-description="Please upload customer's data."
    />

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg
        :src="pages404"
        alt="Coming Soon"
        :max-width="800"
        class="mx-auto"
        height="200px"
      />
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
        @input="uploadDashboard"
      />
    </div>

    <!-- 👉 Footer -->
    <VImg :src="tree" class="misc-footer-tree d-none d-md-block" />

    <!-- <VImg
      :src="authThemeMask"
      class="misc-footer-img d-none d-md-block flip-in-rtl"
    /> -->
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
        <CrmSalesOverview />
      </VCol>
      <VCol cols="12" md="6">
        <CrmActivityTimeline />
      </VCol>
    </VRow>
    <VRow class="">
      <VCol cols="12" sm="12" md="4">
        <CrmTotalSales />
      </VCol>
      <VCol cols="12" sm="12" md="8">
        <CrmTransactions :data="emailStates" />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="12">
        <VCard>
          <v-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left capitalize">Top Sold Menu Items</th>
                  <th class="text-left capitalize">Number of times Ordered</th>
                  <th class="text-left capitalize">
                    Number of customers who ordered
                  </th>
                  <th class="text-left capitalize">% of Total revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tableData" :key="index">
                  <td>{{ index + 1 }}. {{ item["Top Solid Menu Items"] }}</td>
                  <td>{{ item["Number Of Items Purchased"] }}</td>
                  <td>{{ item["Number Of Customers Who Ordered"] }}</td>

                  <td>{{ item["% Of Total Revenue"] }}%</td>
                </tr>
              </tbody>
            </template>
          </v-table>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>

<script setup>
import CrmActivityTimeline from "@/views/dashboards/crm/CrmActivityTimeline.vue";
import CrmSalesOverview from "@/views/dashboards/crm/CrmSalesOverview.vue";
import CrmTotalSales from "@/views/dashboards/crm/CrmTotalSales.vue";
import CrmTransactions from "@/views/dashboards/crm/CrmTransactions.vue";
import axios from "@axios";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import illustration2 from "@images/cards/illustration-2.png";
import pages404 from "@images/pages/404.png";
import miscMaskDark from "@images/pages/misc-mask-dark.png";
import miscMaskLight from "@images/pages/misc-mask-light.png";
import tree from "@images/pages/tree.png";
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
let tableData = ref([]);
let isDasboard = ref(false);
const refInputEl = ref();
let data = ref(null);
let totalCustomers = ref(null);

let loading = ref(false);

onMounted(async () => {
  try {
    loading.value = true;
    axios.get(`dashboard`).then((res) => {
      if (res.data.data != null) {
        console.log(res.data.data, "=============>>>");
        data.value = res.data;
        totalCustomers.value = data.value.totalCustomers;
        console.log(data.value, "asdasdf");
        dashboard.value = res.data.data;
        tableData.value = res.data.data.data;
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
      }
    });
  } catch (error) {
    console.log(error);
  }
});
let transactionData = ref({});
let emailStates = ref({});
const uploadDashboard = (file) => {
  const fileReader = new FileReader();
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
