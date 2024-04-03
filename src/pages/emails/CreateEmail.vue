<template>
  <div class="pa-0 pa-sm-0">
    <VCardText class="">
      <VForm class="">
        <VRow>
          <VCol cols="12" class="text-center">
            <div class="relative">
              <div class="py-3" style="border: 1px dashed; border-radius: 6px">
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
                    <p class="mb-0 text-uppercase">Drag and drop files here</p>
                    <div class="pt-2" style="font-size: 10px">
                      {{ fileName }}
                    </div>
                  </div>
                  <div class="pt-3 pb-1">
                    <v-btn color="primary" @click="openFileInput">
                      <v-icon
                        icon="mdi-cloud-upload-outline"
                        class="d-sm-none"
                      />
                      <span class="d-none d-sm-block">BROWSE</span>
                    </v-btn>
                    <input
                      ref="refInputEl"
                      type="file"
                      name="file"
                      accept="image/*"
                      @change="handleFileChange"
                      hidden
                    />
                  </div>
                </div>
              </div>
              <div class="d-flex align-center justify-center mt-5">
                <v-text-field label="Subject" variant="outlined">
                  <template v-slot:append-inner>
                    <v-img
                      :src="emojiregular"
                      class="flex-grow-0"
                      height="20"
                      width="20"
                      alt="John"
                    ></v-img>
                  </template>
                </v-text-field>
              </div>
              <h3 class="logoSequence text-h4 pa-4">LOGO</h3>
            </div>

            <div class="mt-3 mb-4">
              <div class="d-flex align-center justify-center">
                <!-- <div class="mt-5 relative w-75" style="border: 1px solid; border-radius: 5px">
                                    <div class="d-flex align-center justify-space-between pa-3">
                                        <div>
                                            <div class="">
                                                <span class="white  my-6" style="font-size: 12px;">Write us a review
                                                    on Google and Yelp and get 25% Off on your next visit!</span>

                                            </div>

                                        </div>
                                        <div>
                                            <v-img :src="emojiregular" class="flex-grow-0" height="20" width="20"
                                                alt="John"></v-img>
                                        </div>
                                    </div>
                                </div> -->
                <v-text-field label="Body" variant="outlined">
                  <template v-slot:append-inner>
                    <v-img
                      :src="emojiregular"
                      class="flex-grow-0"
                      height="20"
                      width="20"
                      alt="John"
                    ></v-img>
                  </template>
                </v-text-field>
              </div>
            </div>

            <div class="d-flex align-center justify-center my-8">
              <!-- <div
                class="d-flex align-center justify-center sequence-btn mr-4"
                style="border: 1px solid; border-radius: 5px"
                v-for="button in buttons"
                :key="button"
              >
                <div class="px-3">Review us on Google dsda</div>
              </div> -->
              <div
                class="d-flex align-center justify-center sequence-btn"
                v-for="button in buttons"
                :key="button"
              >
                <div
                  class="pa-2 sequence-social-btn d-flex align-center justify-center"
                >
                  <img
                    src="../../assets/images/logos/favicon.png"
                    alt=""
                    class=""
                    width="30"
                    height="30"
                  />
                </div>
                <div class="px-3">Review us on Google</div>
              </div>
            </div>
            <div class="d-flex align-center justify-center my-8">
              <VBtn
                class="d-flex align-center justify-center mr-4"
                @click="addAButtonDialog = true"
              >
                Add A Button
              </VBtn>
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
            <img :src="instagram" alt="" class="mr-2" width="20" height="20" />
          </a>
          <a href="">
            <img :src="twiter" alt="" class="" width="15" height="15" />
          </a>
        </div>
        <p class="text-body-2 mt-1 mb-0">© 2024 by Restaurant Name</p>
      </VCol>
    </VRow>

    <!-- dialog for adding a button  -->
    <v-dialog max-width="800" v-model="addAButtonDialog">
      <v-card>
        <v-card-title>
          <div class="d-flex justify-space-between pa-2">
            <div>Add a button</div>
            <div>
              <VBtn @click="addButton"> Add </VBtn>
            </div>
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div>Choose the type of the button below.</div>
        </v-card-subtitle>
        <v-card-text>
          <v-select
            label="Type Of Button"
            :items="buttonTypes"
            item-value="value"
            item-title="title"
            v-model="typeOfButton"
            class="mb-4"
            variant="outlined"
          ></v-select>
          <v-select
            label="Platform"
            :items="platforms"
            item-value="value"
            item-title="title"
            v-model="platform"
            variant="outlined"
          ></v-select>
          <v-text-field
            label="URL"
            v-model="url"
            class="mt-4"
            ariant="outlined"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close Dialog" @click="addAButtonDialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

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
  data() {
    return {
      google: google,
      facebook: facebook,
      instagram: instagram,
      twiter: twiter,
      emojiregular: emojiregular,
      like: like,

      done: done,
      ratingw: 0.5,
      ratingw1: 0.5,
      ratingw2: 0.5,
      uploadFile: uploadFile,
      addAButtonDialog: false,

      buttonTypes: [
        {
          title: "Review Button",
          value: "review",
        },
      ],
      platforms: [
        {
          title: "Facebook",
          value: "facebook",
        },
        {
          title: "Instagram",
          value: "instagram",
        },
        {
          title: "Google",
          value: "google",
        },
      ],
      buttons: [],
      url: "",
      typeOfButton: null,
      platform: null,
      logo: null,
      fileName: "",
    };
  },
  methods: {
    addButton() {
      this.buttons.push({
        typeOfButton: this.typeOfButton,
        platform: this.platform,
        url: this.url,
      });
    },
    openFileInput() {
      this.$refs.refInputEl.click();
    },
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.file = selectedFile;
      this.fileName = selectedFile.name;
      console.log("Selected file:", selectedFile.name);
    },
  },
};
</script>
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
