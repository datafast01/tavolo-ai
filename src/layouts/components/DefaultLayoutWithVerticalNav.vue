<script setup>
import navItems from "@/navigation/vertical";
import { useThemeConfig } from "@core/composable/useThemeConfig";

// Components
import Footer from "@/layouts/components/Footer.vue";
import NavBarNotifications from "@/layouts/components/NavBarNotifications.vue";
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue";
import NavSearchBar from "@/layouts/components/NavSearchBar.vue";
import UserProfile from "@/layouts/components/UserProfile.vue";

// @layouts plugin
import { VerticalNavLayout } from "@layouts";

const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig();
const { width: windowWidth } = useWindowSize();
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          v-if="isLessThanOverlayNavBreakpoint(windowWidth)"
          id="vertical-nav-toggle-btn"
          class="ms-n3"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="mdi-menu" />
        </IconBtn>

        <NavSearchBar class="ms-lg-n3" />

        <VSpacer />

        <!-- <NavBarI18n /> -->
        <NavbarThemeSwitcher />
        <!-- <NavbarShortcuts /> -->
        <NavBarNotifications class="me-2" />
        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView />
    <!-- <Transition :name="appRouteTransition" mode="out-in">
        <KeepAlive>
          <Component :is="Component" />
        </KeepAlive>
      </Transition> -->
    <!-- </RouterView> -->

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <TheCustomizer />
  </VerticalNavLayout>
</template>
