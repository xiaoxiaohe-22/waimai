import axios from "axios";
import qs from 'querystring'
import router from "../router/index"


let instance = axios.create({
    baseURL: "/api",
    timeout: 20000
});
//添加请求和响应拦截器
instance.interceptors.request.use(
    (config) => {

        //如果请求体数据是对象格式 我们给它转化成urlencoded格式
        if (config.data instanceof Object) {
            config.data = qs.stringify(config.data)
        }

        let token = localStorage.getItem("token_key")
        //不是所有的请求我们都需要判断有没有token的判断
        if (config.headers.needToken){
            if (!token) {
                //说明还没有登录
                throw  new Error("尚未登录,请先登录")
            } else {
                config.headers.authorization = token

            }
        }


        return config;
    });


instance.interceptors.response.use(
    function (response) {


        return response.data;
    },
    function (error) {
        //console.log(error);
        //这里我们需要判断异常的种类 如果主要是先要判断是不是未登录导致这里来的
        if (!error.response) {
            alert("请先登录...")
            if (router.currentRoute.path !== '/login'){
                router.replace("/login")
            }
        } else {
            if (error.response.status === 401) {
                alert("错误代码401表示未授权")
                if (router.currentRoute.path !== '/login'){
                    router.replace("/login")
                }
            } else {
                alert("请求出错")
            }
        }

        return new Promise(() => {
        })
    });


export default instance;