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
import uploadFile from "@/assets/images/cards/uploadFile.png";
import google from "@/assets/images/cards/google.png";
import review from "@/assets/images/cards/review.png";
import clickicon from "@/assets/images/cards/click-icons.png";
import like from "@/assets/images/cards/like.png";
import done from "@/assets/images/cards/done2.png";
import facebook from "@/assets/images/cards/facebook.png";
import instagram from "@/assets/images/cards/instagram.png";
import twiter from "@/assets/images/cards/twiter.png";
import emojiregular from "@/assets/images/cards/emojiregular.png";

export default {
  data: () => ({
    done: done,
    ratingw: 0.5,
    ratingw1: 0.5,
    ratingw2: 0.5,
    uploadFile: uploadFile,
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

      <VCardText>
        <VForm class="mt-6">
          <VRow>
            <VCol cols="12" class="text-center mt-4">
              <div class="relative">
                <div
                  class="py-3"
                  style="border: 1px dashed; border-radius: 6px"
                >
                  <div
                    class="me-3 py-1 flex-column d-flex align-center justify-space-between"
                  >
                    <div>
                      <v-img
                        :src="uploadFile"
                        class="flex-grow-0"
                        height="90"
                        width="90"
                        alt="John"
                      ></v-img>
                    </div>
                    <div class="text-center">
                      <p class="mb-0 text-uppercase">
                        Drag and drop files here
                      </p>
                      <div class="pt-2" style="font-size: 10px">
                        File name.mp4
                      </div>
                    </div>
                    <div class="pt-3 pb-1">
                      <VBtn color="primary" @click="refInputEl?.click()">
                        <VIcon
                          icon="mdi-cloud-upload-outline"
                          class="d-sm-none"
                        />
                        <span class="d-none d-sm-block">BROWSE</span>
                      </VBtn>
                      <input
                        ref="refInputEl"
                        type="file"
                        name="file"
                        accept=".csv"
                        hidden
                        @input="uploadCustomerCsv"
                      />
                    </div>
                  </div>
                </div>
                <div class="d-flex align-center justify-center">
                  <div
                    class="mt-5 relative w-75"
                    style="border: 1px solid; border-radius: 5px"
                  >
                    <div class="d-flex align-center justify-space-between pa-3">
                      <div>
                        <div class="">
                          <span class="white text-h6 my-6"
                            >Thanks for stopping by Plaza Azteca!</span
                          >
                          <span class="ml-2">
                            <img
                              :src="like"
                              alt=""
                              class=""
                              width="30"
                              height="30"
                            />
                          </span>
                        </div>
                        <div class="pt-0 seq-actoin">Heading</div>
                      </div>
                      <div>
                        <v-img
                          :src="emojiregular"
                          class="flex-grow-0"
                          height="20"
                          width="20"
                          alt="John"
                        ></v-img>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 class="logoSequence text-h2">LOGO</h3>
              </div>

              <div class="my-5">
                <div class="d-flex align-center justify-center">
                  <div
                    class="mt-5 relative w-75"
                    style="border: 1px solid; border-radius: 5px"
                  >
                    <div class="d-flex align-center justify-space-between pa-3">
                      <div>
                        <div class="">
                          <span class="white  my-6"
                            >Write us a review on Google and Yelp and get 25% Off on your next visit!</span
                          >
                          
                        </div>
                        <div class="pt-0 seq-actoin">Heading</div>
                      </div>
                      <div>
                        <v-img
                          :src="emojiregular"
                          class="flex-grow-0"
                          height="20"
                          width="20"
                          alt="John"
                        ></v-img>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="ml-2">
                  <img :src="like" alt="" class="" width="30" height="30" />
                </span>
              </div>
              <p class="text-body-2 mb-6">
                Write us a review on Google and Yelp and get 25% <br />
                Off on your next visit!
              </p>
              <div class="d-flex align-center justify-center my-8">
                <button
                  class="d-flex align-center justify-center sequence-btn mr-4"
                >
                  <div
                    class="pa-2 sequence-social-btn d-flex align-center justify-center"
                  >
                    <img :src="google" alt="" class="" width="30" height="30" />
                  </div>
                  <div class="px-3">Review us on Google</div>
                </button>
                <button class="d-flex align-center justify-center sequence-btn">
                  <div
                    class="pa-2 sequence-social-btn d-flex align-center justify-center"
                  >
                    <img :src="review" alt="" class="" width="30" height="30" />
                  </div>
                  <div class="px-3">Review us on Yelp</div>
                </button>
              </div>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
      <VRow class="border-t-1">
        <VCol cols="12" class="text-center">
          <div class="d-flex align-center justify-center">
            <a href=""
              ><img :src="facebook" alt="" class="mr-2" width="20" height="20"
            /></a>
            <a href="">
              <img
                :src="instagram"
                alt=""
                class="mr-2"
                width="20"
                height="20"
              />
            </a>
            <a href="">
              <img :src="twiter" alt="" class="" width="15" height="15" />
            </a>
          </div>
          <p class="text-body-2 mt-1 mb-0">© 2024 by Restaurant Name</p>
        </VCol>
      </VRow>
    </VCard>
  </VDialog>
</template>
<style>
.logoSequence {
  position: absolute;
  top: 2%;
  left: 2%;
}
.seq-actoin {
  font-size: 15px;
  position: absolute;
  top: -12px;
  background: #312d4b;
  padding: 0px 5px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
