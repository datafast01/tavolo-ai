
<template>
  <section>
    <VRow class="match-height">
      

      <VCol
        cols="12"
        md="6"
      >
        <CrmTransactions />
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <CrmTotalSales />
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <CrmRevenueReport />
      </VCol>

      
    </VRow>

    <VRow class="match-height">
      <VCol
        cols="12"
        md="6"
      >
        <CrmActivityTimeline />
      </VCol>

      <VCol
        cols="12"
        md="4"
        sm="8"
      >
        <CrmWeeklySales />
      </VCol>
    </VRow>
  </section>
</template>


<script setup>
import CrmActivityTimeline from '@/views/dashboards/crm/CrmActivityTimeline.vue'
import CrmRevenueReport from '@/views/dashboards/crm/CrmRevenueReport.vue'
import CrmTotalSales from '@/views/dashboards/crm/CrmTotalSales.vue'
import CrmTransactions from '@/views/dashboards/crm/CrmTransactions.vue'
import CrmWeeklySales from '@/views/dashboards/crm/CrmWeeklySales.vue'





</script>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
