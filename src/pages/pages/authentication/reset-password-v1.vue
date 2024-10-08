<script setup>
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import authV1MaskDark from "@images/pages/auth-v1-mask-dark.png";
import authV1MaskLight from "@images/pages/auth-v1-mask-light.png";
import authV1Tree2 from "@images/pages/auth-v1-tree-2.png";
import authV1Tree from "@images/pages/auth-v1-tree.png";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";

const form = ref({
  newPassword: "",
  confirmPassword: "",
});

const authThemeMask = useGenerateImageVariant(authV1MaskLight, authV1MaskDark);
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <VNodeRenderer :nodes="themeConfig.app.logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-medium text-2xl text-uppercase">
          {{ themeConfig.app.title }}
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">Reset Password 🔒</h5>
        <p class="mb-0">
          Enter your email and we'll send you instructions to reset your
          password
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.newPassword"
                autofocus
                label="New Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="
                  isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                "
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>

            <!-- Confirm Password -->
            <VCol cols="12">
              <VTextField
                v-model="form.confirmPassword"
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

            <!-- reset password -->
            <VCol cols="12">
              <VBtn block type="submit"> Set New Password </VBtn>
            </VCol>

            <!-- back to login -->
            <!-- <VCol cols="12">
              <RouterLink
                class="d-flex align-center justify-center"
                :to="{ name: 'pages-authentication-login-v1' }"
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

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg class="auth-footer-mask d-none d-md-block" :src="authThemeMask" />
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
