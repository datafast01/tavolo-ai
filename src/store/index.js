
import Vuex from "vuex";

// Modules
import paymentStore from "./paymentStore";
import profileStore from './profileStore';



export default new Vuex.Store({
  modules: {
   profileStore,
   paymentStore
  },
  strict: process.env.DEV,
});
