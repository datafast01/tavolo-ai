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

import NewSequenceDialog from "./NewSequenceDialog .vue";
import ScheduleSequenceDialog from "./ScheduleSequenceDialog.vue";
import NameSequenceDialog from "./NameSequenceDialog.vue";
import rokit from "@/assets/images/cards/rokit.png";

export default {
  components: { NewSequenceDialog, ScheduleSequenceDialog, NameSequenceDialog },
  data() {
    return {
      emailValidator: emailValidator,
      requiredValidator: requiredValidator,
      lengthValidator: lengthValidator,
      alphaValidator: alphaValidator,
      integerValidator: integerValidator,
      Name: "Lorem Ipsum",
      Schedule: "Schedule Date & Time",
      Welcome: "Send Welcome Email",
      Customer: "Customer is new",
      isCardEditDialogVisible: false,
      isCardEditDialogVisibles: false,
      isCardEditDialogVisiblese: false,
      marker: true,
      rokit: rokit,

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
    openScheduleSequenceDialog() {
      this.isCardEditDialogVisibles = true;
    },
    openNameSequenceDialog() {
      this.isCardEditDialogVisiblese = true;
    },
    toggleMarker() {
      this.marker = !this.marker;
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
              <div class="float-right">
                <v-btn
                  size="large"
                  class="d-flex align-center"
                  @click="openNameSequenceDialog()"
                >
                  <span>LAUNCH </span>
                  <img
                    :src="rokit"
                    alt="John"
                    class="ml-2"
                    width="20"
                    height="20"
                  />
                </v-btn>
              </div>
            </VCol>
            <VCol cols="12">
              <span class="text-subtitle-1">New Sequence </span>
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="Name"
                label="Title"
                Value="Lorem Ipsum"
                :rules="[requiredValidator, alphaValidator, isNameValid]"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="Schedule"
                :append-inner-icon="
                  marker ? 'mdi-calendar-blank' : 'mdi-calendar-blank'
                "
                @click:append-inner="openScheduleSequenceDialog()"
                :prepend-icon="icon"
                label="Schedule"
                value="Schedule Date & Time"
                :rules="[requiredValidator, integerValidator]"
              />
            </VCol>

            <VCol cols="12">
              <v-select
                v-model="Customer"
                :items="socialMedia"
                item-value="key"
                item-title="name"
                persistent-hint
                :rules="[requiredValidator]"
              ></v-select>
            </VCol>
            <VCol cols="12">
              <v-select
                v-model="Welcome"
                :items="socialMedia"
                item-value="key"
                item-title="name"
                persistent-hint
                :rules="[requiredValidator]"
              ></v-select>
            </VCol>
            <VCol cols="12">
              <div class="float-right">
                <VBtn size="large" @click="openEditCardDialog()">
                  ADD NEW
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
      <NameSequenceDialog v-model:isDialogVisible="isCardEditDialogVisiblese" />
      <NewSequenceDialog v-model:isDialogVisible="isCardEditDialogVisible" />
      <ScheduleSequenceDialog
        v-model:isDialogVisible="isCardEditDialogVisibles"
      />
    </VCard>
  </VDialog>
</template>
