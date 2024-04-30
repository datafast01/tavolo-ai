<template>
  <div class="mt-8">
    <div class="d-flex justify-space-between align-center">
      <div>CHOOSE YOUR PLAN</div>

    </div>

    <VRow class="ml-4">
      <VCol cols="12" md="4" v-for="pkg in packages" :key="pkg">
        <v-card class="mt-4 cursor-pointer selected-card" min-height="400" variant="outlined" color="black"
          max-width="300" v-model="currentPkg" @click="selectPkg(pkg.id)">
          <v-card-text>
            <div>
              <span class="f-18 selected-card-text">
                {{ pkg.title }}
              </span>
              <div class="my-3">
                <span class="font-weight-bold f-24">{{ pkg.currency }}{{ pkg.price }}</span>/Recording
              </div>
              <div>{{ pkg.description }}</div>
              <VList class="card-list my-3 transparent">
                <VListItem v-for="features in pkg.features" :key="features">
                  <template #prepend>
                    <VIcon icon="mdi-check-circle" />
                  </template>

                  <VListItemTitle class="text-body-2">
                    {{ features }}
                  </VListItemTitle>
                </VListItem>
              </VList>
            </div>
            <!-- <v-btn
              :class="pkg.id != currentPkg ? 'selected-card' : 'pricing-card'"
              class="d-none"
              size="x-large"
              >Continue</v-btn
            > -->
            <RouterLink :to="{ name: 'hiring-influencer' }">
              <VBtn :class="pkg.id != currentPkg ? 'selected-card' : 'pricing-card'" class="large-1 d-none">
                Continue
              </VBtn>
            </RouterLink>
          </v-card-text>
        </v-card>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import axios from "@axios";

export default {
  data() {
    return {
      toggle: "single",

      packages: []


    };
  },
  methods: {
    selectPkg(pkg) {
      this.currentPkg = pkg;
      console.log(this.currentPkg);
    },
    getInfluencerPackages() {
      console.log(this.$route.params.id)

      axios
        .get(`influencer/packages/${this.$route.params.id}`)
        .then((response) => {
          console.log("user", response.data);
          this.packages = response.data.data

        })
        .catch((err) => {
          console.log(err.response);
          show.value = true;
          if (err.response.status == 400) {
            snkMsg.value = err.response.data.error;
          } else {
            snkMsg.value = "Something went wrong";
          }
          color.value = "error";
        });
    }
  },

  computed: {
    selectedPkg() {
      let pkg = this.singlePackages;
      if (this.toggle == "single") {
        pkg = this.singlePackages;
      } else {
        pkg = this.monthlyPackages;
      }
      return pkg;
    },
    // currentPkg() {
    //   return this.singlePackages[0].id;
    // },
  },
  mounted() {
    this.getInfluencerPackages()
  }
};
</script>

<style scoped>
.pricing-card {
  border: 1px solid #9155fd !important;
  border-radius: 12px;
  display: block !important;
}

.d-none {
  display: none;
}

.selected-card-text {
  color: #9155fd;
}

.large-1 {
  width: 100% !important;
  margin-top: 42px;
}

.transparent {
  background-color: rgba(255, 0, 0, 0);
}
</style>
