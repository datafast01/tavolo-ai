<script setup>
import { requiredValidator } from "@validators";

const props = defineProps({
  cardDetails: {
    type: Object,
    required: false,
    default: () => ({
      number: "",
      name: "",
      expiry: "",
      cvv: "",
      isPrimary: false,
      type: "",
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["submit", "update:isDialogVisible"]);

const cardDetails = ref(structuredClone(toRaw(props.cardDetails)));

watch(props, () => {
  cardDetails.value = structuredClone(toRaw(props.cardDetails));
});

// const formSubmit = () => {
//   emit("submit", cardDetails.value);
// };
</script>

<script>
import {
  alphaValidator,
  emailValidator,
  integerValidator,
  lengthValidator,
  requiredValidator,
} from "@validators";
export default {
  data() {
    return {
      emailValidator: emailValidator,
      requiredValidator: requiredValidator,
      lengthValidator: lengthValidator,
      alphaValidator: alphaValidator,
      integerValidator: integerValidator,
      Fusce: "Fusce vulputate dolor quam",
      Duis: "Duis vehicula tempus massa",
      businessEmail: "",
      socialAccount: null,

      socialMedia: [
        {
          key: "instagram",
          name: "Instagram",
          icon: "mdi-instagram",
        },
        {
          key: "facebook",
          name: "Facebook",
          icon: "mdi-facebook",
        },
        {
          key: "tiktok",
          name: "TikTok",
          icon: "mdi-music-note",
        },
      ],
    };
  },
  
  computed: {
    isNameValid() {
      return (value) =>
        lengthValidator(value, 1, 15) ||
        "Contract title must be 15 characters or less";
    },
  },
};
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 860"
    :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <VCard class="pa-5 pa-sm-8">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('update:isDialogVisible', false)"
      />

      <VCardText>
        <VForm class="mt-6">
          <VRow>
            <VCol cols="12">
              <div class="d-flex justify-space-between align-center">
                <div>
                  <span class="text-h6 pb-2">Schedule Sequence </span>
                  <p class="text-body-2">Choose the date and time below. Time zone is based on your settings.</p>
                </div>
                <div class="float-right">
                  <VBtn size="large"> SET DATE & TIME </VBtn>
                </div>
              </div>
            </VCol>
            <VCol cols="6">
              <VTextField
              
                label="Date"
                Value="If"
                type="date"
                :rules="[requiredValidator]"
              />
            </VCol>

            <VCol cols="6">
              <VTextField
                label="Time"
                type="time"
                :rules="[requiredValidator]"
              />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
