<template>
  <div>
    <!--    路由显示部分-->
    <router-view></router-view>
    <FooterGuider/>
  </div>

</template>

<script>
import FooterGuider from "./components/FooterGuider";
export default {
  name: 'App',
  components:{
    FooterGuider
  }

}
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
@import "./common/stylus/mixins.styl"



</style>
