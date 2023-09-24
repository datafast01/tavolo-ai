<template>
  <VLayout class="chat-app-layout bg-surface">
    <!-- 👉 user profile sidebar -->
    <!-- <VNavigationDrawer
      v-model="isUserProfileSidebarOpen"
      temporary
      touchless
      absolute
      class="user-profile-sidebar"
      location="start"
      width="370"
    >
      <ChatUserProfileSidebarContent
        @close="isUserProfileSidebarOpen = false"
      />
    </VNavigationDrawer> -->

    <!-- 👉 Active Chat sidebar -->
    <VNavigationDrawer
      v-model="isActiveChatUserProfileSidebarOpen"
      width="374"
      absolute
      temporary
      location="end"
      touchless
      class="active-chat-user-profile-sidebar"
    >
      <ChatActiveChatUserProfileSidebarContent
        @close="isActiveChatUserProfileSidebarOpen = false"
      />
    </VNavigationDrawer>

    <!-- 👉 Left sidebar   -->
    <VNavigationDrawer
      v-model="isLeftSidebarOpen"
      absolute
      touchless
      location="start"
      width="370"
      :temporary="$vuetify.display.smAndDown"
      class="chat-list-sidebar"
      :permanent="$vuetify.display.mdAndUp"
    >
      <!-- <ChatLeftSidebarContent
        v-model:isDrawerOpen="isLeftSidebarOpen"
        v-model:search="q"
        @open-chat-of-contact="openChatOfContact"
        @show-user-profile="isUserProfileSidebarOpen = true"
        @close="isLeftSidebarOpen = false"
      /> -->
      <div class="chat-list-header">
        <VBtn color="primary" @click="refInputEl?.click()">
          <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
          <span class="d-none d-sm-block">Upload Customers</span>
        </VBtn>
        <input
          ref="refInputEl"
          type="file"
          name="file"
          accept=".csv"
          hidden
          @input="uploadFile"
        />
      </div>

      <VDivider />
      <PerfectScrollbar
        tag="ul"
        class="chat-contacts-list px-3"
        :options="{ wheelPropagation: false }"
      >
        <li>
          <span
            class="chat-contact-header d-block text-primary text-xl font-weight-medium"
            >Example Prompts</span
          >
        </li>
        <li
          class="chat-contact cursor-pointer d-flex align-center"
          :class="isActive == 1 ? 'chat-contact-active' : ''"
          @click="
            active(1, 'Who are my customers that generate the highest revenue?')
          "
        >
          <div class="flex-grow-1 ms-4 overflow-hidden">
            <span>Who are my customers that generate the highest revenue?</span>
          </div>
        </li>
        <li
          class="chat-contact cursor-pointer d-flex align-center"
          :class="isActive == 2 ? 'chat-contact-active' : ''"
          @click="active(2, 'What are my highest revenue menu items?')"
        >
          <div class="flex-grow-1 ms-4 overflow-hidden">
            <span>What are my highest revenue menu items?</span>
          </div>
        </li>
        <li
          class="chat-contact cursor-pointer d-flex align-center"
          :class="isActive == 3 ? 'chat-contact-active' : ''"
          @click="active(3, 'Create an email about my Skillet Burger')"
        >
          <div class="flex-grow-1 ms-4 overflow-hidden">
            <span>Create an email about my Skillet Burger</span>
          </div>
        </li>
        <li
          class="chat-contact cursor-pointer d-flex align-center"
          :class="isActive == 4 ? 'chat-contact-active' : ''"
          @click="
            active(
              4,
              'Create an email that can help me get more sales on my Skillet Burger'
            )
          "
        >
          <div class="flex-grow-1 ms-4 overflow-hidden">
            <span>
              Create an email that can help me get more sales on my Skillet
              Burger</span
            >
          </div>
        </li>
      </PerfectScrollbar>
    </VNavigationDrawer>

    <!-- 👉 Chat content -->
    <VMain class="chat-content-container">
      <!-- 👉 Right content: Active Chat -->
      <div class="d-flex flex-column h-100">
        <!-- 👉 Active chat header -->
        <div class="active-chat-header d-flex text-medium-emphasis">
          Selected File: {{ fileName }}
          <VIcon
            v-if="fileName"
            @click="removeFile"
            size="20"
            color="red"
            class="ml-2"
            >mdi-close-circle-outline</VIcon
          >
        </div>

        <VDivider />

        <!-- Chat log -->
        <PerfectScrollbar
          ref="chatLogPS"
          tag="ul"
          :options="{ wheelPropagation: false }"
          class="flex-grow-1"
        >
          <div class="chat-log pa-5">
            <div class="chat-group d-flex justify-space-between">
              <div
                class="chat-body d-inline-flex flex-column align-start"
                style="max-width: 358px"
                v-if="isResponse"
              >
                <span
                  class="chat-content text-sm py-3 px-4 elevation-1 bg-surface chat-left mt-5"
                >
                  <div style="white-space: break-spaces">
                    {{ AiResponse }}
                  </div>
                </span>
              </div>
              <div
                class="chat-body d-inline-flex flex-column align-end"
                v-if="isPrompt"
              >
                <p
                  class="chat-content text-sm py-3 px-4 elevation-1 bg-primary text-white chat-right mb-1"
                >
                  {{ prompt }}
                </p>
              </div>
            </div>
          </div>
        </PerfectScrollbar>

        <!-- Message form -->
        <VForm
          class="chat-log-message-form mb-5 mx-5"
          @submit.prevent="sendMessage"
        >
          <VTextField
            v-model="msg"
            variant="solo"
            class="chat-message-input"
            placeholder="Type your message..."
            autofocus
          >
            <template #append-inner>
              <VBtn @click="sendMessage" :loading="loading">
                Send

                <template v-slot:loader>
                  <v-progress-linear indeterminate></v-progress-linear>
                </template>
              </VBtn>
            </template>
          </VTextField>
        </VForm>
      </div>

      <!-- 👉 Start conversation -->
    </VMain>
  </VLayout>
