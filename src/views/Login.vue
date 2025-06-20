<template>

     <div class="signinform">
        <!-- <h1>Service Login Form</h1> -->
        <!-- container -->
        <div class="container">
            <!-- main content -->
            <div id="div-login" class="w3l-form-info" v-show="isVisible">  
                <div class="w3_info">
                    <h2>Login</h2>
                    <!-- <el-form action="#" method="post" ref="loginRef" :model="loginForm"> -->
                    <el-form  ref="loginRef" :model="loginForm" :rules="loginRules">
                        <div class="input-group">
                            <span><i class="fa fa-user" aria-hidden="true"></i></span>
                            <input type="email" placeholder="Email" required=""  v-model="loginForm.email">
                        </div>
                        <div class="input-group">
                            <span><i class="fa fa-key" aria-hidden="true"></i></span>
                            <input type="Password" placeholder="Password" required="" v-model="loginForm.password">
                        </div>
                        <div class="form-row bottom">
                            <div class="form-check">
                                <input type="checkbox" id="remenber" name="remenber" value="remenber" v-model="loginForm.remember">
                                <label for="remenber"> Remember me?</label>
                            </div>
                            <a href="#url" class="forgot">Forgot password?</a>
                        </div>
                        <button class="btn btn-primary btn-block" type="submit"  :loading="loading"  @click="handleLogin" >Login</button>
                    </el-form>
                    <p class="continue"><span></span></p>

                    <p class="account">Don't have an account? <a @click="handleSignUp">Sign up</a></p>
                </div>
            </div>
            <!-- //main content -->

       <div id="div-sign-up" class="w3l-form-info" v-show="!isVisible">
            <div  class="w3_info" >
                <h2>Sign Up</h2>
                <form action="#" method="post">
                    <div class="input-group">
                       
                        <span><i class="fa  fa-envelope" aria-hidden="true"></i></span>
                        <input type="email" placeholder="Email" required="">
                    </div>
                    <div class="input-group">
                        <span><i class="fa fa-key" aria-hidden="true"></i></span>
                        <input type="Password" placeholder="Password" required="">
                    </div>

                    <div class="input-group">
                        <span><i class="fa fa-key" aria-hidden="true"></i></span>
                        <input type="Password" placeholder="Confirm Password" required="">
                    </div>
         
                    <div class="form-row bottom">
                        <a href="#url" class="forgot">Forgot password?</a>
                    </div>
                    <button class="btn btn-primary btn-block" type="submit">Create account</button>
                </form>
                <p class="continue"><span></span></p>

                <!-- <p class="account">Don't have an account? <a @click="handleSignUp">Login</a></p> -->
            </div>
            </div>
        </div>
       
      
    </div>
 
</template>

<script setup>
import { computed, ref,getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import Cookies from "js-cookie"

const userStore = useUserStore()
const { proxy } = getCurrentInstance()
const isVisible = ref(true)  
const loading = ref(false)
const open = ref(false)

const loginForm = ref({
  // username: "admin",
  // password: "admin123",
  rememberMe: false,
  code: "",
  uuid: ""
})

const loginRules = {
  email: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }]
}


function handleLogin() {
  proxy.$refs.loginRef.validate(valid => {
    if (valid) {
      loading.value = true
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set("email", loginForm.value.username, { expires: 30 })
        Cookies.set("password", encrypt(loginForm.value.password), { expires: 30 })
        Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 })
      } else {
        // 否则移除
        Cookies.remove("email")
        Cookies.remove("password")
        Cookies.remove("rememberMe")
      }

      console.log("登录表单数据:", loginForm)
      // 调用action的登录方法
    //   userStore.login(loginForm.value).then(() => {
    //     const query = route.query
    //     const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
    //       if (cur !== "redirect") {
    //         acc[cur] = query[cur]
    //       }
    //       return acc
    //     }, {})
    //     router.push({ path: redirect.value || "/", query: otherQueryParams })
    //   }).catch(() => {
    //     loading.value = false
     
    //   })
    }
  })
}


function handleSignUp() {
   open.value = true
   isVisible.value = false
}

</script>

<style scoped>

* {
    box-sizing: border-box;
    font-family: 'Kumbh Sans', sans-serif;
}


img {
    max-width: 100%;
}

/*-- //Reset-Code --*/

/*-- form styling --*/
.signinform {
    padding: 40px 40px;
    justify-content: center;
    display: grid;
    /* grid-template-rows: 1fr auto 1fr; */
    align-items: center;
    /* min-height: 10vh; */
    background: #f5f5f5;
    margin-top: 100px;
}

