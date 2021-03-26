//一个模块就是一个单独的store对象
import Vue from "vue"
import  {getData}  from "../../api/index"
import {
    GET_SHOP_DATA,
    ADD_FOOD_COUNT,
    DEL_FOOD_COUNT,
    CLEAR_FOOD_ARR,
    SAVE_FOOD_ARR
}
    from "../mutation-types"

const state = {
    shopData: {},//所有信息,包括shop rating  和info
    foodArr: [],//用来收集所有数量大于1的food
}
const mutations = {
    [SAVE_FOOD_ARR](state, foodArr) {
        state.foodArr = foodArr;
    },

    [CLEAR_FOOD_ARR](state) {
        state.foodArr.forEach((food) => {
            food.count = 0
        })
        state.foodArr = [];
    },
    [GET_SHOP_DATA](state, shopData) {
        state.shopData = shopData;
    },
    [ADD_FOOD_COUNT](state, {food}) {
        if (food.count) {
            food.count++
        } else {
            Vue.set(food, "count", 1)
            state.foodArr.push(food)//之所以不写上面是因为我们只需要保证count>1的food在arr里面即可
        }
    },
    [DEL_FOOD_COUNT](state, {food}) {
        if (food.count > 0) {
            food.count--;
            if (food.count === 0) {
                state.foodArr.splice(state.foodArr.indexOf(food), 1);
            }
        }
    }

}
const actions = {

  async  getShopData({commit}){
       const result = await getData()
      if (result.code === 0){
          commit(GET_SHOP_DATA,result.data)
      }
    },

    changeFoodCount({commit}, {isAdd, food}) {
        if (isAdd) {
            commit(ADD_FOOD_COUNT, {food})
        } else {
            commit(DEL_FOOD_COUNT, {food})
        }
    }


}
const getters = {
    totalCount(state) {//统计数量
        return state.foodArr.reduce((pre, food) => {
            return pre + food.count
        }, 0)
    },
    totalMoney() { //统计金额
        return state.foodArr.reduce((pre, food) => {
            return pre + food.count * food.price
        }, 0)
    }


}


export default {
    state,
    mutations,
    actions,
    getters
}