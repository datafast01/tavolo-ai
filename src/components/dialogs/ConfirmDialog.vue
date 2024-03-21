<!-- ConfirmationDialog.vue -->
<template>
  <v-dialog v-model="dialog" max-width="300">
    <v-card>
      <v-card-title class="headline">
        Confirmation
      </v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="confirmAction">OK</v-btn>
        <v-btn color="error" @click="cancelAction">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      message: '',
      action: null
    };
  },
  methods: {
    openDialog(message, action) {
      this.message = message;
      this.action = action;
      this.dialog = true;
    },
    confirmAction() {
      if (typeof this.action === 'function') {
        this.action();
      }
      this.dialog = false;
    },
    cancelAction() {
      this.dialog = false;
    }
  }
};
</script>
