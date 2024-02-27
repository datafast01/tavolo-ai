<template>
  <VRow>
    <VCol cols="12">
      <div class="vavatar mt-5 py-5">
        <v-img :src="done1" alt="John"></v-img>
      </div>
      <div class="d-flex align-center justify-center mt-5">
        <h1>Congratulations!</h1>
        <img :src="done2" class="ml-3" height="30" alt="John" />
      </div>
      <div class="text-center mt-5">
        <p>
          Your request has been sent successfully. <br />
          We will let you know once the influencer responds with your request.
        </p>
        <div class="my-5 py-5">
          <VBtn @click="backToProfile">Back to profile </VBtn>
        </div>
      </div>
    </VCol>
  </VRow>
</template>
<script>
import done1 from "@/assets/images/cards/done1.png";
import done2 from "@/assets/images/cards/done2.png";
export default {
  data() {
    return {
      done1: done1,
      done2: done2,
    };
  },
  methods: {
    backToProfile() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.vavatar {
  border-radius: 7px;
  text-align: center;
  height: 200px;
}
</style>
