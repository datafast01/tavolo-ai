<template>
  <v-card>
    <v-tabs v-model="tab">
      <VRow>
        <VCol cols="12" md="4" style="display: flex; justify-content: center">
          <v-tab value="sent" class="active">Sent</v-tab>
        </VCol>
        <VCol cols="12" md="4" style="display: flex; justify-content: center">
          <v-tab value="draft">Draft</v-tab>
        </VCol>
        <VCol cols="12" md="4" style="display: flex; justify-content: center">
          <v-tab value="scheduled">Scheduled</v-tab>
        </VCol>
      </VRow>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="sent">
          <Campaigns :type="'sent'" />
        </v-window-item>

        <v-window-item value="draft">
          <Campaigns :type="'draft'" />
        </v-window-item>

        <v-window-item value="scheduled">
          <Campaigns :type="'scheduled'" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script>
import Campaigns from "./components/Campaigns.vue";
export default {
  components: { Campaigns },
  data: () => ({
    tab: null,
  }),
};
</script>
