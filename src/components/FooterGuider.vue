<template>

    <ul class="footer-guider">
      <li @click="goto('/msite')" :class="{active:$route.path === '/msite'}">
        <i class="iconfont icontake-out"></i>
        <span>外卖</span>
      </li>
      <li @click="goto('/search')" :class="{active:$route.path === '/search'}">
        <i class="iconfont iconsousuo"></i>
        <span>搜索</span>
      </li>
      <li @click="goto('/order')" :class="{active:$route.path === '/order'}">
        <i class="iconfont iconorder"></i>
        <span>订单</span>
      </li>
      <li @click="goto('/profile')" :class="{active:$route.path === '/profile'}">
        <i class="iconfont iconwodedangxuan"></i>
        <span>我的</span>
      </li>
    </ul>

</template>

<script>
export default {
  name: "FooterGuider",
  methods:{
    goto(path){
      if (this.$route.path === path) {
        location.reload();
      }else {
        this.$router.replace(path);
      }
    }
  }
}
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
@import "../common/stylus/mixins.styl"

.active
  color $green

.footer-guider
  background-color: #fff;
  top-border-1px(#cccccc)
  position fixed
  left 0
  bottom 0
  width 100%
  height: 50px;
  display flex
  flex-direction row
  li
    padding 5px
    flex 1
    display flex
    flex-direction column
    text-align center
    i
      font-size 22px
    span
      margin-top 3px
      font-size 14px
      font-weight bold

</style>