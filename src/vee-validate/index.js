import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)


VeeValidate.Validator.localize('zh_CN', {
    //messages: zh_CN.messages,
    messages: {required: (field) =>  field+'不能为空'},
    attributes: {
        phone: '手机号',
        captcha: '验证码',
        pwd: '密码',
        username: '用户名',
        yanzhengma: '验证码',
    }
})


VeeValidate.Validator.extend('phone', {
    validate: value => {
        return /^1\d{10}$/.test(value)
    },
    getMessage: field => field + '必须是11位手机号码'
})
VeeValidate.Validator.extend('captcha', {
    validate: value => {
        return /^\d{6}$/.test(value)
    },
    getMessage: field => field + '必须是6位数字'
})

VeeValidate.Validator.extend('yanzhengma', {
    validate: value => {
        return /^\w{4}$/.test(value)
    },
    getMessage: field => field + '必须是4位'
})

VeeValidate.Validator.extend('username', {
    validate: value => {
        return /^\w{5}/.test(value)
    },
    getMessage: field => field + '必须是6位数字'
})