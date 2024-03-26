<script setup>
import { requiredValidator } from "@validators";
import UplodFileDialog from "./UplodFileDialog.vue";
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
      isCardEditDialogVisible: false,
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
  methods: {
    openEditCardDialog() {
      this.isCardEditDialogVisible = true;
    },
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
                  <span class="text-h6 pb-2">Add New </span>
                  <p class="text-body-2">
                    Mention If and Then Statements below.
                  </p>
                </div>
                <div class="float-right">
                  <VBtn @click="openEditCardDialog()" size="large">
                    Add New 
                  </VBtn>
                </div>
              </div>
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="Fusce"
                label="If"
                Value="If"
                :rules="[requiredValidator, alphaValidator, isNameValid]"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="Duis"
                label="Then"
                :rules="[requiredValidator, integerValidator]"
              />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
  <UplodFileDialog v-model:isDialogVisible="isCardEditDialogVisible" />
</template>
