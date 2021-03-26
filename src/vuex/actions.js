//多个间接更新数据的方法
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, SAVE_USER, SAVE_TOKEN} from "./mutation-types"
import {reqAddress, reqFoodCategories, reqShops} from "../api/index"

export default {
    /*
      获取当前地址信息对象的异步action
      */
    async getAddress({commit, state}) {
        const {latitude, longitude} = state;
        const result = await reqAddress(longitude, latitude);
        if (result.code === 0) {
            commit(RECEIVE_ADDRESS, result.data)
        }
    },
    /*
          获取商品分类数组的异步action
          */
    async getCategorys({commit}) {

        const result = await reqFoodCategories();
        if (result.code === 0) {
            commit(RECEIVE_CATEGORYS, result.data)
        }
    },
    /*
          商家数组的异步action
          */
    async getShops({commit, state}) {
        const {latitude, longitude} = state;
        const result = await reqShops({longitude, latitude});
        if (result.code === 0) {
            commit(RECEIVE_SHOPS, result.data)
        }
    },


    saveUser({commit}, user) {

        commit(SAVE_TOKEN, user.token)
        localStorage.setItem("token_key", user.token)
        delete user.token
        commit(SAVE_USER, user)
    },

}