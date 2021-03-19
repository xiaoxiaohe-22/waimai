<template>
  <div>
    <!--    路由显示部分-->
    <router-view></router-view>
    <FooterGuider v-if="['/msite','/search','/order','/profile'].indexOf($route.path)>=0"/>
  </div>

</template>

<script>
import FooterGuider from "./components/FooterGuider";


export default {
  name: 'App',
  data(){
    return {
      address:""
    }
  },
  components:{
    FooterGuider
  },
   mounted() {
      this.$store.dispatch("getAddress")
      //this.$store.dispatch("getCategorys")
      //this.$store.dispatch("getShops")
  }

}
</script>

<style scoped lang="stylus" type="stylesheet/stylus">
@import "./common/stylus/mixins.styl"



</style>
