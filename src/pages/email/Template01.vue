<template>
  <div>
    <div class="d-flex justify-center ml-10 my-8" @click="handleSocialMedia">
      <div class="top-logo" @click="handleChange('topLogo')">
        <img
          :src="topLogoUrl()"
          alt="Uploaded Image"
          style="
            width: 140.52509652509649px;
            max-height: 140px;
            max-width: 100%;
          "
        />
        <input
          type="file"
          class="form-control hidden-input"
          id="topLogo"
          name="customers[]"
          aria-describedby="customers"
          ref="customers"
          accept="image/*"
          multiple
          hidden
          @change="handleFileChange"
        />
      </div>
    </div>

    <VSpacer />
    <!-- <h1 class="last-child">
          <span style="font-size: 26px">Apple Crisp Pre-Sale Is Here! 📣</span>
        </h1> -->
    <VTextField
      v-model="subject"
      label="Subject"
      density="compact"
      class="my-4"
      @click="handleSocialMedia"
    >
    </VTextField>
    <div
      class="d-flex justify-center ml-10 align-center my-8"
      @click="handleSocialMedia"
    >
      <div
        class="center-logo d-flex align-center justify-center"
        @click="handleChange('mainImage')"
      >
        <img
          :src="mainImageUrl()"
          alt="Uploaded Image"
          style="
            width: 340.52509652509649px;
            max-height: 140px;
            max-width: 100%;
          "
        />
        <input
          type="file"
          class="form-control hidden-input"
          id="mainImage"
          name="customers[]"
          aria-describedby="customers"
          ref="customers"
          accept="image/*"
          multiple
          hidden
          @change="handleMainImage"
        />
      </div>
    </div>

    <div @click="handleSocialMedia">
      <VTextarea
        v-model="message"
        placeholder="Message"
        label="Email Body"
        auto-grow
      />
    </div>
    <v-divider :thickness="3" class="mb-4"></v-divider>

    <div class="d-flex justify-center my-8">
      <span
        style="padding-left: 24px; padding-top: 0; padding-right: 24px"
        data-breakpoint="29"
        valign="top"
        class="mobileClass-29"
        @click="openFacebook"
      >
        <img
          width="40"
          height="auto"
          style="
            border: 0;
            width: 40px;
            height: auto;
            max-width: 100%;
            display: block;
          "
          alt="Facebook icon"
          src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/facebook-filled-dark-40.png"
          class=""
        />
      </span>
      <span
        style="padding-left: 24px; padding-top: 0; padding-right: 24px"
        data-breakpoint="29"
        valign="top"
        class="mobileClass-29"
        @click="openInstagram"
      >
        <img
          width="40"
          height="auto"
          style="
            border: 0;
            width: 40px;
            height: auto;
            max-width: 100%;
            display: block;
          "
          alt="Instagram icon"
          src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/instagram-filled-dark-40.png"
          class=""
        />
      </span>
      <span
        style="padding-left: 24px; padding-top: 0; padding-right: 24px"
        data-breakpoint="29"
        valign="top"
        class="mobileClass-29"
        @click="openTiktok"
      >
        <img
          width="40"
          height="auto"
          style="
            border: 0;
            width: 40px;
            height: auto;
            max-width: 100%;
            display: block;
          "
          alt="TikTok icon"
          src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/tiktok-filled-dark-40.png"
          class=""
        />
      </span>
    </div>
    <!-- facebook URL  -->
    <VTextField
      v-model="facebookURL"
      label="Facebook URL"
      density="compact"
      class="my-4"
      v-if="isFacebookUrl"
    >
    </VTextField>
    <!-- instagram URL  -->
    <VTextField
      v-model="instaUrl"
      label="Instagram URL"
      density="compact"
      class="my-4"
      v-if="isInstakUrl"
    >
    </VTextField>
    <!-- tiktok url  -->
    <VTextField
      v-model="tiktokUrl"
      label="TikTok URL"
      density="compact"
      class="my-4"
      v-if="isTiktokUrl"
    >
    </VTextField>

    <div
      data-block-id="9"
      class="d-flex justify-center"
      @click="handleSocialMedia"
    >
      <p class="last-child">
        <em
          ><span style="font-size: 12px"
            >Copyright (C) 2023 Two Mixed Up. All rights reserved.</span
          ></em
        ><br /><span style="font-size: 12px"
          >Want to change how you receive these emails?</span
        ><br /><span style="font-size: 12px">You can </span
        ><a
          href="https://tavoloapp.us14.list-manage.com/profile?u=32b84976f7f4821b8b04627e7&amp;id=e837488ab0&amp;e=2430a218e0"
          ><span style="font-size: 12px">update your preferences</span></a
        ><span style="font-size: 12px"> or </span
        ><a
          href="https://tavoloapp.us14.list-manage.com/unsubscribe?u=32b84976f7f4821b8b04627e7&amp;id=e837488ab0&amp;e=2430a218e0&amp;c=fb808175c4"
          ><span style="font-size: 12px">unsubscribe</span></a
        >
      </p>
    </div>
  </div>
