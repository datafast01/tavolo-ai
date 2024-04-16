
import Vuex from "vuex";

// Modules
import paymentStore from "./paymentStore";
import profileStore from './profileStore';
import themeStore from "./themeStore";
import sequenceStore from "./sequenceStore";



export default new Vuex.Store({
  modules: {
    profileStore,
    paymentStore,
    themeStore,
    sequenceStore
  },
  strict: process.env.DEV,
});
