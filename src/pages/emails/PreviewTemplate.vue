<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 860" v-model="dialog">
    <VCard class="pa-0 pa-sm-0">
      <DialogCloseBtn variant="text" size="small" @click="dialog = false" />



      <VCardText>
        <VForm class="mt-6">
          <VRow>
            <VCol cols="12" class="text-center mt-4">
              <div class="relative">
                <img :src="nameSequence" alt="" class="w-100 h-100" />
                <h3 class="logo-Sequence text-h4">LOGO</h3>
              </div>

              <div class="my-5">
                <span class="white text-h5 my-6">Thanks for stopping by Plaza Azteca!</span>
                <span class="ml-2">
                  <img :src="like" alt="" class="" width="30" height="30" />
                </span>
              </div>
              <p class="text-body-2 mb-6">
                Write us a review on Google and Yelp and get 25% <br />
                Off on your next visit!
              </p>
              <div class="d-flex align-center justify-center my-8">
                <button class="d-flex align-center justify-center sequence-btn mr-4">
                  <div class="pa-2 sequence-social-btn d-flex align-center justify-center">
                    <img src="../../assets/images/logos/favicon.png" alt="" class="" width="30" height="30" />
                  </div>
                  <div class="px-3">Review us on Google</div>
                </button>
                <button class="d-flex align-center justify-center sequence-btn">
                  <div class="pa-2 sequence-social-btn d-flex align-center justify-center">
                    <img src="../../assets/images/logos/favicon.png" alt="" class="" width="30" height="30" />
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
            <a href=""><img :src="facebook" alt="" class="mr-2" width="20" height="20" /></a>
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
      <VCardActions>
        <v-btn>
          Luanch
        </v-btn>
      </VCardActions>

    </VCard>
  </VDialog>
</template>
<script>
import {
  alphaValidator,
  emailValidator,
  integerValidator,
  lengthValidator,
  requiredValidator,
} from "@validators";
import nameSequence from "@/assets/images/cards/nameSequence.png";
import like from "@/assets/images/cards/like.png";
import google from "@/assets/images/cards/google.png";
import review from "@/assets/images/cards/review.png";
import instagram from "@/assets/images/cards/instagram.png";
import facebook from "@/assets/images/cards/facebook.png";
import twiter from "@/assets/images/cards/twiter.png";

export default {
  data() {
    return {
      dialog: false,
      emailValidator: emailValidator,
      requiredValidator: requiredValidator,
      lengthValidator: lengthValidator,
      alphaValidator: alphaValidator,
      integerValidator: integerValidator,
      Fusce: "Fusce vulputate dolor quam",
      Duis: "Duis vehicula tempus massa",
      businessEmail: "",
      socialAccount: null,
      nameSequence: nameSequence,
      like: like,
      google: google,
      review: review,
      twiter: twiter,
      facebook: facebook,
      instagram: instagram,

      socialMedia: [
        {
          key: "instagram",
          name: "Instagram",
          icon: "mdi-instagram",
        },
        {
          key: "facebook",
          name: "Facebook",
          icon: "mdi-facebook",
        },
        {
          key: "tiktok",
          name: "TikTok",
          icon: "mdi-music-note",
        },
      ],
    };
  },


};
</script>
<style>
.sequence-btn {
  background: #312d4b;
  border: 1px solid #9155fd;
  border-radius: 6px;
  overflow: hidden;
  color: white;
}

.sequence-social-btn {
  background: #3a3859;
}

.border-t-1 {
  border-top: 1px solid #524c6d;
}

.relative {
  position: relative;
}

.logo-Sequence {
  position: absolute;
  top: 15px;
  left: 15px;
  
}
</style>
