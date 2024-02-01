<template>
  <div>
    <div class="d-flex align-center">
      <!-- 👉 Search -->
      <VTextField v-model="subject" class="email-search flex-grow-1">
        <template v-slot:prepend-inner> Subject: </template>
      </VTextField>
    </div>

    <!-- 👉 Action bar -->

    <div :class="currentTheme == 'dark' ? 'config py-2' : 'py-2'">
      <!-- TODO: Make checkbox primary on indeterminate state -->

      <quill-editor style="height: 400px" v-model:value="message" />
    </div>
  </div>
</template>

<script>
import store from "@/store/index.js";
import { quillEditor } from "vue3-quill";

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      subject: "",
      options: {
        debug: "info",
        modules: {
          toolbar: ["bold", "italic", "underline"],
        },
        placeholder: "Compose an epic...",
        readOnly: true,
        theme: "snow",
      },
    };
  },
  computed: {
    currentTheme() {
      return store.getters.getTheme;
    },
  },
};
</script>

<style scoped>
::v-deep .config .ql-snow .ql-formats .ql-bold svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-italic svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-underline svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-strike svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-blockquote svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-code-block svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-header svg {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-list svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-script svg {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-indent svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-direction svg {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-picker .ql-picker-label::before {
  color: white !important;
}

::v-deep .config .ql-snow .ql-formats .ql-picker .ql-picker-label::before {
  color: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-picker .ql-picker-label::before {
  color: white !important;
}
::v-deep
  .config
  .ql-snow
  .ql-formats
  .ql-picker
  .ql-picker-label
  svg
  .ql-stroke {
  stroke: white !important;
}

::v-deep .config .ql-snow .ql-formats .ql-clean svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-link svg .ql-stroke {
  stroke: white !important;
}
::v-deep .config .ql-snow .ql-formats .ql-image svg .ql-stroke {
  stroke: white !important;
}

::v-deep .ql-snow .ql-editor::before {
  color: white;
}
</style>
