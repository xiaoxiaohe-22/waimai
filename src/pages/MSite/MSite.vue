<template>
  <div class="msite">
    <!--首页头部-->
    <Header :title="$store.state.address.name || '正在定位中...'">
      <a class="header_search" slot="left">
        <i style="font-size: 26px;color: white" class="iconfont iconsousuo-"></i>
      </a>
      <a @click="$router.replace('/login')"
         class="header_login" slot="right" v-if="user.keys <= 0">
        <span class="header_login_text">登录|注册</span>
      </a>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div v-if="categoryArr.length>0" class="swiper-container">
        <div class="swiper-wrapper">
<!--          一个slide就是一页的显示内容-->
          <div class="swiper-slide" v-for="(category,index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="c in category" :key="c.id">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com/'+c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div v-else>
        <img src="./images/msite_back.svg" alt="loading...">
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container">
        <ul v-if="shops.length>0" class="shop_list">
          <li @click="gotoGood" v-for="shop in shops" :key="shop.id" class="shop_li border-1px">
            <a>
              <div class="shop_left">
                <img class="shop_img" :src="'https://fuss10.elemecdn.com'+shop.image_path">
              </div>
              <div class="shop_right">
                <section class="shop_detail_header">
                  <h4 class="shop_title" >{{ shop.category }}</h4>
                  <ul class="shop_detail_ul">
                    <li class="supports" v-for="(support,index) in shop.supports" :key="index">
                      {{support.icon_name}}
                    </li>

                  </ul>
                </section>
                <section class="shop_rating_order">
                  <section class="shop_rating_order_left">
                    <div class="star star-24">
                      <span class="star-item on"></span>
                      <span class="star-item on"></span>
                      <span class="star-item on"></span>
                      <span class="star-item half"></span>
                      <span class="star-item off"></span>
                    </div>
                    <div class="rating_section">
                      {{ shop.rating }}
                    </div>
                    <div class="order_section">
                      月售{{shop.recent_order_num}}单
                    </div>
                  </section>
                  <section class="shop_rating_order_right">
                    <span class="delivery_style delivery_left">{{ shop.delivery_mode.text }}</span>
                    <span class="delivery_style delivery_right">准时达</span>
                  </section>
                </section>
                <section class="shop_distance">
                  <p class="shop_delivery_msg">
                    <span>¥{{shop.float_minimum_order_amount}}起送</span>
                    <span class="segmentation">/</span>
                    <span>配送费约¥{{shop.float_delivery_fee}}</span>
                  </p>
                </section>
              </div>
            </a>
          </li>
        </ul>
        <ul v-else>
          <li>
            <img src="./images/shop_back.svg" alt="loading....">
          </li><li>
          <img src="./images/shop_back.svg" alt="loading....">
        </li><li>
          <img src="./images/shop_back.svg" alt="loading....">
        </li><li>
          <img src="./images/shop_back.svg" alt="loading....">
        </li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>
import 'swiper/css/swiper.min.css'
import Swiper from 'swiper'
import {mapState} from 'vuex'
import chunk from 'lodash/chunk'
export default {
  name: 'MSite',
  computed:{
    ...mapState(["categorys","shops",'user']),
    //使用lodash
    categoryArr(){
      return chunk(this.categorys,8)
    }
  },
  methods:{
    gotoGood(){
      this.$router.push("/good")
    }
  },

  async mounted() {
    this.$store.dispatch("getAddress")
    this.$store.dispatch("getShops")
    //dispatch异步的actions
    await this.$store.dispatch("getCategorys")
    new Swiper('.swiper-container',{
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
    })

  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.msite
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0 10px
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
    .shop_container
      margin-bottom 50px
      .shop_list
        .shop_li
          bottom-border-1px(#f1f1f1)
          width 100%
          >a
            clearFix()
            display block
            box-sizing border-box
            padding 15px 8px
            width 100%
            .shop_left
              float left
              box-sizing border-box
              width 23%
              height 75px
              padding-right 10px
              .shop_img
                display block
                width 100%
                height 100%
            .shop_right
              float right
              width 77%
              .shop_detail_header
                clearFix()
                width 100%
                .shop_title
                  text_ellipsis()
                  float left
                  width 200px
                  color #333
                  font-size 16px
                  line-height 16px
                  font-weight 700
                  &::before
                    content '品牌'
                    display inline-block
                    font-size 11px
                    line-height 11px
                    color #333
                    background-color #ffd930
                    padding 2px 2px
                    border-radius 2px
                    margin-right 5px
                .shop_detail_ul
                  float right
                  margin-top 3px
                  .supports
                    float left
                    font-size 10px
                    color #999
                    border 1px solid #f1f1f1
                    padding 0 2px
                    border-radius 2px
              .shop_rating_order
                clearFix()
                width 100%
                margin-top 18px
                margin-bottom 8px
                .shop_rating_order_left
                  float left
                  color #ff9a0d
                  .star //2x图 3x图
                    float left
                    font-size 0
                    .star-item
                      display inline-block
                      background-repeat no-repeat
                    &.star-48
                      .star-item
                        width 20px
                        height 20px
                        margin-right 22px
                        background-size 20px 20px
                        &:last-child
                          margin-right: 0
                        &.on
                          bg-image('./images/stars/star48_on')
                        &.half
                          bg-image('./images/stars/star48_half')
                        &.off
                          bg-image('./images/stars/star48_off')
                    &.star-36
                      .star-item
                        width 15px
                        height 15px
                        margin-right 6px
                        background-size 15px 15px
                        &:last-child
                          margin-right 0
                        &.on
                          bg-image('./images/stars/star36_on')
                        &.half
                          bg-image('./images/stars/star36_half')
                        &.off
                          bg-image('./images/stars/star36_off')
                    &.star-24
                      .star-item
                        width 10px
                        height 10px
                        margin-right 3px
                        background-size 10px 10px
                        &:last-child
                          margin-right 0
                        &.on
                          bg-image('./images/stars/star24_on')
                        &.half
                          bg-image('./images/stars/star24_half')
                        &.off
                          bg-image('./images/stars/star24_off')
                  .rating_section
                    float left
                    font-size 10px
                    color #ff6000
                    margin-left 4px
                  .order_section
                    float left
                    font-size 10px
                    color #666
                    transform scale(.8)
                .shop_rating_order_right
                  float right
                  font-size 0
                  .delivery_style
                    transform-origin 35px 0
                    transform scale(.7)
                    display inline-block
                    font-size 12px
                    padding 1px
                    border-radius 2px
                  .delivery_left
                    color #fff
                    margin-right -10px
                    background-color #02a774
                    border 1px solid #02a774
                  .delivery_right
                    color #02a774
                    border 1px solid #02a774
              .shop_distance
                clearFix()
                width 100%
                font-size 12px
                .shop_delivery_msg
                  float left
                  transform-origin 0
                  transform scale(.9)
                  width: 200px
                  color #666
                .segmentation
                  color #ccc





</style>
