<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2 class="auth-title">Forgot Password</h2>
        <p class="auth-desc">Please enter your registered email address. We will send the verification code to this email.</p>
      </div>

      <el-form 
        ref="formRef" 
        :model="form" 
        :rules="rules" 
        class="auth-form"
      >
        <el-form-item prop="email">
          <el-input 
            v-model="form.email" 
            placeholder="Your e-mail address" 
            type="email"
            prefix-icon="Message"
            class="auth-input"
          ></el-input>
    
           
        </el-form-item>

        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleSendCode"
            :loading="loading"
            class="auth-btn"
          >
            <template #loading>
              <el-icon><Loading /></el-icon>
              <span>Sending...</span>
            </template>
            Reset my Password
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 消息提示 -->
      <el-alert 
        v-if="message" 
        :message="message" 
        :type="messageType" 
        show-icon 
        class="auth-alert"
        :closable="true"
        @close="message = ''"
      ></el-alert>

      <div class="auth-footer">
        <span>Do you remember the password?</span>
        <el-link @click="$router.push('/login')" class="auth-link">Sign in</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import { Message, Loading } from '@element-plus/icons-vue'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const message = ref('')
const messageType = ref('success')

const form = reactive({
  email: ''
})

const rules = {
  email: [
    { required: true, message: 'Please enter your email address.', trigger: 'blur' },
    { type: 'email', message: 'Please enter the correct email format.', trigger: 'blur' }
  ]
}

const handleSendCode = async () => {
  try {
    await formRef.value.validate()
    loading.value = true
    message.value = ''
    
    // 调用Supabase函数发送验证码
    const { data, error } = await supabase.functions.invoke(
      'send-password-reset-email',
      { body: { email: form.email } }
    )

    if (error) throw error
    
    messageType.value = 'success'
    message.value = '验证码已发送，请注意查收邮件（15分钟内有效）'
    
    // 3秒后跳转到验证码页面
    setTimeout(() => {
      router.push({ 
        path: '/reset-password',
        query: { email: form.email } // 传递邮箱参数
      })
    }, 3000)
    
  } catch (err) {
    messageType.value = 'error'
    message.value = 'The email sending failed. Please ensure that the email address you entered is correct.'
    console.log(message.value)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf1 100%);
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 30px 40px;
  transition: transform 0.3s ease;
}

.auth-card:hover {
  transform: translateY(-5px);
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-title {
  font-size: 24px;
  font-weight: 600;
  color: #1d2129;
  margin-bottom: 8px;
}

.auth-desc {
  color: #86909c;
  font-size: 14px;
}

.auth-form {
  margin-bottom: 20px;
}

.auth-input {
  height: 50px;
  border-radius: 8px;
  border-color: #e5e6eb;
  transition: all 0.3s;
}

.auth-input:focus {
  border-color: #4096ff;
  box-shadow: 0 0 0 2px rgba(64, 150, 255, 0.2);
}

.auth-btn {
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
  background: #4096ff;
  border: none;
  transition: background 0.3s;
}

.auth-btn:hover {
  background: #1677ff;
}

.auth-alert {
  margin-bottom: 20px;
  /* animation: fadeIn 0.3s ease; */
    text-align: center;
  font-size: 14px;
  color: #86909c;
}

.auth-footer {
  text-align: center;
  font-size: 14px;
  color: #86909c;
}

.auth-link {
  color: #4096ff;
  margin-left: 5px;
  transition: color 0.2s;
}

.auth-link:hover {
  color: #1677ff;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>