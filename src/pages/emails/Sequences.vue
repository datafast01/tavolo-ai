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
            <!-- <div>
              <div class="text-h6 mb-5">Live Sequences</div>
            </div> -->
            <VRow>
              <VCol cols="12">
                <v-tabs
                  v-model="tab"
                  color="deep-purple-accent-4"
                  align-tabs="space-between"
                >
                  <v-tab value="1"
                    ><div class="text-h6 mb-5">Live Sequences</div></v-tab
                  >
                  <v-tab value="2"
                    ><div class="text-h6 mb-5">Cancelled Sequences</div></v-tab
                  >
                </v-tabs>
              </VCol>
              <VCol>
                <v-window v-model="tab">
                  <v-window-item value="1">
                    <VRow class="my-3">
                      <VCol
                        cols="4"
                        v-for="payments in data.paymentMethods.slice(
                          0,
                          data.countsnum
                        )"
                        :key="payments"
                      >
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
                          <v-card
                            @click="openEditCardDialog()"
                            class="pa-6 text-center"
                          >
                            <p class="ma-0">{{ payments.text }}</p>
                          </v-card>
                        </div>
                      </VCol>
                      <v-col cols="12" class="text-center">
                        <v-btn
                          v-if="data.countsnum < data.paymentMethods.length"
                          @click="loadMore"
                          color="grey-darken-2 "
                          size="small"
                          class="btn btn-sm btn-danger"
                        >
                          View More
                        </v-btn>
                      </v-col>
                    </VRow>
                  </v-window-item>
                  <v-window-item value="2">
                    <VRow class="my-3">
                      <VCol
                        cols="4"
                        v-for="payments in dataa.paymentMethod.slice(
                          0,
                          dataa.countsnums
                        )"
                        :key="payments"
                      >
                        <div
                          :class="{
                            'selected-card':
                              payments.id !== currentPkg &&
                              selectedPaymentMethod === payments.key,
                            'pricing-card':
                              payments.id == currentPkg &&
                              selectedPaymentMethod == payments.key,
                          }"
                          @click="selectedPaymentMethod = payments.key"
                        >
                          <v-card
                            @click="openEditCardDialog()"
                            class="pa-6 text-center"
                          >
                            <p class="ma-0">{{ payments.text }}</p>
                          </v-card>
                        </div>
                      </VCol>
                      <v-col cols="12" class="text-center">
                        <v-btn
                          v-if="dataa.countsnums < dataa.paymentMethod.length"
                          @click="loadMores"
                          color="grey-darken-2 "
                          size="small"
                          class="btn btn-sm btn-danger"
                        >
                          View More
                        </v-btn>
                      </v-col>
                    </VRow>
                  </v-window-item>
                </v-window>
              </VCol>
            </VRow>
          </div>
          <div>
            <!-- <div>
              <div class="text-h6 mb-5 mt-10">Cancelled Sequences</div>
            </div> -->
            <VRow> </VRow>
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
      tab: null,
      data: {
        paymentMethods: [
          { key: "newMilkshake", text: "New Milkshake" },
          { key: "discountCode", text: "25% Discount Code" },
          { key: "burgerRelaunch", text: "Burger Relaunch" },
          { key: "relaunch", text: "Relaunch" },
          { key: "burger", text: "Burger " },
          { key: "milkshake", text: "Milkshake Relaunch" },
        ],
        countsnum: 3,
      },
      dataa: {
        paymentMethod: [
          { key: "masterCard", text: "Every 30 Days" },
          { key: "applePay", text: "Google & Yelp Reviews" },
          { key: "visa", text: "Every 60 Days" },
          { key: "veryDays", text: "Very Days" },
          { key: "googleReviews", text: "Google  Reviews" },
          { key: "everyMonth", text: "Every Month" },
        ],
        countsnums: 3,
      },
      selectedPaymentMethods: "visa",
      selectedPaymentMethod: "relaunch",
      isCardEditDialogVisible: false,
    };
  },
  methods: {
    openEditCardDialog() {
      this.isCardEditDialogVisible = true;
    },
    loadMore() {
      if (this.data.countsnum >= this.data.paymentMethods.length) {
        return;
      } else {
        this.data.countsnum += 3;
      }
    },
    loadMores() {
      if (this.dataa.countsnums >= this.dataa.paymentMethod.length) {
        return;
      } else {
        this.dataa.countsnums += 3;
      }
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
