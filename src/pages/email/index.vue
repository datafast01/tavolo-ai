<template>
  <VSnackbar v-model="show" :timeout="2000" :color="color">
    {{ snkMsg }}
  </VSnackbar>

  <div class="d-flex flex-column">
    <div class="autoDatePicker">
      <AppDateTimePicker
        v-model="scheduleDate"
        label="Schedule Date"
        clear-icon="mdi-close"
        clearable
      />
      <VRadioGroup v-model="selectedSchedule" :inline="true">
        <VRadio label="Auto Sending" value="notSchedule" color="primary" />
        <VRadio label="Scheduled" value="schedule" color="primary" />
      </VRadioGroup>
    </div>
    <VCard class="email-compose-dialog" elevation="24">
      <VCardItem class="py-3 px-5">
        <div class="d-flex align-center">
          <span class="font-weight-medium">Compose Mail</span>
          <VSpacer />
        </div>
      </VCardItem>
      <div class="px-4">
        <div class="mt-4">
          <VSelect
            v-model="segment"
            :items="segments"
            density="compact"
            item-title="name"
            item-value="_id"
            single-line
          >
            <template #prepend-inner>
              <div class="text-disabled" style="width: max-content">
                Select Segment:
              </div>
            </template>
          </VSelect>
        </div>

        <VTextField v-model="subject" density="compact" class="my-4">
          <template #prepend-inner>
            <div class="text-sm text-disabled">Subject:</div>
          </template>
        </VTextField>

        <VDivider />

        <VTextarea v-model="message" placeholder="Message" />
      </div>

      <VDivider />

      <div class="d-flex align-center px-5 py-4">
        <VBtnGroup color="primary" divided density="comfortable">
          <VBtn @click="sendEmail">Send</VBtn>
          <VBtn icon @click="() => (isMenuOpen = !isMenuOpen)">
            <VIcon
              :icon="isMenuOpen ? 'mdi-menu-up' : 'mdi-menu-down'"
              size="24"
            />
            <VMenu activator="parent">
              <VList :items="['Schedule Mail']" />
            </VMenu>
          </VBtn>
        </VBtnGroup>

        <VSpacer />
      </div>
    </VCard>
  </div>
</template>

<script setup>
import axios from "@axios";
const emit = defineEmits(["close"]);

const segment = ref("650e0f5b6df52a436ca3f12e");
const subject = ref("Celebrate Mother’s Day!");

const message = ref(
  "This Sunday, on Mother's Day, we're giving all moms a free glass of rosé or mimosa when they dine in. \nJoin us at any Urban Skillet location.Our tables are set and we can't wait to celebrate!\nWe can't wait to serve you soon.\nBest regards,\nUrban Skillet Team!"
);
const isMenuOpen = ref(false);
const scheduleDate = ref(
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10)
);
const selectedSchedule = ref("schedule");

const segments = ref([]);
let show = ref(false);
let snkMsg = ref("");
let color = ref("#9575CD");
//Methods
const getEmailSegmnts = () => {
  axios
    .get(`dashboard/segmant`)
    .then((res) => {
      console.log(res.data.data, "=============>>>");
      segments.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const sendEmail = () => {
  let payload = {
    segmantId: segment.value,
    subject: subject.value,
    text: message.value,
    schedule: selectedSchedule.value == "schedule" ? true : false,
    scheduleDate: scheduleDate.value,
  };
  axios
    .post(`dashboard/email`, payload)
    .then((res) => {
      console.log(res.data.data, "=============>>>");
      show.value = true;
      snkMsg.value = "Email sent successfully";
    })
    .catch((err) => {
      console.log(err.response);
      show.value = true;
      if (err.response.status == 400) {
        snkMsg.value = err.response.data.error;
      } else {
        snkMsg.value = "Something went wrong";
      }
      color.value = "error";
    });
};

getEmailSegmnts();
</script>

<style lang="scss" scoped>
.autoDatePicker {
  margin-bottom: 30px;
  width: 300px;
  float: right;
}

.email-compose-dialog {
  z-index: 910 !important;

  .v-field--prepended {
    padding-inline-start: 20px;
  }

  .v-card-item {
    background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
  }

  .v-textarea .v-field {
    --v-field-padding-start: 20px;
  }

  .v-field__outline {
    display: none;
  }
}
</style>
