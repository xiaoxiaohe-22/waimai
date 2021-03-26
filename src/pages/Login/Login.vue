<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isShowSMS}" @click="isShowSMS = true">短信登录</a>
          <a href="javascript:;" :class="{on:!isShowSMS}" @click="isShowSMS = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
<!--          短信验证码登录-->
          <div :class="{on:isShowSMS}">
            <section class="login_message">
              <input  name="phone" v-validate="'required|phone'" type="tel" maxlength="11" placeholder="手机号"
                     v-model="phone">
              <span style="color: orangered;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <button :disabled="!isCorrectPhone || countTime>0"
                      class="get_verification"
                      :class="{right_number:isCorrectPhone}"
                      @click.prevent="sendCode"
              >
                {{ countTime > 0 ? `${countTime}s后可以重新获取` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input v-model="code"  name="captcha" v-validate="'required|captcha'" type="tel" maxlength="8" placeholder="验证码">
              <span style="color: orangered;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>

            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
<!--          用户名密码登录-->
          <div :class="{on:!isShowSMS}">
            <section>
              <section class="login_message">
                <input v-model="username" type="tel" name="username" v-validate="'required|username'"
                       maxlength="11" placeholder="手机/邮箱/用户名">
                <span style="color: orangered;" v-show="errors.has('useranme')">{{ errors.first('username') }}</span>
              </section>
              <section class="login_verification">
                <input v-model="pwd" :type="isShowPwd?'tel':'password' "
                       name="pwd" v-validate="'required'"
                       maxlength="8" placeholder="密码">
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                <div class="switch_button"
                     :class="isShowPwd?'on':'off'"
                     @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{ isShowPwd ? 'abc' : '' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input v-model="captcha" type="text" name="yanzhengma" v-validate="'required'"
                       maxlength="11" placeholder="验证码">
                <span style="color: #ff0000;" v-show="errors.has('yanzhengma')">{{ errors.first('yanzhengma') }}</span>
                <img
                    ref="imgRef"
                    @click="changeCode"
                    class="get_verification"
                    src="http://localhost:4000/captcha" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2">&lt;</i>
      </span>
    </div>
  </div>
</template>

<script>


export default {
  name: "Login",
  data() {
    return {
      isShowSMS: true,//是否是短信登录还是密码登录
      phone: "",
      code:"",
      username:"",
      pwd:"",
      captcha:"",
      isShowPwd: false, //输入的密码是否是密码格式显示
      countTime: 0
    }
  },
  computed: {
    isCorrectPhone() {
      return /^1[3456789]\d{9}$/.test(this.phone)
    }
  },
  methods: {
    async sendCode() {
      this.countTime = 5;
      let timer = setInterval(() => {
        this.countTime--
        this.countTime < 0 && clearInterval(timer)
      }, 1000)

      //联系后台发送验证码
      const result = await this.$API.sendCode(this.phone)
      if (result.code === 0) {
        alert('短信发送成功')
      } else {
        alert(result.msg)
      }

    },
    changeCode() {
      this.$refs.imgRef.src = 'http://localhost:4000/captcha?' + Date.now()
    },
    async login() {  //点击登录的回调方法
      const {isShowSMS,phone,code,username,pwd,captcha} = this;
      let names;
      names = isShowSMS ? ['phone', 'captcha'] : ['username', 'pwd', 'yanzhengma']

      const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证

      if (success) {
        //只有前台验证通过了才开始做后台验证,发送后台进行登录
        let result;
        if (isShowSMS){
          //说明是手机号登录
         result =await this.$API.reqLoginByPhone({phone,code})
          if (result.code === 1){
            this.code = ""
          }
        }else {
          //说明是用户名登录
          result = await this.$API.reqLoginByUsername({name:username,pwd,captcha})
          if (result.code === 1){
            this.captcha = ""//如果失败时候有两件事需要做 第一置空验证码 第二重新更新验证码
            this.changeCode();
          }
        }

    //统一处理成功的请求
        if (result.code === 0){
          //保存用户信息到vuex中
          this.$store.dispatch("saveUser",result.data)

          //跳转个人中心页面
          this.$router.replace("/profile")

        }

      } else {
        alert("验证不通过....")
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.loginContainer
  width 100%
  height 100%
  background #fff

  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto

    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center

      .login_header_title
        padding-top 40px
        text-align center

        > a
          color #333
          font-size 14px
          padding-bottom 4px

          &:first-child
            margin-right 40px

          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774

    .login_content
      > form
        > div
          display none

          &.on
            display block

          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial

            &:focus
              border 1px solid #02a774

          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent

              &.right_number
                color black

          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s, border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)

              &.off
                background #fff

                .switch_text
                  float right
                  color #ddd

              &.on
                background #02a774

              > .switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                transition transform .3s

                &.right
                  transform translateX(27px)

          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            > a
              color #02a774

        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0

      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999

    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px

      > .iconfont
        font-size 20px
        color #999
</style>
