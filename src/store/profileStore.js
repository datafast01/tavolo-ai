
import axios from "@axios";


export default {
  
  state: {
    cloverClientId: null,
    cloverCode: null,
    cloverMerchantId: null,
    userProfile: {}

  },

  mutations: {
   setCloverClientId(state, data){
    state.cloverClientId = data
   },

   setUserProfile(state, data){
    state.userProfile = data
   }

  },
  actions: {
  getProfile({ commit, state }) {
      axios
        .get(`getProfile`)
        .then((response) => {
          console.log("asdlfasdf", response.data);
          commit('setUserProfile', response.data)
          console.log(state.userProfile,'current pkgggg')
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
    getters: {

      userProfile(state){
        return state.userProfile
      }
     
    },
}
