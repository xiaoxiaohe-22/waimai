import 'lib-flexible'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  store from "./vuex/store"

import Header from "./components/Header";

Vue.component("Header",Header)//全局注册Header组件

Vue.config.productionTip = false;

new Vue({
    render:h=>h(App),
    router,
    store
}).$mount("#app")
