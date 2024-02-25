<template>
  <div id="app">
    <div class="container">
      <div id="bar">
        <h1>Vue Email Editor (Demo)</h1>

        <button v-on:click="saveDesign">Save Design</button>
        <button v-on:click="exportHtml">Export HTML</button>
      </div>

      <div class="h-[calc(100dvh-65px)]">
        <EmailEditor
          :editorId="template?._id || '1'"
          :options="{
            fonts: {
              showDefaultFonts: false,
            },
          }"
          :appearance="{
            theme: mode,
          }"
          style="height: 100%"
          ref="emailEditor"
          @load="editorLoaded"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { EmailEditor } from "vue-email-editor";

export default {
  name: "app",
  components: {
    EmailEditor,
  },
  methods: {
    // called when the editor is created
    editorLoaded() {
      console.log("editorLoaded");
      // Pass the template JSON here
      // this.$refs.emailEditor.editor.loadDesign({});
    },
    // called when the editor has finished loading
    editorReady() {
      console.log("editorReady");
    },
    saveDesign() {
      this.$refs.emailEditor.editor.saveDesign((design) => {
        console.log("saveDesign", design);
      });
    },
    exportHtml() {
      this.$refs.emailEditor.editor.exportHtml((data) => {
        console.log("exportHtml", data);
      });
    },
  },
};
</script>
