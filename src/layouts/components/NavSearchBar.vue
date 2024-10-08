<script setup>
import { useThemeConfig } from "@core/composable/useThemeConfig";

const { appContentLayoutNav } = useThemeConfig();

defineOptions({ inheritAttrs: false });

// 👉 Is App Search Bar Visible
const isAppSearchBarVisible = ref(false);

// 👉 Default suggestions
const suggestionGroups = [
  {
    title: "Popular Searches",
    content: [
      {
        icon: "mdi-chart-donut",
        title: "Analytics",
        url: { name: "dashboards-analytics" },
      },
      {
        icon: "mdi-chart-bubble",
        title: "CRM",
        url: { name: "dashboard" },
      },
      {
        icon: "mdi-file-outline",
        title: "Invoice List",
        url: { name: "apps-invoice-list" },
      },
      {
        icon: "mdi-account-group-outline",
        title: "User List",
        url: { name: "apps-user-list" },
      },
    ],
  },
  {
    title: "Apps & Pages",
    content: [
      {
        icon: "mdi-calendar",
        title: "Calendar",
        url: { name: "apps-calendar" },
      },
      {
        icon: "mdi-file-plus-outline",
        title: "Invoice Add",
        url: { name: "apps-invoice-add" },
      },
      {
        icon: "mdi-currency-usd",
        title: "Pricing",
        url: { name: "pricing" },
      },
      {
        icon: "mdi-account-cog-outline",
        title: "Account Settings",
        url: {
          name: "pages-account-settings-tab",
          params: { tab: "account" },
        },
      },
    ],
  },
  {
    title: "User Interface",
    content: [
      {
        icon: "mdi-alpha-a-box-outline",
        title: "Typography",
        url: { name: "pages-typography" },
      },
      {
        icon: "mdi-tab",
        title: "Tabs",
        url: { name: "components-tabs" },
      },
      {
        icon: "mdi-gesture-tap-button",
        title: "Buttons",
        url: { name: "components-button" },
      },
      {
        icon: "mdi-keyboard-settings-outline",
        title: "Statistics",
        url: { name: "pages-cards-card-statistics" },
      },
    ],
  },
  {
    title: "Popular Searches",
    content: [
      {
        icon: "mdi-format-list-checkbox",
        title: "Select",
        url: { name: "forms-select" },
      },
      {
        icon: "mdi-lastpass",
        title: "Combobox",
        url: { name: "forms-combobox" },
      },
      {
        icon: "mdi-calendar-range-outline",
        title: "Date & Time Picker",
        url: { name: "forms-date-time-picker" },
      },
      {
        icon: "mdi-hexagram-outline",
        title: "Rating",
        url: { name: "forms-rating" },
      },
    ],
  },
];

// 👉 No Data suggestion
const noDataSuggestions = [
  {
    title: "Analytics Dashboard",
    icon: "mdi-cart-outline",
    url: { name: "dashboards-analytics" },
  },
  {
    title: "Account Settings",
    icon: "mdi-account-outline",
    url: {
      name: "pages-account-settings-tab",
      params: { tab: "account" },
    },
  },
  {
    title: "Pricing Page",
    icon: "mdi-cash",
    url: { name: "pages-pricing" },
  },
];

const searchQuery = ref("");
const searchResult = ref([]);
const router = useRouter();

const redirectToSuggestedOrSearchedPage = (selected) => {
  router.push(selected.url);
  isAppSearchBarVisible.value = false;
  searchQuery.value = "";
};
</script>

<template>
  <div
    class="d-flex align-center cursor-pointer"
    v-bind="$attrs"
    style="user-select: none"
    @click="isAppSearchBarVisible = !isAppSearchBarVisible"
  >
    <!-- 👉 Search Trigger button -->
    <!-- close active tour while opening search bar using icon -->
  </div>
</template>

<style lang="scss" scoped>
@use "@styles/variables/_vuetify.scss";

.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
