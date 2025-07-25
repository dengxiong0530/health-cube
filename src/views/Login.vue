<template>

     <div class="signinform">
        <!-- <h1>Service Login Form</h1> -->
        <!-- container -->
        <div class="container">
            <!-- main content -->
            <div id="div-login" class="w3l-form-info" v-show="isVisible">  
                <div class="w3_info">
                    <h2>Sign in</h2>
                    <!-- <el-form action="#" method="post" ref="loginRef" :model="loginForm"> -->
                    <el-form  ref="loginRef" :model="loginForm" @submit.prevent="handleLogin">
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
                                <input type="checkbox" id="remenber" name="remenber" value="remenber" v-model="loginForm.rememberMe">
                                <label for="remenber"> Remember me?</label>
                            </div>
                            <!-- <a href="#url" class="forgot">Forgot password?</a> -->
                             <router-link  class="forgot" to="/forgot-password"  >Forgot password?</router-link>
                        </div>
                        <button class="btn btn-primary btn-block" type="submit"   v-loading="loading"  >Sign in</button>
                    
                    </el-form>
                    <!-- <p class="continue"><span></span></p> -->

                    <p class="account">Don't have an account? <a @click="clickSignUp">Sign up</a></p>
                </div>
            </div>
            <!-- //main content -->

       <div id="div-sign-up" class="w3l-form-info" v-show="!isVisible">
            <div  class="w3_info" >
                <h2>Sign Up</h2>
                <el-form  :model="signUpForm"   @submit.prevent="handleSignUp">
                    <div class="input-group">
                       
                        <span><i class="fa  fa-envelope" aria-hidden="true"></i></span>
                        <input type="email" placeholder="Email" required=""  v-model="signUpForm.email">
                    </div>
                    <div class="input-group">
                        <span><i class="fa fa-key" aria-hidden="true"></i></span>
                        <input type="Password" placeholder="Password" required=""  v-model="signUpForm.password">
                    </div>

                    <div class="input-group">
                        <span><i class="fa fa-key" aria-hidden="true"></i></span>
                        <input type="Password" placeholder="Confirm Password" required="" v-model="signUpForm.password_confirm">
                        
                    </div>
         
                 
                    <button class="btn btn-primary btn-block" type="submit"  v-loading="signUploading" > Create account</button>
                </el-form>
                <!-- <p class="continue"><span></span></p> -->

                <p class="account">Already have an account?<a @click="toSignIn">Sign in</a></p>
              
      

            <!-- 已有账户链接 -->
            <!-- <div class="mt-6 text-center">
                <span class="text-gray-600">Already have an account?</span>
                <router-link to="/login" class="text-primary-600 hover:text-primary-800 ml-1 font-medium">Sign in</router-link>
            </div> -->


            </div>
            </div>
        </div>
       
      
    </div>
 
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/utils/supabase';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const authStore = useAuthStore()
const isVisible = ref(true)  
const loading = ref(false)
const open = ref(false)


const signUploading = ref(false);

const loginForm = reactive({
  email: '',
  password:'',
  rememberMe: false
})

const signUpForm = reactive({
  email: '',
  password:'',
  password_confirm:''
})


// 加密密钥（实际项目中应从环境变量获取）
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY


// 页面加载时检查是否有保存的凭证
onMounted(() => {
  const credentials = Cookies.get('remembered_credentials')
  if (credentials) {
    try {
      // 解密并解析凭证
      const bytes = CryptoJS.AES.decrypt(credentials, ENCRYPTION_KEY)
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      
      loginForm.email = decryptedData.email
      loginForm.password = decryptedData.password
      loginForm.rememberMe = true
    } catch (error) {
      console.error('Failed to decrypt credentials:', error)
      // 清除可能已损坏的凭证
      Cookies.remove('remembered_credentials')
    }
  }
})


const handleLogin = async () => {

  loading.value = true

  
  try {
 
    const result = await authStore.signIn(loginForm.email,loginForm.password)

    // console.log(result.data)
   
    if (result.error) {
      loginMessage(result.error.message,'error')
    //   console.error('登录失败:', error)
    } else {


          if (loginForm.rememberMe) {
        // 加密并存储凭证到 Cookie
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify({
            email: loginForm.email,
            password: loginForm.password
          }),
          ENCRYPTION_KEY
        ).toString()
        
        Cookies.set('remembered_credentials', encryptedData, { expires: 30 })
      } else {
        // 清除已保存的凭证
        Cookies.remove('remembered_credentials')
      }


      // 登录成功，跳转到Dashboard页面
    //   console.log('登录成功:', result.data)
      router.push('/dashboard')
      loginMessage('sign in success','success')
    }

  } catch (error) {
    // error.value = '登录失败，请重试'
    console.error('sigin error:', error)
    loginMessage(error,'error')
  } finally {
    loading.value = false
  }
}

function clickSignUp() {
   open.value = true
   isVisible.value = false
}

function toSignIn(){
   open.value = false
   isVisible.value = true
}

// 表单验证
const validateForm = () => {
  let isValid = true;
  
  // 验证确认密码
  if (signUpForm.password !== signUpForm.password_confirm) {
    loginMessage('两次输入的密码不一致','error')
    isValid = false;
    return isValid;
  }

    if (signUpForm.password.length < 6) {
    loginMessage('Password should be at least 6 characters.','error')
    isValid = false;
    return isValid;
  }
   return isValid;
};

// 处理注册
const handleSignUp = async () => {
    // console.log(signUpForm)
  if (!validateForm()) {
    return;
  }
   
  
  signUploading.value = true;


  
  try {
    // 使用Supabase API注册用户并禁用邮箱验证
    const { error } = await supabase.auth.signUp({
      email: signUpForm.email,
      password: signUpForm.password,
    });
    if (error) {
      loginMessage(error,'error')
      throw error;
    }

    loginMessage('Registration successful! You can log in now.','success')
    // 注册成功后可以选择自动登录或跳转到登录页面
    setTimeout(() => {
      // 如果使用自动登录，可以在这里添加登录逻辑
      // 否则跳转到登录页面
      window.location.href = '/login';
    }, 2000);
    
  } catch (error) {
    console.error('sgin error:', error);
   
  } finally {
    signUploading.value = false;
  }
};




const loginMessage = (message,type) => {
  ElMessage({
    showClose: true,
    message: message,
    type: type,
    plain: true,
    duration: 6000,
    customClass: 'big-message',
  })
}

</script>

<style scoped>

.big-message {
  width: 400px; /* 设置你想要的宽度 */
  height: 200px; /* 设置你想要的高度 */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


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