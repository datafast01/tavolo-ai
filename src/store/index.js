
import Vuex from "vuex";

// Modules
import paymentStore from "./paymentStore";
import profileStore from './profileStore';
import themeStore from "./themeStore";



export default new Vuex.Store({
  modules: {
   profileStore,
   paymentStore,
   themeStore
  },
  strict: process.env.DEV,
});
