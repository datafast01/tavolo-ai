<template>
  <VRow>
    <VCol cols="12" md="3" v-for="post in instaPosts" :key="post.id">
      <div class="d-flex flex-column">
        <img
          :src="post.media_url"
          alt=""
          width="200"
          height="300"
          class="video"
          v-if="post.media_type == 'IMAGE'"
        />
        <!-- <video

          ref="videoPlayer"
          width="200"
          height="300"
          controls
          class="video"
        >
          <source src="./tiktok.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> -->
        <span class="mb-2">@{{ post.username }}</span>
      </div>

      <div class="username mt-1">
        <div class="d-flex justify-space-between">
          <span class="mb-1">Reach</span>
          <span class="d-flex justify-end">20</span>
        </div>

        <div>
          <div class="d-flex align-center">
            <v-progress-linear
              model-value="20"
              color="primary"
              :height="8"
              rounded
            ></v-progress-linear>
          </div>
        </div>
      </div>
      <div class="username my-2">
        <div class="d-flex justify-space-between">
          <span class="mb-1">Imressions</span>
          <span class="d-flex justify-end">50</span>
        </div>

        <div>
          <div class="d-flex align-center">
            <v-progress-linear
              model-value="50"
              color="primary"
              :height="8"
              rounded
            ></v-progress-linear>
          </div>
        </div>
      </div>
      <div class="username my-2">
        <div class="d-flex justify-space-between">
          <span class="mb-1">Engagement</span>
          <span class="d-flex justify-end">80</span>
        </div>

        <div>
          <div class="d-flex align-center">
            <v-progress-linear
              model-value="80"
              color="primary"
              :height="8"
              rounded
            ></v-progress-linear>
          </div>
        </div>
      </div>
      <div class="username my-2">
        <div class="d-flex justify-space-between">
          <span class="mb-1">Shares</span>
          <span class="d-flex justify-end">10</span>
        </div>

        <div>
          <div class="d-flex align-center">
            <v-progress-linear
              model-value="10"
              color="primary"
              :height="8"
              rounded
            ></v-progress-linear>
          </div>
        </div>
      </div>

      <!-- <div class="overlay">
        <button @click="togglePlayPause">
          {{ isPlaying ? "Pause" : "Play" }}
        </button>
      </div> -->
    </VCol>
  </VRow>
</template>

<script>
import axios from "@axios";
export default {
  data() {
    return {
      isPlaying: false,
      instaPosts: [],
    };
  },

  mounted() {
    this.getUserProfile();
  },

  methods: {
    getUserProfile() {
      // console.log("submit form", ApiService);
      axios
        .get(`getprofile`)
        .then((response) => {
          console.log("user", response.data);
          this.instaPosts = response.data.instagram.posts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.video {
  border-radius: 24px;
}
.username {
  height: 30px;
  width: 200px;
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
