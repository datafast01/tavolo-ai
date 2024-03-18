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
              <VCol v-for="payments in paymentMethod" :key="payments">
                <!-- <v-badge content="✓ " color="#9155FD"> -->
                <div
                  :class="{
                    'selected-card':
                      payments.id !== currentPkg &&
                      selectedPaymentMethods === payments.key,
                    'pricing-card':
                      payments.id == currentPkg &&
                      selectedPaymentMethods == payments.key,
                  }"
                  class=""
                  @click="selectedPaymentMethods = payments.key"
                >
                  <v-card class="pa-6 text-center">
                    <p class="ma-0">{{ payments.icon }}</p>
                  </v-card>

                  <div
                    class="p-2"
                    v-if="selectedPaymentMethods == payments.key"
                  >
                    <!-- <span color="#9155FD" class="tab-i">✓</span> -->
                  </div>
                </div>
              </VCol>
            </VRow>
          </div>
          <div>
            <div>
              <div class="text-h6 mb-5 mt-10">Cancelled Sequences</div>
            </div>
            <VRow>
              <VCol v-for="payments in paymentMethods" :key="payments">
                <!-- <v-badge content="✓ " color="#9155FD"> -->
                <div
                  :class="{
                    'selected-card':
                      payments.id !== currentPkg &&
                      selectedPaymentMethod === payments.key,
                    'pricing-card':
                      payments.id == currentPkg &&
                      selectedPaymentMethod == payments.key,
                  }"
                  class=""
                  @click="selectedPaymentMethod = payments.key"
                >
                  <v-card class="pa-6 text-center">
                    <p class="ma-0">{{ payments.icon }}</p>
                  </v-card>

                  <div class="p-2" v-if="selectedPaymentMethod == payments.key">
                    <!-- <span color="#9155FD" class="tab-i">✓</span> -->
                  </div>
                </div>
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
import SequenceDialog from "./SequenceDialog.vue";

export default {
  components: { SequenceDialog },

  data() {
    return {
      paymentMethods: [
        { key: "masterCard", icon: "New Milkshake" },
        { key: "applePay", icon: "25% Discount Code" },
        { key: "visa", icon: "Burger Relaunch" },
      ],
      paymentMethod: [
        { key: "masterCard", icon: "Every 30 Days" },
        { key: "applePay", icon: "Google & Yelp Reviews" },
        { key: "visa", icon: "Every 60 Days" },
      ],
      selectedPaymentMethods: "visa",
      selectedPaymentMethod: "visa",
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

<style>
.pricing-card {
  border: 2px solid #9155fd;
  border-radius: 10px;
}
</style>
