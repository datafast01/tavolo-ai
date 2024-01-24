
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
          commit('setUserProfile', response.data)
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