</template>
<script>
import axios from "@axios";
export default {
  props: {
    template: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      topLogoFile: null,

      mainImageFile: null,

      bottomImageUrl:
        "https://mcusercontent.com/32b84976f7f4821b8b04627e7/images/00b6209c-e9a1-3888-6b52-a083c0508494.png",
      bottomImageFile: null,

      subject: "Apple Crisp Pre-Sale Is Here! 📣",
      message:
        "This Sunday, on Mother's Day, we're giving all moms a free glass of rosé or mimosa when they dine in. \nJoin us at any Urban Skillet location.Our tables are set and we can't wait to celebrate!\nWe can't wait to serve you soon.\nBest regards,\nUrban Skillet Team!",

      isFacebookUrl: false,
      isInstakUrl: false,

      isTiktokUrl: false,

      facebookURL: "",
      instaUrl: "",
      tiktokUrl: "",
    };
  },
  computed: {},
  methods: {
    topLogoUrl() {
      if (this.template.userFiles) {
        return "data:image;base64," + this.template.userFiles.companyLogo;
      } else
        return "https://mcusercontent.com/32b84976f7f4821b8b04627e7/images/00b6209c-e9a1-3888-6b52-a083c0508494.png";
    },
    mainImageUrl() {
      if (this.template.userFiles) {
        return "data:image;base64," + this.template.userFiles.productImage;
      } else
        return "https://mcusercontent.com/32b84976f7f4821b8b04627e7/images/00b6209c-e9a1-3888-6b52-a083c0508494.png";
    },
    openFacebook() {
      this.isFacebookUrl = true;
      this.isInstakUrl = false;
      this.isTiktokUrl = false;
    },
    openInstagram() {
      this.isFacebookUrl = false;
      this.isInstakUrl = true;
      this.isTiktokUrl = false;
    },
    openTiktok() {
      this.isFacebookUrl = false;
      this.isInstakUrl = false;
      this.isTiktokUrl = true;
    },
    handleSocialMedia() {
      (this.isFacebookUrl = false),
        (this.isInstakUrl = false),
        (this.isTiktokUrl = false);
    },
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.topLogoFile = selectedFile;
        this.topLogoUrl = URL.createObjectURL(selectedFile);
        console.log(selectedFile, "al;kdjfalkd");

        let data = new FormData();
        data.append("file", selectedFile);
        data.append("templateId", "t01");
        data.append("companyLogo", true);
        axios
          .post(`dashboard/add-email-template-data`, data)

          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    handleMainImage(event) {
      const selectedFile = event.target.files[0];

      const fileSizeInBytes = selectedFile.size;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;
      console.log(fileSizeInMB);
      if (selectedFile && fileSizeInMB < 2) {
        this.mainImageFile = selectedFile;
        this.mainImageUrl = URL.createObjectURL(selectedFile);
        console.log(selectedFile, "al;kdjfalkd");

        let data = new FormData();
        data.append("file", selectedFile);
        data.append("templateId", "t01");
        data.append("productImage", true);
        axios
          .post(`dashboard/add-email-template-data`, data)

          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    handleBottomLogo(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.bottomImageFile = selectedFile;
        this.bottomImageUrl = URL.createObjectURL(selectedFile);
      }
    },
    handleChange(id) {
      document.getElementById(id).click();
    },
  },
};
</script>
<style scoped>
.top-logo {
  height: 150px;
  width: 150px;
  border: 3px dotted rgb(var(--v-theme-primary));
}
.center-logo {
  height: 150px;
  width: 450px;
  border: 3px dotted rgb(var(--v-theme-primary));
}
.cursor-pointer {
  cursor: pointer;
}
</style>
