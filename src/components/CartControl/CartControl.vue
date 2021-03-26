<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div v-if="food.count>0"
           @click="changeFoodCount(false)"
           class="iconfont icon70BasicIcons-all-58 icon-remove_circle_outline"></div>
    </transition>
    <div v-if="food.count>0" class="cart-count">{{food.count}}</div>
    <div @click="changeFoodCount(true)" class="iconfont icon70BasicIcons-all-59 icon-add_circle"></div>
  </div>

</template>
<script>

  export default {
    name: "CartControl",
    props:{
      food:Object,
    },
    methods:{
      changeFoodCount(isAdd){
          this.$store.dispatch("changeFoodCount",{isAdd,food:this.food})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"

.cartcontrol
  font-size: 0
  .cart-decrease
    display: inline-block
    padding: 4px
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)

  .icon-remove_circle_outline
    display: inline-block
    padding 4px
    line-height 24px
    font-size 16px
    color $green
    &.fade-enter-active,&.fade-leave-active {
      transition: all .5s;
    }
    &.fade-enter,&.fade-leave-to{
      transform translateX(10px) rotate(180deg)
      opacity: 0;
    }
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 4px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
  .icon-add_circle
    display: inline-block
    padding: 4px
    line-height: 24px
    font-size: 16px
    color $green
</style>



