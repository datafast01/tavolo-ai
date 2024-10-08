<template>
  <div>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <!-- Title and Logo -->
    <div class="auth-logo d-flex align-start gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />

      <h1 class="font-weight-medium leading-normal text-2xl text-uppercase">
        {{ themeConfig.app.title }}
      </h1>
    </div>

    <VRow no-gutters class="auth-wrapper">
      <VCol
        md="8"
        class="d-none d-md-flex align-center justify-center position-relative"
      >
        <div class="d-flex align-center justify-center w-100 pa-10 pe-0">
          <VImg
            max-width="768px"
            :src="authThemeImg"
            class="auth-illustration"
          />
        </div>

        <VImg :width="276" :src="tree3" class="auth-footer-start-tree" />

        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </VCol>

      <VCol
        cols="12"
        md="4"
        class="auth-card-v2 d-flex align-center justify-center"
      >
        <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
          <VCardText>
            <h5 class="text-h5 mb-1">Reset Password 🔒</h5>
            <p class="mb-0">
              Enter your email and we'll send you instructions to reset your
              password
            </p>
          </VCardText>

          <VCardText>
            <VForm ref="refVForm" @submit.prevent="onSubmit">
              <VRow>
                <!-- password -->
                <VCol cols="12">
                  <VTextField
                    v-model="newPassword"
                    :rules="[requiredValidator]"
                    label="New Password"
                    autofocus
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordVisible
                        ? 'mdi-eye-off-outline'
                        : 'mdi-eye-outline'
                    "
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </VCol>

                <!-- Confirm Password -->
                <VCol cols="12">
                  <VTextField
                    v-model="confirmPassword"
                    :rules="[
                      requiredValidator,
                      confirmedValidator(confirmPassword, newPassword),
                    ]"
                    label="Confirm Password"
                    :type="isConfirmPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                      isConfirmPasswordVisible
                        ? 'mdi-eye-off-outline'
                        : 'mdi-eye-outline'
                    "
                    @click:append-inner="
                      isConfirmPasswordVisible = !isConfirmPasswordVisible
                    "
                  />
                </VCol>

                <!-- Set password -->
                <VCol cols="12">
                  <VBtn block type="submit" :loading="loading">
                    Set New Password
                  </VBtn>
                </VCol>

                <!-- back to login -->
                <!-- <VCol cols="12">
                  <RouterLink
                    class="d-flex align-center justify-center"
                    :to="{ name: 'pages-authentication-login-v2' }"
                  >
                    <VIcon
                      icon="mdi-chevron-left"
                      class="flip-in-rtl"
                    />
                    <span>Back to login</span>
                  </RouterLink>
                </VCol> -->
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
import authV2MaskDark from "@images/pages/auth-v2-mask-dark.png";
import authV2MaskLight from "@images/pages/auth-v2-mask-light.png";
import authV2ResetPasswordIllustrationBorderedDark from "@images/pages/auth-v2-reset-password-illustration-bordered-dark.png";
import authV2ResetPasswordIllustrationBorderedLight from "@images/pages/auth-v2-reset-password-illustration-bordered-light.png";
import authV2ResetPasswordIllustrationDark from "@images/pages/auth-v2-reset-password-illustration-dark.png";
import authV2ResetPasswordIllustrationLight from "@images/pages/auth-v2-reset-password-illustration-light.png";
import tree3 from "@images/pages/tree-3.png";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import { useRoute, useRouter } from "vue-router";

import { confirmedValidator, requiredValidator } from "@validators";
const route = useRoute();
const router = useRouter();
const newPassword = ref("");
const confirmPassword = ref("");
let loading = ref(false);

const errors = ref({
  email: undefined,
  password: undefined,
});
let show = ref(false);
let snkMsg = ref("");
let color = ref("#9575CD");
const refVForm = ref();
const authThemeImg = useGenerateImageVariant(
  authV2ResetPasswordIllustrationLight,
  authV2ResetPasswordIllustrationDark,
  authV2ResetPasswordIllustrationBorderedLight,
  authV2ResetPasswordIllustrationBorderedDark,
  true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const resetPassword = () => {
  loading.value = true;
  axios
    .post("/resetpassword", {
      password: newPassword.value,
      confirmPassword: confirmPassword.value,
    })
    .then((res) => {
      console.log(res.data);

      loading.value = false;
      show.value = true;
      snkMsg.value = res.data.message;

      // Redirect to `to` query if exist or redirect to index route
      router.replace(route.query.to ? String(route.query.to) : "/profile");
    })
    .catch((err) => {
      loading.value = false;
      console.error(err);
      show.value = true;

      snkMsg.value = err.response.data.message;

      color.value = "error";
    });
};
const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) resetPassword();
  });
};
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
