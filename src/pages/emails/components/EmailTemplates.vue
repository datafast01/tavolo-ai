<template>
  <v-sheet>
    <v-slide-group
      v-model="model"
      class="pa-4"
      selected-class="bg-primary"
      show-arrows
    >
      <v-slide-group-item
        v-for="category in categories"
        :key="category"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          color="grey-lighten-1"
          :class="['ma-4', selectedClass]"
          height="242"
          width="242"
          @click="toggle"
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
                  <v-icon size="60">mdi-flag</v-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 pb-2 ml-4 px-2">
            <p class="text-h5">
              {{ category.name }}
            </p>
            <p class="">
              {{ category.description }}
            </p>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <v-slide-group
      v-model="templateModel"
      class="pa-4"
      selected-class="bg-primary"
      show-arrows
    >
      <v-slide-group-item
        v-for="template in templates"
        :key="template"
        v-slot="{ isTemplateSelected, toggle, selectedClass }"
      >
        <v-card
          color="grey-lighten-1"
          :class="['ma-4', selectedClass]"
          height="312"
          width="312"
          @click="toggle"
        >
          <div class="mt-8 ml-4 px-2">
            <p class="text-h5">Seasonal</p>
            <p class="">
              Stay engaged with your customers as the seasons change
            </p>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {
      model: 0,
      templateModel: 0,

      categories: [
        {
          id: 0,
          name: "Seasonal",
          description: "Stay engaged with your customers as the seasons change",
          icon: "mdi-gift",
          color: "background-color:#9155FD",
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
          id: 1,
          name: "Promotional",
          description:
            "Promote your business by sending special discounts and promotions",
          icon: "mdi-gift",
          color: "background-color:#56CA00;",
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
          id: 2,
          name: "Interactive",
          description:
            "Engage with customers through surveys to enhance brand interaction",
          icon: "mdi-gift",
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
          icon: "mdi-gift",
          color: "background-color: #9155FD",
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
      ],
    };
  },
  computed: {
    templates() {
      return this.categories[this.model].templates;
    },
  },
};
</script>
