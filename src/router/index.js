import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "@/router/routes";
//声明使用插件

Vue.use(VueRouter)
export default new VueRouter({
    mode:"history",
    routes
})