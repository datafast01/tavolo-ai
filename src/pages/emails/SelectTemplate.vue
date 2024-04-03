<template>
  <div>
    <v-sheet>
      <div>
        <v-card-item class="px-0">
          <v-card-title>Select A Template</v-card-title>

          <v-card-subtitle
            >What kind of email template would you like to
            send?</v-card-subtitle
          >
        </v-card-item>

        <v-card-text class="px-0">
          <!-- <VRow>
                        <VCol v-for="category in categories" :key="category" cols="12" md="3" class="category">
                            <v-hover v-slot="{ isHovering, props }">
                                <v-card class="ma-4 pb-2 cursor-pointer" height="262" width="242"
                                    @click="selectCategory(category)" v-bind="props" elevation="16" :class="isCategoryCard && categoryId == category.id
                            ? ' selected-category '
                            : ''
                            ">
                                    <div class="mt-6">
                                        <div class="d-flex fill-height justify-center">
                                            <div style="height: 90px; width: 80px; border-radius: 10px"
                                                :style="category.color">
                                                <div style="width: 100%; height: 100%"
                                                    class="d-flex align-center justify-center">
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
                                    <v-overlay :model-value="isHovering" contained class="align-center justify-center">
                                    </v-overlay>
                                </v-card>
                            </v-hover>
                        </VCol>
                    </VRow> -->

          <VRow>
            <VCol
              v-for="template in templates"
              :key="template"
              cols="12"
              md="3"
            >
              <!-- <v-hover v-slot="{ isHovering, props }">   v-bind="props"-->
              <div
                style="position: relative; overflow: hidden"
                @click="selectTemplate(template)"
                :class="
                  isTemplateCard && templateId == template.templateId
                    ? ' selected-category '
                    : ''
                "
              >
                <div class="menu-btn">
                  <img
                  
                    src="../../assets/images/logos/favicon.png"
                    height="30"
                  />
                </div>

                <!-- <v-icon> mdi-dots-vertical </v-icon> -->

                <div style="position: relative ; border: 2px solid transparent; border-radius: 12px; overflow: hidden;" >
                  <img
                  style="transform: scale(1.1);"
                    src="../../assets/images/cards/image_31.png"
                    cover
                    class="text-white w-100 h-100"
                  />

                  <div class="mt-8 ml-4 px-2 template-card">
                    <p class="text-h5">{{ template.subject }}</p>
                    <p class="">
                      {{ template.body }}
                    </p>
                  </div>
                </div>
                <!-- <v-overlay
                    :model-value="isHovering"
                    contained
                    class="align-center justify-center"
                  >
                  </v-overlay> -->
              </div>
              <!-- </v-hover> -->
            </VCol>
          </VRow>
        </v-card-text>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import axios from "@axios";

export default {
  data() {
    return {
      templateData: {},
      tab: null,
      isCategoryCard: false,
      categoryId: 0,
      templateModel: 0,
      isTemplateCard: false,
      customeList: [],
      currentCategory: null,
      currentTemplate: null,
      templateId: 0,
      categories: [
        {
          id: 0,
          name: "Seasonal",
          key: "seasonal",
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
          key: "promotional",
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
          key: "interactive",
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
          key: "new_menu_launch",

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
        { key: "1_months", label: "1 Month" },

        { key: "3_months", label: "3 Months" },
        { key: "6_months", label: "6 Months" },
        { key: "9_months", label: "9 Months" },
      ],
      recipients: "all_customers",
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
  // dropdown menu actions //
  setup() {
    const items = ref([
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ]);

    return {
      items,
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
      this.currentCategory = category;
      console.log(this.categoryId, category.id);
      this.listTemplates(category.key);
    },
    selectTemplate(template) {
      this.isTemplateCard = true;
      this.templateId = template.templateId;
      this.currentTemplate = template;
      console.log(this.templateId, template.templateId);
    },
    checkType() {
      console.log("alkdj");
    },
    listTemplates(template) {
      axios
        .get(`dashboard/list-email-templates?category=${template}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response.status);
        });
    },
    editTemplate(template) {
      this.templateData = template;
      this.$refs.editTemplate.dialog = true;
    },
  },
  mounted() {
    this.listTemplates("seasonal");
  },
};
</script>

<style scoped>
.selected-category {
  border-radius: 11px;
  border: 2px solid #9155fd !important;
}

.template-card {
  position: absolute;
  bottom: 0%;
  z-index: 0;
}

.edit-action {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  background: #312d4b;
  padding: 7px 12px;
  color: white;
}

.v-overlay--contained .v-overlay__scrim {
  display: none !important;
  background: none !important;
  opacity: 0 !important;
}

.v-theme--dark {
  --v-overlay-scrim-background: none !important;
}

.v-overlay__scrim,
.v-navigation-drawer__scrim {
  background: rgba(
    var(--v-overlay-scrim-background),
    var(--v-overlay-scrim-opacity)
  ) !important;
  opacity: none !important;
}

.edit-action {
  display: none !important;
}

.menu-btn {
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
}

.cursor-pointer:hover .edit-action {
  display: block !important;
}
</style>
