<template>
  <div>

    <div class="my-8" v-for="headers in detailsHeaders" :key="headers">
      <span class="ml-2"> {{ headers.label }}</span>
      <v-card class="mt-4" elevation="16">

        <v-card-text>
          {{ details[headers.key] }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      detailsHeaders: [
        { key: 'about', label: 'About' },
        { key: 'profession', label: 'Profession' },
        { key: 'education', label: 'Education' },
        { key: 'experience', label: 'Experience' },
        { key: 'interests', label: 'Interests' },
        { key: 'achievements', label: 'Achievements' },



      ]
    }
  },
};
</script>

<style></style>
