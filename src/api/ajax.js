import axios from "axios";
import qs from 'querystring'

let instance = axios.create({
    baseURL:"/api",
    timeout:20000
});
//添加请求和响应拦截器
instance.interceptors.request.use(
    (config)=> {
        //如果请求体数据是对象格式 我们给它转化成urlencoded格式
        if (config.data instanceof Object){
          config.data =  qs.stringify(config.data)
        }
    return config;
},
     (error)=> {
        return Promise.reject(error);
});


instance.interceptors.response.use(
    function (response) {
            return response.data;
},
    function (error) {
        alert(error.message)//统一处理异常信息
            return new Promise(()=>{})
});



export default  instance;