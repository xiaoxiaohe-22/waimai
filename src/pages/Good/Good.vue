<template>
  <div>
    <GoodHeader/>
    <div class="tabs">
      <div class="tab_item">
          <router-link to="/good/reservation" replace>
            订餐
          </router-link>
      </div>
      <div class="tab_item">
          <router-link to="/good/rating" replace>
            评价
          </router-link>
      </div>
      <div class="tab_item">
        <router-link to="/good/business" replace>
          商家
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import {mapState} from "vuex"
import GoodHeader from "@/components/GoodHeader/GoodHeader";
import {GET_SHOP_DATA,SAVE_FOOD_ARR} from "@/vuex/mutation-types"
export default {
  name: "Good",
  components:{
    GoodHeader
  },
  computed:{
   ...mapState({
     shopData: state => state.shop.shopData
   })
  },
   mounted() {
     //从sessionStorage里面读取数据
     let shopData = JSON.parse(sessionStorage.getItem("shopData"))
     if (shopData){
       //我们就要把数据更新到vuex中去
          this.$store.commit(GET_SHOP_DATA,shopData)
       //上面仅仅是更新了shopData 那么我的foodArr呢?
      let foodArr = shopData.goods.reduce((pre,shop)=>{
         pre.push(...shop.foods.filter((food)=>{return food.count>0}))
         return pre
       },[])
       console.log(foodArr);
       this.$store.commit(SAVE_FOOD_ARR,foodArr)
     }else {
       //session中没有数据
       this.$store.dispatch("getShopData")
     }
//绑定页面刷新事件 这个是存数据 那么什么时候读数据呢?刷新完 也就是组件重新加载
    window.addEventListener("unload", ()=>{
      sessionStorage.setItem("shopData",JSON.stringify(this.shopData))
    })
  },
  beforeDestroy() {
    sessionStorage.setItem("shopData",JSON.stringify(this.shopData))
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"

.tabs
  width: 100%
  display flex
  bottom-border-1px(#ccc)
  .tab_item
    position relative
    flex 1
    height: 40px
    line-height 40px
    text-align center
    a
      font-size 14px
      font-weight bold
      &.router-link-active
        color $green
        &::after
          position absolute;
          left 0
          bottom 0
          content ""
          width 30%
          height 2px
          background-color: $green;
          transform translateX(45px)

</style>