input[type="text"],
input[type="email"],
input[type="Password"] {
    font-size: 17px;
    font-weight: 500;
    color: #999;
    text-align: left;
    padding: 14px 15px 12px 35px;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    border: none;
    outline: none;
    background: transparent;
    letter-spacing: .5px;
}

.input-group {
    margin-bottom: 25px;
    padding: 0px 0px;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
}

.btn-block {
    display: block;
    width: 50%;
    margin: 0 auto;
}

.btn:active {
    outline: none;
}

.btn-primary {
    color: #fff;
    background-color: #9146ff;
    margin-top: 30px;
    outline: none;
    width: 100%;
    padding: 15px 15px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    border-radius: 6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    -ms-border-radius: 6px;
    -o-border-radius: 6px;
    border: none;
    text-transform: capitalize;
}


.btn-primary:hover {
    background-color: #7d32eb;
    color: #fff;
}

.form-row.bottom {
    display: flex;
    justify-content: space-between;
}

.form-row .form-check input[type="checkbox"] {
    display: none;
}

.form-row .form-check input[type="checkbox"]+label:before {
    border-radius: 3px;
    border: 1px solid #e2e2e2;
    color: transparent;
    content: "\2714";
    display: inline-block;
    height: 18px;
    margin-right: 5px;
    transition: 0.2s;
    vertical-align: inherit;
    width: 18px;
    text-align: center;
    line-height: 20px;
}

.form-row .form-check input[type="checkbox"]:checked+label:before {
    background-color: #9146ff;
    border-color: #9146ff;
    color: #fff;
}

.form-row .form-check input[type="checkbox"]+label {
    cursor: pointer;
    color: #888;
}

.w3_info h2 {
    display: inline-block;
    font-size: 25px;
    line-height: 35px;
    margin-bottom: 20px;
    font-weight: 600;
    color: #3b3663;
}

.w3_info h4 {
    display: inline-block;
    font-size: 15px;
    padding: 8px 0px;
    color: #444;
    text-transform: capitalize;
}


a.btn.btn-block.btn-social.btn-facebook {
    display: block;
    width: 100%;
    padding: 10px 0px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
}

h1 {
    text-align: center;
    font-size: 40px;
    font-weight: 500;
    color: #3b3663;
}

.w3_info {
    box-sizing: border-box;
    padding: 3em 3.5em;
    width: 450px;
    background: #fff;
    box-shadow: 2px 9px 49px -17px rgba(0, 0, 0, 0.1);
}


.w3l-form-info {
    margin: 40px 0;
}


.w3_info p {
    padding-bottom: 30px;
    text-align: center;
}

p.account,
p.account a {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 0px;
    font-size: 16px;
    color: #888;
}

p.account a {
    color: #9146ff;
}

p.account a:hover {
    text-decoration: underline;
}

a.forgot {
    color: #3b3663;
    margin-top: 2px;
}

a.forgot:hover {
    text-decoration: underline;
}

h3.w3ls {
    margin: 10px 0px;
    padding-left: 60px;
}

h3.agileits {
    padding-left: 10px;
}

.container {
    max-width: 890px;
    margin: 0 auto;
}

.input-group i.fa,
.input-group i.fas {
    font-size: 16px;
    vertical-align: middle;
    box-sizing: border-box;
    float: left;
    width: 6%;
    margin-top: 13px;
    text-align: center;
    color: #999;
    opacity: .5;
    position: absolute;
    left: 0;
}

/* h5 {
    text-align: center;
    margin: 10px 0px;
    font-size: 15px;
    font-weight: 600;
    color: #000;
} */

/* .footer p {
    text-align: center;
    font-size: 18px;
    line-height: 28px;
    color: #777;
}

.footer p a {
    color: #9146ff;
}

.footer p a:hover {
    text-decoration: underline;
} */

p.continue {
    margin-top: 25px;
    padding: 0;
    margin-bottom: 20px;
    color: #999;
    opacity: .8;
}

p.continue span {
    position: relative;
}

p.continue span:before {
    position: absolute;
    content: '';
    height: 1px;
    background: #999;
    width: 89%;
    left: -100%;
    top: 5px;
    opacity: .5;
}

p.continue span:after {
    position: absolute;
    content: '';
    height: 1px;
    background: #999;
    width: 89%;
    right: -100%;
    top: 5px;
    opacity: .5;
}

.social-login {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    margin-bottom: 10px;
    justify-content: center;
}

.facebook {
    width: 46px;
    height: 46px;
    line-height: 46px;
    border-radius: 50%;
    text-align: center;
    font-size: 15px;
    color: #fff;
    background: #3b5998;
}

</style>