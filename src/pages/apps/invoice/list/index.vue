<script setup>
import { VDataTableServer } from "vuetify/labs/VDataTable";
// import { paginationMeta } from '@/@fake-db/utils'
import { useInvoiceStore } from "@/views/apps/invoice/useInvoiceStore";
import { avatarText } from "@core/utils/formatters";

const invoiceListStore = useInvoiceStore();
const searchQuery = ref("");
const dateRange = ref("");
const selectedStatus = ref();
const totalInvoices = ref(0);
const invoices = ref([]);
const selectedRows = ref([]);

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
});

const isLoading = ref(false);

// 👉 headers
const headers = [
  {
    title: "#",
    key: "id",
  },
  {
    title: "Trending",
    key: "trending",
    sortable: false,
  },
  {
    title: "CLIENT",
    key: "client",
  },
  {
    title: "TOTAL",
    key: "total",
  },
  {
    title: "DATE",
    key: "date",
  },
  {
    title: "BALANCE",
    key: "balance",
  },
  {
    title: "ACTION",
    key: "action",
    sortable: false,
  },
];

// 👉 Fetch Invoices
const fetchInvoices = (query, currentStatus, firstDate, lastDate, option) => {
  isLoading.value = true;
  invoiceListStore
    .fetchInvoices({
      q: query,
      status: currentStatus,
      startDate: firstDate,
      endDate: lastDate,
      options: option,
    })
    .then((response) => {
      invoices.value = response.data.invoices;
      totalInvoices.value = response.data.totalInvoices;
      options.value.page = response.data.page;
    })
    .catch();
  isLoading.value = false;
};

// 👉 Invoice balance variant resolver
const resolveInvoiceBalanceVariant = (balance, total) => {
  if (balance === total)
    return {
      status: "Unpaid",
      chip: { color: "error" },
    };
  if (balance === 0)
    return {
      status: "Paid",
      chip: { color: "success" },
    };

  return {
    status: balance,
    chip: { variant: "text" },
  };
};

const resolveInvoiceStatusVariantAndIcon = (status) => {
  if (status === "Partial Payment")
    return {
      variant: "warning",
      icon: "mdi-chart-timeline-variant",
    };
  if (status === "Paid")
    return {
      variant: "success",
      icon: "mdi-check",
    };
  if (status === "Downloaded")
    return {
      variant: "info",
      icon: "mdi-arrow-down",
    };
  if (status === "Draft")
    return {
      variant: "secondary",
      icon: "mdi-content-save-outline",
    };
  if (status === "Sent")
    return {
      variant: "primary",
      icon: "mdi-email-outline",
    };
  if (status === "Past Due")
    return {
      variant: "error",
      icon: "mdi-alert-circle-outline",
    };

  return {
    variant: "secondary",
    icon: "mdi-close",
  };
};

const computedMoreList = computed(() => {
  return (paramId) => [
    {
      title: "Download",
      value: "download",
      prependIcon: "mdi-download-outline",
    },
    {
      title: "Edit",
      value: "edit",
      prependIcon: "mdi-pencil-outline",
      to: {
        name: "apps-invoice-edit-id",
        params: { id: paramId },
      },
    },
    {
      title: "Duplicate",
      value: "duplicate",
      prependIcon: "mdi-layers-outline",
    },
  ];
});

