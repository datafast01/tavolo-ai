<template>
  <div>
    <VRow>
      <VCol cols="12">
        <div class="float-right">
          <VBtn size="large" @click="openEditCardDialog()"> NEW SEQUENCE </VBtn>
        </div>
      </VCol>
      <VCol>
        <v-card class="px-12 py-10">
          <div>
            <div>
              <div class="text-h6 mb-5">Live Sequences</div>
            </div>
            <VRow>
              <VCol
                ><v-card class="pa-6 text-center">
                  <p class="ma-0">Every 30 Days</p>
                </v-card>
              </VCol>
              <VCol>
                <v-card class="pa-6 text-center">
                  <p class="ma-0">Google & Yelp Reviews</p>
                </v-card>
              </VCol>
              <VCol>
                <v-card class="pa-6 text-center">
                  <p class="ma-0">Every 60 Days</p>
                </v-card>
              </VCol>
            </VRow>
          </div>
          <div>
            <div>
              <div class="text-h6 mb-5 mt-10">Cancelled Sequences</div>
            </div>
            <VRow>
              <VCol
                ><v-card class="pa-6 text-center">
                  <p class="ma-0">New Milkshake</p>
                </v-card>
              </VCol>
              <VCol>
                <v-card class="pa-6 text-center">
                  <p class="ma-0">25% Discount Code</p>
                </v-card>
              </VCol>
              <VCol>
                <v-card class="pa-6 text-center">
                  <p class="ma-0">Burger Relaunch</p>
                </v-card>
              </VCol>
            </VRow>
          </div>
        </v-card>
      </VCol>
    </VRow>
    <SequenceDialog v-model:isDialogVisible="isCardEditDialogVisible" />
  </div>
</template>

<script>
import SequenceDialog from"./SequenceDialog.vue"


export default {
  components: { SequenceDialog },

  data() {
    return {
      isCardEditDialogVisible: false,
    };
  },
  methods: {
    openEditCardDialog() {
      this.isCardEditDialogVisible = true;
    },
  },
};
</script>

<style></style>
