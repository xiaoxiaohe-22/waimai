import 'lib-flexible'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  store from "./vuex/store"
import "./vee-validate"
import Header from "./components/Header";
import * as API from './api/index'
import "./mock/mock"  //加载mock.js

import { Button } from 'mint-ui';


Vue.component("Header",Header)//全局注册Header组件
Vue.component(Button.name, Button);
Vue.config.productionTip = false;
Vue.prototype.$API = API;  //把所有请求接口的方法挂载到vue的原型对象上面去


new Vue({
    render:h=>h(App),
    router,
    store
}).$mount("#app")