const deleteInvoice = (id) => {
  invoiceListStore
    .deleteInvoice(id)
    .then(() => {
      fetchInvoices(
        searchQuery.value,
        selectedStatus.value,
        dateRange.value?.split("to")[0],
        dateRange.value?.split("to")[1],
        options.value
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

// 👉 watch for data table options like itemsPerPage,page,searchQuery,sortBy etc...
watchEffect(() => {
  const [start, end] = dateRange.value ? dateRange.value.split("to") : "";

  fetchInvoices(
    searchQuery.value,
    selectedStatus.value,
    start,
    end,
    options.value
  );
});
</script>

<template>
  <section v-if="invoices">
    <!-- 👉 Invoice Filters  -->
    <VCard title="Filters" class="mb-6">
      <VCardText>
        <VRow>
          <!-- 👉 Status filter -->
          <VCol cols="12" md="6">
            <VSelect
              v-model="selectedStatus"
              label="Select Status"
              clearable
              clear-icon="mdi-close"
              :items="[
                'Downloaded',
                'Draft',
                'Sent',
                'Paid',
                'Partial Payment',
                'Past Due',
              ]"
            />
          </VCol>

          <!-- 👉 DateRange filter -->
          <VCol cols="12" md="6">
            <AppDateTimePicker
              v-model="dateRange"
              label="Invoice Date"
              clear-icon="mdi-close"
              clearable
              :config="{ mode: 'range' }"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard id="invoice-list">
      <VCardText class="d-flex align-center flex-wrap gap-4">
        <!-- 👉 Action  -->
        <div class="me-3">
          <VSelect
            density="compact"
            label="Action"
            :items="['Delete', 'Edit', 'Send']"
            class="invoice-list-actions"
            :disabled="!selectedRows.length"
          />
        </div>

        <VSpacer />

        <div class="d-flex align-center flex-wrap gap-6">
          <!-- 👉 Search  -->
          <div class="invoice-list-search">
            <VTextField
              v-model="searchQuery"
              placeholder="Search Invoice"
              density="compact"
            />
          </div>

          <!-- 👉 Create invoice -->
          <VBtn :to="{ name: 'apps-invoice-add' }"> Create invoice </VBtn>
        </div>
      </VCardText>

      <!-- SECTION Datatable -->
      <VDataTableServer
        v-model="selectedRows"
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :search="searchQuery"
        :loading="isLoading"
        show-select
        :items-length="totalInvoices"
        :headers="headers"
        :items="invoices"
        class="text-no-wrap rounded-0"
        @update:options="options = $event"
      >
        <!-- Trending Header -->
        <template #column.trending>
          <VIcon size="22" icon="mdi-arrow-up" />
        </template>

        <!-- id -->
        <template #item.id="{ item }">
          <RouterLink
            :to="{
              name: 'apps-invoice-preview-id',
              params: { id: item.value },
            }"
            class="text-sm"
          >
            #{{ item.raw.id }}
          </RouterLink>
        </template>

        <!-- trending -->
        <template #item.trending="{ item }">
          <VTooltip>
            <template #activator="{ props }">
              <VAvatar
                :size="34"
                v-bind="props"
                :color="
                  resolveInvoiceStatusVariantAndIcon(item.raw.invoiceStatus)
                    .variant
                "
                variant="tonal"
              >
                <VIcon
                  :size="20"
                  :icon="
                    resolveInvoiceStatusVariantAndIcon(item.raw.invoiceStatus)
                      .icon
                  "
                />
              </VAvatar>
            </template>
            <p class="mb-0">
              {{ item.raw.invoiceStatus }}
            </p>
            <p class="mb-0">Balance: {{ item.raw.balance }}</p>
            <p class="mb-0">Due date: {{ item.raw.dueDate }}</p>
          </VTooltip>
        </template>

        <!-- client -->
        <template #item.client="{ item }">
          <div class="d-flex align-center">
            <VAvatar
              size="34"
              :color="
                !item.raw.avatar.length
                  ? resolveInvoiceStatusVariantAndIcon(item.raw.invoiceStatus)
                      .variant
                  : undefined
              "
              :variant="!item.raw.avatar.length ? 'tonal' : undefined"
              class="me-3"
            >
              <VImg v-if="item.raw.avatar.length" :src="item.raw.avatar" />
              <span v-else>{{ avatarText(item.raw.client.name) }}</span>
            </VAvatar>

            <div class="d-flex flex-column">
              <h6 class="text-sm font-weight-medium mb-0">
                {{ item.raw.client.name }}
              </h6>

              <span class="text-caption">{{
                item.raw.client.companyEmail
              }}</span>
            </div>
          </div>
        </template>

        <!-- Total -->
        <template #item.total="{ item }">
          <span class="text-sm"> ${{ item.raw.total }} </span>
        </template>

        <!-- Date -->
        <template #item.date="{ item }">
          <span class="text-sm">
            {{ item.raw.issuedDate }}
          </span>
        </template>

        <!-- Balance -->
        <template #item.balance="{ item }">
          <VChip
            v-if="
              typeof resolveInvoiceBalanceVariant(
                item.raw.balance,
                item.raw.total
              ).status === 'string'
            "
            :color="
              resolveInvoiceBalanceVariant(item.raw.balance, item.raw.total)
                .chip.color
            "
            density="comfortable"
          >
            {{
              resolveInvoiceBalanceVariant(item.raw.balance, item.raw.total)
                .status
            }}
          </VChip>

          <span v-else class="text-high-emphasis text-sm">
            {{
              Number(
                resolveInvoiceBalanceVariant(item.raw.balance, item.raw.total)
                  .status
              ) > 0
                ? `$${
                    resolveInvoiceBalanceVariant(
                      item.raw.balance,
                      item.raw.total
                    ).status
                  }`
                : `-$${Math.abs(
                    Number(
                      resolveInvoiceBalanceVariant(
                        item.raw.balance,
                        item.raw.total
                      ).status
                    )
                  )}`
            }}
          </span>
        </template>

        <!-- Actions -->
        <template #item.action="{ item }">
          <IconBtn @click="deleteInvoice(item.raw.id)">
            <VIcon icon="mdi-delete-outline" />
          </IconBtn>

          <IconBtn
            :to="{
              name: 'apps-invoice-preview-id',
              params: { id: item.raw.id },
            }"
          >
            <VIcon icon="mdi-eye-outline" />
          </IconBtn>

          <MoreBtn :menu-list="computedMoreList(item.raw.id)" item-props />
        </template>

        <!-- Pagination -->
        <template #bottom>
          <VDivider />

          <div class="d-flex justify-end flex-wrap gap-x-6 pa-2">
            <div class="d-flex align-center gap-x-2 text-sm">
              Rows Per Page:
              <VSelect
                v-model="options.itemsPerPage"
                class="per-page-select text-high-emphasis"
                variant="plain"
                density="compact"
                :items="[10, 20, 25, 50, 100]"
              />
            </div>

            <!-- <span class="d-flex align-center text-sm text-high-emphasis me-2">{{ paginationMeta(options, totalInvoices) }}</span> -->

            <div class="d-flex gap-x-2 align-center me-2">
              <VBtn
                class="flip-in-rtl"
                icon="mdi-chevron-left"
                variant="text"
                density="comfortable"
                color="default"
                :disabled="options.page <= 1"
                @click="options.page <= 1 ? (options.page = 1) : options.page--"
              />

              <VBtn
                class="flip-in-rtl"
                icon="mdi-chevron-right"
                density="comfortable"
                variant="text"
                color="default"
                :disabled="
                  options.page >=
                  Math.ceil(totalInvoices / options.itemsPerPage)
                "
                @click="
                  options.page >=
                  Math.ceil(totalInvoices / options.itemsPerPage)
                    ? (options.page = Math.ceil(
                        totalInvoices / options.itemsPerPage
                      ))
                    : options.page++
                "
              />
            </div>
          </div>
        </template>
      </VDataTableServer>
      <!-- !SECTION -->
      <VDivider />
    </VCard>
  </section>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .invoice-list-search {
    inline-size: 12rem;
  }
}
</style>
