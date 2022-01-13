import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./auth.module";

import { cart2 } from "./cart2.module";
//import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    auth,
    cart2
  },
  //plugins: [createPersistedState()]
})
