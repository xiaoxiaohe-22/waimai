<template>
  <section class="profile">
    <Header title="个 人 中 心"/>
    <section class="profile-number">
      <div @click="toLogin" class="profile-link">
        <div class="profile_image">
          <i  class="iconfont icon-person iconwodedangxuan"></i>
        </div>
        <div class="user-info">
          <p v-if="!user.phone" class="user-info-top">{{user.name ||'登录/注册'}}</p>
          <p v-if="!user.name">
            <span class="user-icon">
              <i class="iconfont iconPhoneAddNewApp"></i>
            </span>
            <span class="icon-mobile-number">{{user.phone || '暂无绑定手机号'}}</span>
          </p>

        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </div>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的订单 -->
      <a href='javascript:' class="my_order">
        <span>
          <i class="iconfont icon-order-s"></i>
        </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
      <!-- 积分商城 -->
      <a href='javascript:' class="my_order">
        <span>
          <i class="iconfont icon-jifen"></i>
        </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
      <!-- 硅谷外卖会员卡 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-vip"></i>
        </span>
        <div class="my_order_div">
          <span>硅谷外卖会员卡</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服务中心 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-fuwu"></i>
        </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
    </section>
    <mt-button style="width: 100%"
               type="danger"
               @click.native="logOut"
    >退出登录</mt-button>
  </section>

</template>

<script>
import { MessageBox } from 'mint-ui';
import {mapState} from "vuex"
import {LOGOUT} from "../../vuex/mutation-types"

export default {
  name:"Profile",
  computed:{
    ...mapState(['user'])
  },
  methods:{
    toLogin(){
      !this.user._id && this.$router.push("/login")
    },
    async logOut(){
     const result =  await MessageBox.confirm('确定执行此操作?')
      if (result){
        //退出的意思是 销毁localstorage里面保存的token以及置vuex中的token和user为初始数据
        this.$store.commit(LOGOUT);
        //然后页面跳转到登录页面
        this.$router.replace("/login")
      }


    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.profile //我的
  width 100%
  .profile-number
    margin-top 45.5px
    .profile-link
      clearFix()
      position relative
      display block
      background #02a774
      padding 20px 10px
      .profile_image
        float left
        width 60px
        height 60px
        border-radius 50%
        overflow hidden
        vertical-align top
        .icon-person
          font-size 42px
          color black
      .user-info
        float left
        margin-top 8px
        margin-left 15px
        p
          font-weight: 700
          font-size 18px
          color #fff
          &.user-info-top
            padding-bottom 8px
          .user-icon
            display inline-block
            margin-left -15px
            margin-right 5px
            width 20px
            height 20px
            .icon-mobile
              font-size 30px
              vertical-align text-top
          .icon-mobile-number
            font-size 14px
            color #fff
      .arrow
        width 12px
        height 12px
        position absolute
        right 15px
        top 40%
        .icon-jiantou1
          color #fff
          font-size 5px
  .profile_info_data
    bottom-border-1px(#e4e4e4)
    width 100%
    background #fff
    overflow hidden
    .info_data_list
      clearFix()
      .info_data_link
        float left
        width 33%
        text-align center
        border-right 1px solid #f1f1f1
        .info_data_top
          display block
          width 100%
          font-size 14px
          color #333
          padding 15px 5px 10px
          span
            display inline-block
            font-size 30px
            color #f90
            font-weight 700
            line-height 30px
        .info_data_bottom
          display inline-block
          font-size 14px
          color #666
          font-weight 400
          padding-bottom 10px
      .info_data_link:nth-of-type(2)
        .info_data_top
          span
            color #ff5f3e
      .info_data_link:nth-of-type(3)
        border 0
        .info_data_top
          span
            color #6ac20b
  .profile_my_order
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .my_order
      display flex
      align-items center
      padding-left 15px
      >span
        display flex
        align-items center
        width 20px
        height 20px
        >.iconfont
          margin-left -10px
          font-size 30px
        .icon-order-s
          color #02a774
        .icon-jifen
          color #ff5f3e
        .icon-vip
          color #f90
        .icon-fuwu
          color #02a774
      .my_order_div
        width 100%
        border-bottom 1px solid #f1f1f1
        padding 18px 10px 18px 0
        font-size 16px
        color #333
        display flex
        justify-content space-between
        span
          display inline-block
        .my_order_icon
          float right
          width 10px
          height 10px
          .icon-jiantou1
            color #bbb
            font-size 10px
</style>
