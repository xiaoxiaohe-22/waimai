// 该模块封装n个发请求的函数
import instance  from './ajax'


//1、根据经纬度获取位置详情
export const reqAddress = (longitude,latitude)=> instance(`/position/${latitude},${longitude}`)

//2、获取食品分类列表
export  const reqFoodCategories = () => instance('/index_category')

//3、根据经纬度获取商铺列表

export const reqShops = ({longitude,latitude})=> instance(`/shops?latitude=${latitude}&longitude=${longitude}`)