</template>

<script setup>
import ChatActiveChatUserProfileSidebarContent from "@/views/apps/chat/ChatActiveChatUserProfileSidebarContent.vue";
import { useChatStore } from "@/views/apps/chat/useChatStore";
import { useResponsiveLeftSidebar } from "@core/composable/useResponsiveSidebar";
import axios from "axios";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { useDisplay } from "vuetify";
const vuetifyDisplays = useDisplay();
const store = useChatStore();
const { isLeftSidebarOpen } = useResponsiveLeftSidebar(
  vuetifyDisplays.smAndDown
);

//ask tavolo
let prompt = ref("");
let AiResponse = ref("");
const loading = ref(false);
const isPrompt = ref(false);
const isResponse = ref(false);
let isActive = ref(1);
// Perfect scrollbar
const chatLogPS = ref();

const scrollToBottomInChatLog = () => {
  const scrollEl = chatLogPS.value.$el || chatLogPS.value;

  scrollEl.scrollTop = scrollEl.scrollHeight;
};

// Search query

// Open Sidebar in smAndDown when "start conversation" is clicked

// Chat message
const msg = ref("");

let fileName = ref("");
let selectedFile = ref("");
const sendMessage = async () => {
  isPrompt.value = true;
  loading.value = true;
  prompt.value = msg.value;
  const formData = new FormData();
  formData.append("csvFile", selectedFile.value);
  formData.append("text", prompt);
  try {
    await axios
      .post(
        "http://ec2-3-85-224-233.compute-1.amazonaws.com:3001/upload",
        formData
      )
      .then((res) => {
        console.log(res);
        AiResponse.value = res.data.reply;
        loading.value = false;
        isResponse.value = true;
      });
  } catch (error) {
    console.error("Error uploading file:", error);
    loading.value = false;
  }

  // Reset message input
  msg.value = "";

  // Scroll to bottom
  nextTick(() => {
    scrollToBottomInChatLog();
  });
};

const uploadFile = async (file) => {
  const { files } = file.target;
  const myCSV = files[0];
  console.log(myCSV.name);
  fileName.value = myCSV.name;
  selectedFile.value = myCSV;
};

const removeFile = () => {
  fileName.value = null;
};
const active = (type, text) => {
  console.log(text);
  isActive.value = type;
  msg.value = text;
};
// Active chat user profile sidebar
const isActiveChatUserProfileSidebarOpen = ref(false);

// file input
const refInputEl = ref();

const moreList = [
  {
    title: "View Contact",
    value: "View Contact",
  },
  {
    title: "Mute Notifications",
    value: "Mute Notifications",
  },
  {
    title: "Block Contact",
    value: "Block Contact",
  },
  {
    title: "Clear Chat",
    value: "Clear Chat",
  },
  {
    title: "Report",
    value: "Report",
  },
];
</script>

<route lang="yaml">
meta:
  layoutWrapperClasses: layout-content-height-fixed
</route>

<style lang="scss">
@use "@styles/variables/_vuetify.scss";
@use "@core/scss/base/_mixins.scss";
@use "@layouts/styles/mixins" as layoutsMixins;

// Variables
$chat-app-header-height: 68px;

// Placeholders
%chat-header {
  display: flex;
  align-items: center;
  min-block-size: $chat-app-header-height;
  padding-inline: 1rem;
}

.chat-app-layout {
  border-radius: vuetify.$card-border-radius;

  @include mixins.elevation(vuetify.$card-elevation);

  $sel-chat-app-layout: &;

  @at-root {
    .skin--bordered {
      @include mixins.bordered-skin($sel-chat-app-layout);
    }
  }

  .active-chat-user-profile-sidebar,
  .user-profile-sidebar {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
    }
  }

  .chat-list-header,
  .active-chat-header {
    @extend %chat-header;
  }

  .chat-list-search {
    .v-field__outline__start {
      flex-basis: 20px !important;
      border-radius: 28px 0 0 28px !important;
    }

    .v-field__outline__end {
      border-radius: 0 28px 28px 0 !important;
    }

    @include layoutsMixins.rtl {
      .v-field__outline__start {
        flex-basis: 20px !important;
        border-radius: 0 28px 28px 0 !important;
      }

      .v-field__outline__end {
        border-radius: 28px 0 0 28px !important;
      }
    }
  }

  .chat-list-sidebar {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
    }
  }
}

.chat-content-container {
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));

  // Adjust the padding so text field height stays 48px
  .chat-message-input {
    .v-field__append-inner {
      align-items: center;
      padding-block-start: 0;
    }

    .v-field--appended {
      padding-inline-end: 6px;
    }
  }
}

.chat-user-profile-badge {
  .v-badge__badge {
    /* stylelint-disable liberty/use-logical-spec */
    min-width: 12px !important;
    height: 0.75rem;
    /* stylelint-enable liberty/use-logical-spec */
  }
}

.chat-contact {
  border-radius: vuetify.$border-radius-root;
  margin-block-end: 6px;
  padding-block: 12px;
  padding-inline: var(--chat-content-spacing-x);

  @include mixins.before-pseudo;

  &.chat-contact-active {
    background: linear-gradient(
      270deg,
      rgb(var(--v-theme-primary)) 0%,
      #fff 300%
    );
    color: #fff;

    --v-theme-on-background: #fff;

    .v-avatar {
      background: #fff;
    }
  }

  .v-badge--bordered .v-badge__badge::after {
    color: #fff;
  }
}
</style>
