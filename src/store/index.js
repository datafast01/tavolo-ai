
import Vuex from "vuex";

// Modules
import ProfileSettings from './paymentStore';


export default new Vuex.Store({
  modules: {
   ProfileSettings
  },
  strict: process.env.DEV,
});
