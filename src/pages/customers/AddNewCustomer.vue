<script setup>
import { emailValidator, requiredValidator } from "@validators";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isDrawerOpen", "userData"]);

const isFormValid = ref(false);
const refForm = ref();
const firstname = ref("");
const lastname = ref("");
const email = ref("");
const aov = ref("");
const repeated = ref(false);
const phone = ref("");
const lastDiningBehaviour = ref("");

const totalVisits = ref("");
const lastVisitedDate = ref(
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10)
);
console.log(lastVisitedDate.value);

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit("update:isDrawerOpen", false);
  nextTick(() => {
    refForm.value?.reset();
    refForm.value?.resetValidation();
  });
};

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit(
        "userData",
        {
          firstname: firstname.value,
          lastname: lastname.value,
          repeated: repeated.value,
          email: email.value,
          aov: aov.value,
          phone: phone.value,
          totalVisits: totalVisits.value,
          lastDiningBehaviour: lastDiningBehaviour.value,
          lastVisitedDate: lastVisitedDate.value,
        },
        emit("update:isDrawerOpen", false)
      );

      nextTick(() => {
        refForm.value?.reset();
        refForm.value?.resetValidation();
      });
    }
  });
};

const handleDrawerModelValueUpdate = (val) => {
  emit("update:isDrawerOpen", val);
};
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Add New Customer"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
            <VRow>
              <!-- 👉 Full name -->
              <VCol cols="12">
                <VTextField
                  v-model="firstname"
                  :rules="[requiredValidator]"
                  label="First Name"
                />
              </VCol>

              <!-- 👉 Username -->
              <VCol cols="12">
                <VTextField
                  v-model="lastname"
                  :rules="[requiredValidator]"
                  label="Last Name"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                />
              </VCol>

              <!-- 👉 company -->

              <!-- 👉 Contact -->
              <VCol cols="12">
                <VTextField
                  v-model="phone"
                  type="number"
                  :rules="[requiredValidator]"
                  label="Phone Number"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="aov"
                  type="number"
                  :rules="[requiredValidator]"
                  label="Customer's AOV"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="totalVisits"
                  type="number"
                  :rules="[requiredValidator]"
                  label="Total Visits"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="lastDiningBehaviour"
                  :rules="[requiredValidator]"
                  label="Last Dining Behavior"
                />
              </VCol>
              <VTextField
                v-model="lastVisitedDate"
                label="Last Visit Date"
                clear-icon="mdi-close"
                clearable
                type="date"
              />
              <!-- 👉 Status -->
              <VCol cols="12">
                <VSelect
                  v-model="repeated"
                  label="Repeated Customer"
                  :items="[
                    { title: 'YES', value: true },
                    { title: 'NO', value: false },
                  ]"
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn type="submit" class="me-3"> Submit </VBtn>
                <VBtn
                  type="reset"
                  variant="tonal"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

<style scoped>
.app-picker-field {
  width: 100% !important;
}
</style>
