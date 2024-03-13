<script setup>
import { requiredValidator } from "@validators";

const props = defineProps({
  cardDetails: {
    type: Object,
    required: false,
    default: () => ({
      number: "",
      name: "",
      expiry: "",
      cvv: "",
      isPrimary: false,
      type: "",
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["submit", "update:isDialogVisible"]);

const cardDetails = ref(structuredClone(toRaw(props.cardDetails)));

watch(props, () => {
  cardDetails.value = structuredClone(toRaw(props.cardDetails));
});

// const formSubmit = () => {
//   emit("submit", cardDetails.value);
// };
</script>
<script>
import done from "../../../assets/images/cards/done2.png";
export default {
  data: () => ({
    done: done,
    ratingw: 0.5,
    ratingw1: 0.5,
    ratingw2: 0.5,
  }),
  computed: {
    computedTotalScore: function () {
      // Calculate the sum of the first two ratings
      let totalScore = (this.ratingw + this.ratingw1 + this.ratingw2) / 3;
      return totalScore.toFixed(1);
    },
  },
};
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 860"
    :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <VCard class="pa-5 pa-sm-8">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('update:isDialogVisible', false)"
      />

      <VCardText class="text-center text-h5"
        ><div class="text-h4 pb-2">
          Congratulations! <img :src="done" alt="" />
        </div>

        <span class="text-body-2"
          >The contract has been successfully completed.</span
        >
        <div class="text-center text-white pt-3">
          Share your experience with everyone.
        </div>
      </VCardText>

      <VCardText>
        <VRow>
          <VCol cols="1"></VCol>
          <VCol cols="10">
            <div>
              <div class="d-flex align-center pb-3 justify-space-between">
                <span class="w-50">Influincer Communication Skils</span>
                <VRow class="">
                  <VCol class="pa-0 text-right">
                    <v-rating
                      v-model="ratingw"
                      half-increments
                      hover
                    ></v-rating>
                  </VCol>
                  <VCol cols="1" class="pa-0 align-self-center pb-1">
                    <pre>{{ ratingw }}</pre>
                  </VCol>
                </VRow>
              </div>
              <div class="d-flex align-center pb-3 justify-space-between">
                <span class="w-50">Video Editig Skils</span>
                <VRow class="">
                  <VCol class="pa-0 text-right">
                    <v-rating
                      v-model="ratingw1"
                      half-increments
                      hover
                    ></v-rating>
                  </VCol>
                  <VCol cols="1" class="pa-0 align-self-center pb-1">
                    <pre>{{ ratingw1 }}</pre>
                  </VCol>
                </VRow>
              </div>
              <div class="d-flex align-center pb-3 justify-space-between">
                <span class="w-50">Quality of Content Skils</span>
                <VRow class="">
                  <VCol class="pa-0 text-right">
                    <v-rating
                      v-model="ratingw2"
                      half-increments
                      hover
                    ></v-rating>
                  </VCol>
                  <VCol cols="1" class="pa-0 align-self-center pb-1">
                    <pre>{{ ratingw2 }}</pre>
                  </VCol>
                </VRow>
              </div>

              <div class="d-flex align-center pb-3 justify-space-between">
                <span class="w-50">Totle</span>
                <VRow class="">
                  <VCol class="pa-0 text-right">
                    <v-rating
                      v-model="computedTotalScore"
                      readonly
                      half-increments
                      hover
                      disabled
                    ></v-rating>
                  </VCol>
                  <VCol cols="1" class="pa-0 align-self-center pb-1">
                    <pre>{{ computedTotalScore }}</pre>
                  </VCol>
                </VRow>
              </div>
            </div>
            <v-textarea
              v-model="text"
              label="Leave a Review"
              row-height="25"
              rows="5"
              variant="outlined"
              auto-grow
              :rules="[requiredValidator]"
              shaped
              class="pt-8"
              value="Leave a review and share how was your experience."
            ></v-textarea>

            <div class="text-center pt-6">
              <VBtn color="primary mr-4 " @click="sendCampaign"> SEND </VBtn>
              <VBtn color="secondary" @click="showModal = false"> Cancel </VBtn>
            </div>
          </VCol>
          <VCol cols="1"></VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>
