// 该模块封装n个发请求的函数
import instance  from './ajax'


//1、根据经纬度获取位置详情
export const reqAddress = (longitude,latitude)=> instance(`/position/${latitude},${longitude}`)

//2、获取食品分类列表
export  const reqFoodCategories = () => instance('/index_category',{
    headers:{
        needToken:true
    }
})

//3、根据经纬度获取商铺列表

export const reqShops = ({longitude,latitude})=> instance(`/shops?latitude=${latitude}&longitude=${longitude}`,{
    headers:{
        needToken:true
    }
})

//4、获取验证码

export const sendCode = (phone)=> instance(`/sendcode`,{
    params:{
        phone
    }
})
//5 根据手机号验证码登录
export const reqLoginByPhone =({phone,code}) => instance({
    url: '/login_sms',
    method: 'POST',
    data: {
        phone,
        code
    }
})


//6 根据用户名密码登录
export const reqLoginByUsername =({name,pwd,captcha}) => instance({
    url: '/login_pwd',
    method: 'POST',
    data: {
        name,
        pwd,
        captcha
    }
})

//自动登录
export const autoLogin = () => instance({
    url:"/auto_login",
    headers:{
        needToken:true
    }
})

//测试mock服务器效果
export const getData = ()=> instance({
    url:"/getData"
})