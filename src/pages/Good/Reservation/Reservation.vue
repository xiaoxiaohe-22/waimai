<template>
  <div id="res_container">
    <div class="res_left">
      <ul ref="leftUL" class="res_list">
        <li @click="changeIndex(index)" :class="{active:navIndex === index}" v-for="(shop,index) in shops" :key="index">
          {{ shop.name }}
        </li>
      </ul>
    </div>
    <div class="res_right">
      <div class="foods-wrapper">
        <ul ref="rightUL">
          <li v-for="(shop,index) in shops" :key="index" class="food-list-hook">
            <h1 class="title">{{ shop.name }}</h1>
            <ul>
              <li v-for="(food,index) in shop.foods" :key="index" class="food-item bottom-border-1px">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.image">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span></div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <keep-alive>
                      <CartControl :food="food"/>
                    </keep-alive>

                  </div>
                </div>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </div>

<!--    购物车统计金额和数量的组件-->
    <ShopCart />
  </div>


</template>
<script>
import BScroll from '@better-scroll/core'
import {mapState} from "vuex"
import CartControl from "@/components/CartControl/CartControl";
import ShopCart from "@/components/ShopCart/ShopCart";
export default {
  name: "Reservation",
  components:{
    CartControl,
    ShopCart
  },
  data() {
    return {
      tops: [],  //右侧所有li距离顶部的高度数组,
      scrollY: 0,  //初始距离顶部的距离
    }
  },
  mounted() {
    if (this.shops) {//这个是为了解决二级路由切换时scroll失效的问题
      this._initSC();
    }
  },
  computed: {
    ...mapState({
      shops: state => state.shop.shopData.goods,
    }),
    navIndex:{
      get(){
        const {scrollY, tops} = this;
        let index; //计算左边此时的index在哪我们就高亮显示
        index = this.tops.findIndex((item, index) => {
          return scrollY >= item && scrollY < tops[index + 1]
        })
        if (index === -1) {
          index = 0
        }
        return index;
      },
      set(){

      }

    }
  },
  methods: {
    changeIndex(index){
      this.scrollY = this.tops[index]
      this.rightSC.scrollTo(0,-this.tops[index],1000)

    },
    _initSC() {
      this.leftSC = new BScroll('.res_left', {
        scrollY: true,
        click:true
      })
      this.rightSC = new BScroll('.res_right', {
        scrollY: true,
        probeType: 2   //2表示实时,但是惯性不计算
      })
      //右边区域绑定scroll事件
      this.rightSC.on("scroll", ({x, y}) => {
        //这里拿到的是距离顶部的距离  往下滑动所以y是负值
        this.scrollY = Math.abs(y)
      })
      //右边绑定滚动结束事件
      this.rightSC.on("scrollEnd", ({x, y}) => {
        //这里拿到的是距离顶部的距离  往下滑动所以y是负值
        this.scrollY = Math.abs(y)
      })


    },  //创建scroll的实例
    _calTops() {
      //shops数据变化之后我们就可以开始计算高度的数组
      let lis = Array.from(this.$refs.rightUL.children)
      let arr = [];
      let top1 = 0;
      arr.push(0)
      lis.reduce((pre, item) => {
        pre = pre + item.clientHeight
        arr.push(pre)
        return pre;
      }, top1)
      this.tops = arr;
    },  //计算右边所有li距离顶部的高度
  },
  watch: {
    shops() {
      this.$nextTick(() => {
        //其实创建scroll的时机和swiper一样必须要等列表数据展示之后
        this._initSC();
        this._calTops();
      })
    },
    navIndex(){
      //只要navIndex的值发生了改变我们就应该调用scrollT方法
      this.leftSC.scrollToElement(this.$refs.leftUL.children[this.navIndex],1000)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"

#res_container
  width 100%
  display flex
  overflow: hidden;
  .res_left
    width: 30%
    height calc(100vh - 272px)
    background-color #F3F5F7;
    .res_list
      li
        &.active
          color $green
          background-color: #fff;
          font-weight bold
        height 40px
        line-height 40px
        text-align center
        &:after
          content ""
          display block
          width: 60%
          height 1px
          background-color: #8a8585;
          margin-left 50%
          transform translateX(-50%)

  .res_right
    height calc(100vh - 224px)
    width 70%

    .foods-wrapper
      flex: 1

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1

          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .desc
            line-height: 12px
            margin-bottom: 8px

          .extra
            .count
              margin-right: 12px

          .price
            font-weight: 700
            line-height: 24px

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px

</style>
