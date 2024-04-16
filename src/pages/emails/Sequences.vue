<template>
  <div>
    <VRow>
      <VCol cols="12">
        <div class="float-right">
          <VBtn size="large" @click="createSequence"> NEW SEQUENCE </VBtn>
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
                <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="space-between">
                  <v-tab value="1">
                    <div class="text-h6 mb-5">Live Sequences</div>
                  </v-tab>
                  <v-tab value="2">
                    <div class="text-h6 mb-5">Cancelled Sequences</div>
                  </v-tab>
                </v-tabs>
              </VCol>
              <VCol>
                <v-window v-model="tab">
                  <v-window-item value="1">
                    <VRow class="my-3" v-if="sequences.length > 0">
                      <VCol cols="4" class="cursor-pointer" v-for="sequence in sequences" :key="sequence"
                        @click="editSequenceDialog(sequence)">
                        <div>
                          <v-card class="pa-6 text-center">
                            <p class="ma-0">{{ sequence.name }}</p>
                          </v-card>
                        </div>
                      </VCol>
                      <!-- <v-col cols="12" class="text-center">
                        <v-btn v-if="data.countsnum < data.paymentMethods.length" @click="loadMore"
                          color="grey-darken-2 " size="small" class="btn btn-sm btn-danger">
                          View More
                        </v-btn>
                      </v-col> -->

                    </VRow>
                    <VRow v-else>
                      <VCol>
                        No Sequences available
                      </VCol>
                    </VRow>
                  </v-window-item>
                  <v-window-item value="2">
                    <VRow class="my-3">
                      <VCol cols="4" class="cursor-pointer" v-for="payments in dataa.paymentMethod.slice(
                        0,
                        dataa.countsnums
                      )" :key="payments" @click="editSequenceDialog">
                        <div :class="{
                          'selected-card':
                            payments.id !== currentPkg &&
                            selectedPaymentMethod === payments.key,
                          'pricing-card':
                            payments.id == currentPkg &&
                            selectedPaymentMethod == payments.key,
                        }" @click="selectedPaymentMethod = payments.key">
                          <v-card class="pa-6 text-center">
                            <p class="ma-0">{{ payments.text }}</p>
                          </v-card>
                        </div>
                      </VCol>
                      <v-col cols="12" class="text-center">
                        <v-btn v-if="dataa.countsnums < dataa.paymentMethod.length" @click="loadMores"
                          color="grey-darken-2 " size="small" class="btn btn-sm btn-danger">
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

  </div>
</template>

<script>
import axios from '@axios'
import store from "@/store/index.js";


export default {


  data() {
    return {
      tab: null,
      selectedSequence: {},

      canceledSequences: [],


      selectedPaymentMethod: "relaunch",
      isCardEditDialogVisible: false,
      sequenceType: '',
    };
  },
  computed: {
    sequences() {
      return store.getters.getSequences
    }
  },
  methods: {
    createSequence() {
      this.$router.push('/sequences/create')
    },
    editSequenceDialog(type) {
      // this.selectedSequence = sequence
      this.sequenceType = type
      this.$refs.sequnceDialog.dialog = true
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
  mounted() {
    store.dispatch("listSequences");
  }
};
</script>

<style>
.pricing-card {
  border: 2px solid #9155fd;
  border-radius: 10px;
}
</style>
