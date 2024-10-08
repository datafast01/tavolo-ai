<template>
  <div>
    <!-- Title and Logo -->
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <div class="auth-logo d-flex align-start gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />

      <h1 class="font-weight-medium leading-normal text-2xl text-uppercase">
        {{ themeConfig.app.title }}
      </h1>
    </div>

    <VRow class="auth-wrapper" no-gutters>
      <VCol
        lg="8"
        class="d-none d-lg-flex align-center justify-center position-relative"
      >
        <VImg max-width="768px" :src="authThemeImg" class="auth-illustration" />
        <VImg :width="276" :src="tree" class="auth-footer-start-tree" />
        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </VCol>

      <VCol
        cols="12"
        lg="4"
        class="auth-card-v2 d-flex align-center justify-center"
      >
        <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
          <VCardText>
            <h5 class="text-h5 mb-1">Forgot Password? 🔒</h5>
            <p class="mb-0">
              Enter your email and we'll send you instructions to reset your
              password
            </p>
          </VCardText>

          <VCardText>
            <VForm ref="refVForm" @submit.prevent="onSubmit">
              <VRow>
                <!-- email -->
                <VCol cols="12">
                  <VTextField
                    v-model="email"
                    label="Email"
                    type="email"
                    :rules="[requiredValidator, emailValidator]"
                    :error-messages="errors.email"
                  />
                </VCol>

                <!-- Reset link -->
                <VCol cols="12">
                  <VBtn block type="submit" :loading="loading">
                    Send Reset Link
                  </VBtn>
                </VCol>

                <!-- back to login -->
                <VCol cols="12" class="text-center">
                  <RouterLink class="text-primary ms-2" :to="{ name: 'login' }">
                    <VIcon class="flip-in-rtl" icon="mdi-chevron-left" />
                    <span>Back to login</span>
                  </RouterLink>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
import axios from "@axios";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import authV2ForgotPasswordIllustrationBorderedDark from "@images/pages/auth-v2-forgot-password-illustration-bordered-dark.png";
import authV2ForgotPasswordIllustrationBorderedLight from "@images/pages/auth-v2-forgot-password-illustration-bordered-light.png";
import authV2ForgotPasswordIllustrationDark from "@images/pages/auth-v2-forgot-password-illustration-dark.png";
import authV2ForgotPasswordIllustrationLight from "@images/pages/auth-v2-forgot-password-illustration-light.png";
import authV2MaskDark from "@images/pages/auth-v2-mask-dark.png";
import authV2MaskLight from "@images/pages/auth-v2-mask-light.png";
import tree from "@images/pages/tree.png";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import { emailValidator, requiredValidator } from "@validators";

const email = ref("");
let loading = ref(false);
const errors = ref({
  email: undefined,
});
const refVForm = ref();
const authThemeImg = useGenerateImageVariant(
  authV2ForgotPasswordIllustrationLight,
  authV2ForgotPasswordIllustrationDark,
  authV2ForgotPasswordIllustrationBorderedLight,
  authV2ForgotPasswordIllustrationBorderedDark,
  true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);
const router = useRouter();
const route = useRoute();

let show = ref(false);
let snkMsg = ref("");
let color = ref("#9575CD");

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) forgotPassword();
  });
};
const forgotPassword = () => {
  loading.value = true;
  axios
    .post("/sendresetpasswordemail", {
      email: email.value,
    })
    .then((res) => {
      // console.log(res.data);
      show.value = true;
      snkMsg.value = res.data.message + "Please check you email.";
      loading.value = false;

      router.replace(
        route.query.to ? String(route.query.to) : "/reset-password"
      );

      // localStorage.setItem('accessToken', JSON.stringify(accessToken))
    })
    .catch((err) => {
      loading.value = false;
      console.error(err);
      show.value = true;
      if (err.response.status == 404) {
        snkMsg.value = err.response.data.message;
      } else {
        snkMsg.value = err.response.data.message;
      }
      color.value = "error";
    });
};
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
