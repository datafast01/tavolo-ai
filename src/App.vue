<script setup>
import axios from "@axios";
import ScrollToTop from "@core/components/ScrollToTop.vue";
import { useThemeConfig } from "@core/composable/useThemeConfig";
import { hexToRgb } from "@layouts/utils";
import { useTheme } from "vuetify";
import Default from "./layouts/default.vue";

const {
  syncInitialLoaderTheme,
  syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme,
  isAppRtl,
  handleSkinChanges,
} = useThemeConfig();

const { global } = useTheme();

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme();
syncConfigThemeWithVuetifyTheme();
handleSkinChanges();
let userData = ref({});
const getUserProfile = () => {
  // console.log("submit form", ApiService);
  axios
    .get(`getprofile`)
    .then((response) => {
      console.log("user", response.data);
      userData.value = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
getUserProfile();
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp
      :style="`--v-global-theme-primary: ${hexToRgb(
        global.current.value.colors.primary
      )}`"
    >
      <template
        v-if="['login', 'register', 'forgot-password'].includes($route.name)"
      >
        <RouterView />
      </template>
      <div
        v-show="!['login', 'register', 'forgot-password'].includes($route.name)"
      >
        <v-alert
          v-if="!userData.cloverToken"
          color="warning"
          icon="$warning"
          variant="tonal"
          text="Your POS is not connected please connect it"
          max-width="430"
          class="pos-alert mt-1"
        ></v-alert>
        <Default />
        <ScrollToTop />
      </div>
    </VApp>
  </VLocaleProvider>
</template>

<style scoped>
.pos-alert {
  position: fixed;
  left: 40%;
  z-index: 999;
}
</style>
