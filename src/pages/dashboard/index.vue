<template>
  <div class="misc-wrapper" v-if="!isDasboard">
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
        <CrmTransactions />
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
    <VRow class="match-height">
      <VCol cols="12" sm="12" md="4">
        <CrmTotalSales />
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
import illustration1 from "@images/cards/illustration-1.png";
import illustration2 from "@images/cards/illustration-2.png";
import pages404 from "@images/pages/404.png";
import miscMaskDark from "@images/pages/misc-mask-dark.png";
import miscMaskLight from "@images/pages/misc-mask-light.png";
import tree from "@images/pages/tree.png";

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);

const statisticsWithImages = [
  {
    title: "Revenue",
    subtitle: "Year of 2021",
    stats: "13k",
    change: 15.6,
    image: illustration1,
    color: "primary",
  },
  {
    title: "Repeated Customers",
    subtitle: "Last Week",
    stats: "56",
    change: 22,
    image: illustration2,
    color: "secondary",
  },
];
const headers = [
  {
    title: "Top Solid Menu Items",
    key: "Top Solid Menu Items",
  },
  {
    title: "EMAIL",
    key: "email",
  },
  {
    title: "ROLE",
    key: "role",
  },
  {
    title: "STATUS",
    key: "status",
  },
];
// refernce variables
let dashboard = ref(null);
let tableData = ref([]);
let isDasboard = ref(false);
const refInputEl = ref();

// methods
const getCsvData = () => {
  axios
    .get(`dashboard`)
    .then((res) => {
      if (res.data.data != null) {
        console.log(res.data.data, "=============>>>");
        dashboard.value = res.data.data;
        tableData.value = res.data.data.data;
        isDasboard.value = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
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

getCsvData();
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
