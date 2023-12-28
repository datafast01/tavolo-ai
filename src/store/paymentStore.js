import axios from "@axios";



export default {
  
  state: {
    count: 0,
    currentPkg: {}

  },

  mutations: {
    increment (state) {
      state.count++
      console.log(state.count)
    }
  },
  actions: {
    getPackageHistory({ commit, state }) {
      axios
        .get(`package-history`)
        .then((response) => {
          // console.log("asdlfasdf", response.data.data);
          state.currentPkg = response.data.data
          console.log(state.currentPkg,'current pkgggg')
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
    getters: {
      getCurrentPkg(state) {
      return state.currentPkg
    }
    },
}
