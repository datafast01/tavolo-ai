<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>

          <v-toolbar-title>Settings</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn text="Save" variant="text" @click="dialog = false"></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <Chat />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Chat from "./chat.vue";

export default {
  components: { Chat },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
};
</script>

<style></style>
