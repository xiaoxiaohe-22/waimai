import Vue from "vue"
import Vuex  from "vuex"

Vue.use(Vuex)

import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutation"

import shop from "@/vuex/modules/shop";


export default  new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules:{
        shop
    }

})