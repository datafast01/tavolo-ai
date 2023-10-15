<template>
  <div class="d-flex mt-4 ml-4">
    <!-- :class="activeTemplate == template.key ? 'active-border' : ''" -->
    <div class="pa-4 cursor-pointer active-border">
      <img
        src="../../assets/images/email-templates/template01.png"
        alt=""
        style="height: 275px; width: 258px"
      />
    </div>
  </div>
</template>
<script>
import axios from "@axios";

export default {
  data() {
    return {
      templates: [],
      activeTemplate: "t01",
    };
  },
  methods: {
    getTemplates() {
      this.loading = true;
      axios
        .get(`dashboard/list-email-templates`)
        .then((res) => {
          console.log(res.data, "=============>>>");
          this.templates = res.data.data;

          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectTemplate(template) {
      this.activeTemplate = template.key;
    },
  },
  mounted() {
    this.getTemplates();
  },
};
</script>

<style scoped>
.active-border {
  border: 6px solid rgb(var(--v-theme-primary));
  padding-top: 6px;
  padding-bottom: 6px;
}
</style>
