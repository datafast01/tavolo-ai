<script setup>
import { lengthValidator } from "@validators";

const isNameValid = (value) => {
  return (
    lengthValidator(value, 1, 15) ||
    "Contract title must be between 1 and 15 characters"
  );
};
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

const emit = defineEmits(["update:isDialogVisible", "customerData"]);

const isFormValid = ref(false);
const refForm = ref();

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit("update:isDialogVisible", false);
};

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      // Call deleteUser method here
      deleteUser(props.customerData._id);

      // Close the dialog
      closeNavigationDrawer();

      // Reset and clear the form
      nextTick(() => {
        refForm.value?.reset();
        refForm.value?.resetValidation();
      });
    }
  });
};

const onFormReset = () => {
  emit("update:isDialogVisible", false);
};
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 400"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogVisibleUpdate"
  >
    <v-card
      max-width="400"
      prepend-icon="mdi-update"
      text="Your application will relaunch automatically after the update is complete."
      title="Update in progress"
    >
      <template v-slot:actions>
        <VCol cols="12" class="d-flex flex-wrap justify-end gap-4">
          <VBtn @click="onSubmit" type="submit"> Confirm </VBtn>

          <VBtn color="secondary" variant="tonal" @click="onFormReset">
            Cancel
          </VBtn>
        </VCol>
      </template>
    </v-card>
  </VDialog>
</template>

<style scoped>
.app-picker-field {
  width: 100% !important;
}
</style>
