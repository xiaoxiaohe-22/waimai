<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div @click="toggleShowCart" class="logo" :class="{highlight:totalCount>0}">
              <i class="iconfont iconshoppingcart " :class="{highlight:totalCount>0}"></i>
            </div>
            <div class="num" v-if="totalCount>0">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{highlight:totalMoney>0}">￥{{ totalMoney }}</div>
          <div class="desc" v-if="info">另需配送费￥{{ info.deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="isEnough">
            {{ showText }}
          </div>
        </div>
      </div>
      <transition name="showCart">
        <div v-show="isShowCart" class="shopcart-list" v-if="foods.length>0">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food,index) in foods" :key="index">
                <span class="name">{{ food.name }}</span>
                <div class="price"><span>￥{{ food.price }}</span></div>
                <div class="cartcontrol-wrapper">
                  <!-- <div class="cartcontrol">
                      <div class="iconfont   icon-remove_circle_outline"></div>
                      <div class="cart-count">{{totalCount}}</div>
                      <div class="iconfont   icon-add_circle"></div>
                    </div>-->
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

    </div>
    <div @click="isShowCart = false" class="list-mask" v-show="isShowCart && foods.length>0"></div>
  </div>

</template>
<script>
import { MessageBox } from 'mint-ui';
import {mapGetters, mapState} from "vuex"
import {CLEAR_FOOD_ARR} from "../../vuex/mutation-types"
import CartControl from "@/components/CartControl/CartControl";

export default {
  name: "ShopCart",
  components: {
    CartControl
  },
  data() {
    return {
      isShowCart: false
    }
  },
  computed: {
    ...mapGetters(['totalCount', 'totalMoney']),
    ...mapState({
      info: state => state.shop.shopData.info,
      showText() {
        const {totalMoney, info} = this;
        if (!info) {
          return
        }
        let text;
        if (totalMoney === 0) {
          text = `${info.minPrice}元起送`
        } else if (totalMoney < info.minPrice) {
          text = `差${info.minPrice - totalMoney}元配送`
        } else {
          text = "去结算"
        }

        return text;
      },
      isEnough() {
        if (!this.info) {
          return
        }
        return this.totalMoney >= this.info.minPrice ? 'enough' : 'not-enough'
      },
      ...mapState({
        goods: state => state.shop.shopData.goods,
        foods: state => state.shop.foodArr,
      })
    })
  },
  methods: {
    toggleShowCart() {
      this.totalCount && (this.isShowCart = !this.isShowCart);
    },
    clearCart() {//清空购物车
      MessageBox.confirm('确定执行此操作?').then(
          action => {
            this.$store.commit(CLEAR_FOOD_ARR)
      }
      );

    }
  }


}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.shopcart
  position: fixed
  left: 0
  bottom: 0
  z-index: 50
  width: 100%
  height: 48px

  .content
    display: flex
    background: #141d27
    font-size: 0
    color: rgba(255, 255, 255, 0.4)

    .content-left
      flex: 1

      .logo-wrapper
        display: inline-block
        vertical-align: top
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing: border-box
        border-radius: 50%
        background: #141d27

        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          text-align: center
          background: #2b343c

          &.highlight
            background: $green

          .iconshoppingcart
            line-height: 44px
            font-size: 24px
            color: #80858a

            &.highlight
              color: #fff

        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          text-align: center
          border-radius: 16px
          font-size: 9px
          font-weight: 700
          color: #ffffff
          background: rgb(240, 20, 20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)

      .price
        display: inline-block
        vertical-align: top
        margin-top: 12px
        line-height: 24px
        padding-right: 12px
        box-sizing: border-box
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        font-size: 16px
        font-weight: 700

        &.highlight
          color: #fff

      .desc
        display: inline-block
        vertical-align: top
        margin: 12px 0 0 12px
        line-height: 24px
        font-size: 10px

    .content-right
      flex: 0 0 105px
      width: 105px

      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 12px
        font-weight: 700

        &.not-enough
          background: #2b333b

        &.enough
          background: #00b43c
          color: #fff

  .shopcart-list
    position: absolute
    left: 0
    top: 0
    z-index: -1
    width: 100%
    transform translateY(-100%)

    &.showCart-enter-active, &.showCart-leave-active {
      transition: opacity .5s;
    }

    &.showCart-enter, &.showCart-leave-to {
      transform translateY(0)
    }

    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)

      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27)

      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)

    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: hidden
      background: #fff

      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7, 17, 27)

        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)

        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 6px

.list-mask
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 40
  backdrop-filter: blur(10px)
  opacity: 1
  background: rgba(7, 17, 27, 0.6)

  &.fade-enter-active, &.fade-leave-active
    transition: all 0.5s

  &.fade-enter, &.fade-leave-to
    opacity: 0
</style>

