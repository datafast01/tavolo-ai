<script setup>
import { requiredValidator } from "@validators";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  customerData: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(["submit", "update:isDialogVisible"]);

const customerData = ref(structuredClone(toRaw(props.customerData)));
const isUseAsBillingAddress = ref(false);

watch(props, () => {
  customerData.value = structuredClone(toRaw(props.customerData));
});

const onFormSubmit = () => {
  emit("update:isDialogVisible", false);
  emit("submit", customerData.value);
};

const onFormReset = () => {
  customerData.value = structuredClone(toRaw(props.customerData));
  emit("update:isDialogVisible", false);
};

const dialogVisibleUpdate = (val) => {
  emit("update:isDialogVisible", val);
};
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogVisibleUpdate"
  >
    <VCard class="pa-sm-9 pa-5">
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn variant="text" size="small" @click="onFormReset" />

      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-6">
          Edit Customer Information
        </VCardTitle>
        <VCardSubtitle>
          Updating customer details will receive a privacy audit.
        </VCardSubtitle>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm class="mt-6" @submit.prevent="onFormSubmit">
          <VRow>
            <!-- 👉 Full Name -->
            <VCol cols="12" md="6">
              <VTextField
                v-model="customerData.firstName"
                :rules="[requiredValidator]"
                label="First Name"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="customerData.lastName"
                :rules="[requiredValidator]"
                label="Last Name"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="customerData.emailAddresses.elements[0].emailAddress"
                :rules="[requiredValidator, emailValidator]"
                label="Email"
              />
            </VCol>

            <!-- 👉 company -->

            <!-- 👉 Contact -->
            <VCol cols="12" md="6">
              <VTextField
                v-model="customerData.emailAddresses.elements[0].emailAddress"
                :rules="[requiredValidator]"
                label="Phone Number"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="customerData.aov"
                type="number"
                :rules="[requiredValidator]"
                label="Customer's AOV"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="customerData.totalVisits"
                type="number"
                :rules="[requiredValidator]"
                label="Total Visits"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="customerData.lastDiningBehaviour"
                :rules="[requiredValidator]"
                label="Last Dining Behavior"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="customerData.lastVisitedDate"
                label="Last Visit Date"
                clearable
                type="date"
              />
            </VCol>

            <!-- 👉 Status -->
            <VCol cols="12" md="6">
              <VSelect
                v-model="customerData.repeated"
                label="Repeated Customer"
                :items="[
                  { title: 'YES', value: true },
                  { title: 'NO', value: false },
                ]"
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol cols="12" class="d-flex flex-wrap justify-center gap-4">
              <VBtn type="submit"> Submit </VBtn>

              <VBtn color="secondary" variant="tonal" @click="onFormReset">
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
