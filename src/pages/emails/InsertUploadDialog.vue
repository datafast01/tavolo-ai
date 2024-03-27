<script setup>
import { requiredValidator } from "@validators";
import UplodFileDialog from "./UplodFileDialog.vue";

// const Fusce = "Fusce vulputate dolor quam";
// const Duis = "Duis vehicula tempus massa";
const Customer = "Choose to insert";
// let businessEmail = "";
// let socialAccount = null;
const isCardEditDialogVisible = ref(false);

const socialMedia = [
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
];

const openEditCardDialog = () => {
  isCardEditDialogVisible.value = true;
};

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

<!-- <script>
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
      Customer: "Choose to insert",
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
</script> -->

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
            <VCol cols="12" class="pb-0">
              <div class="d-flex justify-space-between align-center">
                <div>
                  <span class="text-h6 pb-2">Add New </span>
                  <p class="text-body-2">
                    Insert the options below and fill them which you would like
                    to add.
                  </p>
                </div>
                <div class="float-right">
                  <VBtn @click="openEditCardDialog()" size="large">
                    UPDATE
                  </VBtn>
                </div>
              </div>
            </VCol>
            <VCol cols="12" class="d-flex align-center justify-center">
              <v-select
                v-model="Customer"
                :items="socialMedia"
                item-value="key"
                item-title="name"
                persistent-hint
                :rules="[requiredValidator]"
              ></v-select>
              <VBtn
                class="py-4 ml-3"
                color="red"
                size="x-large"
                style="border: 1px solid #9155fd"
              >
                Add
              </VBtn>
            </VCol>

            <VCol cols="12">
              <VTextField
                label="Email"
                Value="Email"
                type="email"
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                label="If"
                Value="If"
                type="text"
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                label="Then"
                Value="Then"
                type="text"
                :rules="[requiredValidator]"
              />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
  <!-- <UplodFileDialog v-model:isDialogVisible="isCardEditDialogVisible" /> -->
</template>
