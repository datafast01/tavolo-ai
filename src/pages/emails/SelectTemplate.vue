<template>
  <div>
    <v-sheet>
      <div>
        <v-card-item class="px-0">
          <v-card-title>Select A Template</v-card-title>

          <v-card-subtitle>What kind of email template would you like to
            send?</v-card-subtitle>
        </v-card-item>

        <v-card-text class="px-0">
          <VRow>
            <VCol v-for="template in listTemplates" :key="template" cols="12" md="3">

              <!-- <v-hover v-slot="{ isHovering, props }">   v-bind="props"-->
              <div style="position: relative; overflow: hidden; height: 350px;" @click="selectTemplate(template)"
                :class="isTemplateCard && templateId == template.key
                  ? ' selected-category '
                  : 'category'
                  ">
                <!-- <v-icon> mdi-dots-vertical </v-icon> -->

                <div style="">

                  <v-card>
                    <v-img class="bg-grey-lighten-2" max-height="425" :src="'https://test.tavolo.ai' + template.image"
                      cover>
                      <template v-slot:error>
                        <v-img lass="bg-grey-lighten-2" max-height="455" cover
                          src="https://test.tavolo.ai/assets/templates/template11.jpg"></v-img>
                      </template>
                    </v-img>
                    <v-card-title class="text-h6">

                    </v-card-title>
                  </v-card>

                  <div class=" ml-4 px-2 ">
                    <p class="text-h5">{{ template.value }}</p>
                    <p class="">
                      {{ truncateText(template.description) }}
                      <v-tooltip activator="parent" location="start" width="200">{{ template.description
                        }}</v-tooltip>
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
import store from "@/store/index.js";


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
      templateId: 't01',

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

    listTemplates() {
      return store.getters.getTemplates
    }
  },
  methods: {
    // selectCategory(category) {
    //   this.isCategoryCard = true;
    //   this.categoryId = category.id;
    //   this.currentCategory = category;
    //   console.log(this.categoryId, category.id);
    //   this.listTemplates(category.key);
    // },
    truncateText(text) {
      if (text.length > 180) {
        return text.slice(0, 180) + '...';
      } else {
        return text;
      }
    },
    selectTemplate(template) {
      this.isTemplateCard = true;
      this.templateId = template.key;
      this.currentTemplate = template;
      console.log(this.templateId, template);
    },
    checkType() {
      console.log("alkdj");
    },

    editTemplate(template) {
      this.templateData = template;
      this.$refs.editTemplate.dialog = true;
    },
  },
  mounted() {
    store.dispatch('listTemplates')
  }
};
</script>

<style scoped>
.selected-category {
  border-radius: 11px;
  border: 2px solid #9155fd !important;
}

.category {
  border-radius: 11px;
  border: 2px solid #626066 !important;
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
  background: rgba(var(--v-overlay-scrim-background),
      var(--v-overlay-scrim-opacity)) !important;
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
