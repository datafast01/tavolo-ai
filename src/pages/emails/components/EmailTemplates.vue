<template>
  <v-sheet>
    <v-card>
      <v-card-item>
        <v-card-title>Select A Template</v-card-title>

        <v-card-subtitle
          >What kind of email template would you like to send?</v-card-subtitle
        >
      </v-card-item>

      <v-card-text>
        <VRow>
          <VCol
            v-for="category in categories"
            :key="category"
            cols="12"
            md="3"
            class="category"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                class="ma-4 pb-2 cursor-pointer"
                height="262"
                width="242"
                @click="selectCategory(category)"
                v-bind="props"
                elevation="16"
                :class="
                  isCategoryCard && categoryId == category.id
                    ? ' selected-category '
                    : ''
                "
              >
                <div class="mt-6">
                  <div class="d-flex fill-height justify-center">
                    <div
                      style="height: 90px; width: 80px; border-radius: 10px"
                      :style="category.color"
                    >
                      <div
                        style="width: 100%; height: 100%"
                        class="d-flex align-center justify-center"
                      >
                        <v-icon size="60">{{ category.icon }}</v-icon>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 ml-4 px-2">
                  <p class="f-20 mb-3 font-weight-bold">
                    {{ category.name }}
                  </p>
                  <p class="">
                    {{ category.description }}
                  </p>
                </div>
                <v-overlay
                  :model-value="isHovering"
                  contained
                  class="align-center justify-center"
                >
                </v-overlay>
              </v-card>
            </v-hover>
          </VCol>
        </VRow>

        <VRow>
          <VCol v-for="template in templates" :key="template" cols="12" md="3">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                color="grey-lighten-1"
                class="ma-4 cursor-pointer"
                height="242"
                width="242"
                @click="selectTemplate(template)"
                v-bind="props"
                :class="
                  isTemplateCard && templateId == template.templateId
                    ? ' selected-category '
                    : ''
                "
              >
                <img
                  src="../../../assets/images/cards/image_31.png"
                  cover
                  class="text-white"
                />

                <div class="mt-8 ml-4 px-2 template-card">
                  <p class="text-h5">{{ template.subject }}</p>
                  <p class="">
                    {{ template.body }}
                  </p>
                </div>
                <v-overlay
                  :model-value="isHovering"
                  contained
                  class="align-center justify-center"
                >
                </v-overlay>
              </v-card>
            </v-hover>
          </VCol>
        </VRow>
      </v-card-text>
    </v-card>
  </v-sheet>

  <v-sheet class="mt-4">
    <v-card>
      <v-card-item>
        <v-card-title>Advanced Segmentation</v-card-title>

        <v-tabs v-model="tab">
          <VRow>
            <VCol
              cols="12"
              md="6"
              style="display: flex; justify-content: center"
            >
              <v-tab value="one" class="active"
                >Filter Recipient by Criteria</v-tab
              >
            </VCol>
            <VCol
              cols="12"
              md="6"
              style="display: flex; justify-content: center"
            >
              <v-tab value="two">Use My Own Recipient List</v-tab>
            </VCol>
          </VRow>
        </v-tabs>
      </v-card-item>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one" class="ml-3">
            <v-radio-group v-model="recipients">
              <v-radio label="All Customers" value="all_customers"></v-radio>
              <v-radio
                label="Customers who rated your business 4 stars or above"
                value="top_rated"
              ></v-radio>
              <v-radio
                label="According to Date"
                value="according_to_date"
                @change="checkType"
              ></v-radio>
              <div class="ml-8" v-if="recipients.includes('according_to_date')">
                <p>Send to Customers who came:</p>
                <div class="d-flex align-center mb-4">
                  <div class="" style="width: 130px">In the past</div>
                  <div class="ml-4">
                    <v-select
                      style="width: 150px"
                      density="compact"
                      variant="outlined"
                      :items="pastDates"
                      item-title="label"
                      item-value="key"
                      v-model="pastDate"
                    ></v-select>
                  </div>
                </div>
                <div class="d-flex align-center mb-4" style="width: 300px">
                  <label for="" class="mr-4">Choose Exact Date</label>
                  <VTextField
                    type="date"
                    density="compact"
                    variant="outlined"
                  />
                </div>
              </div>
              <v-radio class="mb-4" value="age_group">
                <template v-slot:label>
                  <div style="width: 147px">Age Group</div>
                  <div v-if="recipients.includes('age_group')">
                    <v-select
                      style="width: 150px"
                      variant="outlined"
                      density="compact"
                      :items="ageGroups"
                      v-model="ageGroup"
                      item-title="label"
                      item-value="key"
                    ></v-select>
                  </div>
                </template>
              </v-radio>

              <v-radio class="mb-4" value="gender">
                <template v-slot:label>
                  <div style="width: 147px">Gender</div>
                  <div v-if="recipients.includes('gender')">
                    <v-select
                      style="width: 150px"
                      variant="outlined"
                      density="compact"
                      :items="['Male', 'Female', 'Others']"
                      v-model="gender"
                    ></v-select>
                  </div>
                </template>
              </v-radio>
              <v-radio value="location">
                <template v-slot:label>
                  <div style="width: 147px">Location</div>
                  <div v-if="recipients.includes('location')">
                    <v-select
                      style="width: 150px"
                      variant="outlined"
                      density="compact"
                      v-model="location"
                      :items="[
                        'California',
                        'Colorado',
                        'Florida',
                        'Georgia',
                        'Texas',
                        'Wyoming',
                      ]"
                    ></v-select>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-window-item>

          <v-window-item value="two" class="ml-3">
            <div class="d-flex align-center mb-4">
              <v-card
                style="width: 180px; height: 50px"
                class="d-flex justify-center align-center cursor-pointer"
                @click="selectFile"
                v-ripple
              >
                <div class="f-18">UPLOAD LIST</div>
              </v-card>
              <div class="ml-4">Note: Lorem Ipsum Dilor</div>
            </div>

            <v-radio value="top_rated" v-model="customeList">
              <template v-slot:label>
                <div>RecipientList24.ext</div>
                <div class="ml-5 f-12">(Updated at 9:00 AM, 10/27/2024)</div>
              </template>
            </v-radio>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {
      tab: null,
      isCategoryCard: false,
      categoryId: 0,
      templateModel: 0,
      isTemplateCard: false,
      customeList: [],
      templateId: 0,
      categories: [
        {
          id: 0,
          name: "Seasonal",
          description: "Stay engaged with your customers as the seasons change",
          icon: "mdi-wallet-giftcard",
          color: "background-color:#9155FD",
          templates: [
            {
              templateId: 0,
              image: "images",
              subject: "Seasonal 1",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
            {
              templateId: 1,
              image: "images",
              subject: "Seasonal 2",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
            {
              templateId: 2,
              image: "images",
              subject: "Seasonal 3",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
            {
              templateId: 3,
              image: "images",
              subject: "Seasonal 4",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
          ],
        },
        {
          id: 1,
          name: "Promotional",
          description:
            "Promote your business by sending special discounts and promotions",
          icon: "mdi-bullhorn",
          color: "background-color:#56CA00;",
          templates: [
            {
              templateId: 0,
              image: "images",
              subject: "Promotional 1",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
          ],
        },
        {
          id: 2,
          name: "Interactive",
          description:
            "Engage with customers through surveys to enhance brand interaction",
          icon: "mdi-chart-bar",
          color: "background-color:#FCD831",
          templates: [
            {
              templateId: 0,
              image: "images",
              subject: "Email Subject",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
            {
              templateId: 1,
              image: "images",
              subject: "Email Subject",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
            {
              templateId: 2,
              image: "images",
              subject: "Email Subject",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
            {
              templateId: 3,
              image: "images",
              subject: "Email Subject",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
          ],
        },
        {
          id: 3,
          name: "New Menu Launch",
          description:
            "Let your customers know about all the new items launched",
          icon: "mdi-food",
          color: "background-color: #9155FD",
          templates: [
            {
              templateId: 0,
              image: "images",
              subject: "New Menu Launch 1",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
            {
              templateId: 1,
              image: "images",
              subject: "New Menu Launch 2",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
            {
              templateId: 2,
              image: "images",
              subject: "New Menu Launch 3",
              body: "Email Body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies nec.",
            },
          ],
        },
      ],
      pastDate: null,
      pastDates: [
        { key: "1_months", label: "1 Monsth" },

        { key: "3_months", label: "3 Monsths" },
        { key: "6_months", label: "6 Monsths" },
        { key: "9_months", label: "9 Monsths" },
      ],
      recipients: "",
      ageGroups: [
        { key: "18-24", label: "18-24" },

        { key: "25-30", label: "25-30" },
        { key: "<30", label: "Above 30" },
      ],
      ageGroup: null,
      gender: null,
      location: null,
    };
  },
  computed: {
    templates() {
      return this.categories[this.categoryId].templates;
    },
  },
  methods: {
    selectCategory(category) {
      this.isCategoryCard = true;
      this.categoryId = category.id;
      console.log(this.categoryId, category.id);
    },
    selectTemplate(template) {
      this.isTemplateCard = true;
      this.templateId = template.templateId;
      console.log(this.templateId, template.templateId);
    },
    checkType() {
      console.log("alkdj");
    },
  },
};
</script>

<style scoped>
.selected-category {
  border-radius: 11px;
  border: 2px solid #9155fd !important;
}
.template-card {
  position: relative;
  bottom: 85%;
}
</style>
