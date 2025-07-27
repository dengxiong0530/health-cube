<template>
  <div class="reset-container">
    <div class="reset-card">
      <div class="reset-header">
        <h2 class="reset-title">Reset password</h2>
        <p class="reset-desc">Please enter the verification code received in your email and set a new password.</p>
      </div>

      <el-form 
        ref="formRef" 
        :model="form" 
        :rules="rules" 
        class="reset-form"
      >
        <!-- 验证码输入框（6位数字拆分） -->
        <el-form-item prop="code" class="code-item">
          <div class="code-inputs">
            <el-input 
              v-for="(digit, index) in 6" 
              :key="index"
              v-model="form.code[index]"
              type="text"
              maxlength="1"
              @input="handleCodeInput(index)"
              @focus="handleCodeFocus(index)"
              :class="{'code-input': true, 'code-focused': focusedIndex === index}"
              autocomplete="off"
            ></el-input>
          </div>
          <div class="code-actions">
            <el-button 
              type="text" 
              @click="handleResendCode"
              :disabled="countdown > 0"
              class="resend-btn"
            >
              {{ countdown > 0 ? `Resend(${countdown}s)` : 'Resend' }}
            </el-button>
          </div>
        </el-form-item>

        <el-form-item prop="password">
          <el-input 
            v-model="form.password" 
            placeholder="Please set a new password." 
            type="password"
            show-password
            prefix-icon="Lock"
            class="reset-input"
          ></el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input 
            v-model="form.confirmPassword" 
            placeholder="Please confirm the new password." 
            type="password"
            show-password
            prefix-icon="Check"
            class="reset-input"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleResetPassword"
            :loading="loading"
            :disabled="loading"
            class="reset-btn"
          >
            <template #loading>
              <el-icon><Loading /></el-icon>
              <span>Resetting...</span>
            </template>
            Confirm reset
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 消息提示 -->
      <el-alert 
        v-if="message" 
        :message="message" 
        :title="message"
        :type="messageType" 
        show-icon 
        class="reset-alert"
        :closable="true"
        @close="message = ''"
      ></el-alert>

      <div class="reset-footer">
        <el-link @click="$router.push('/forgot-password')" class="back-link">Go back to the previous step</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/utils/supabase'
import { Lock, Check, Loading } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const formRef = ref(null)
const loading = ref(false)
const message = ref('')
const messageType = ref('success')
const focusedIndex = ref(-1)
const countdown = ref(0)

// 验证码拆分到数组，方便单个输入框控制
const form = reactive({
  code: Array(6).fill(''),
  password: '',
  confirmPassword: ''
})

// 从URL获取邮箱参数
const email = ref(route.query.email || '')

const rules = {
  code: [
    { 
      validator: (rule, value, callback) => {
        if (form.code.join('').length < 6) {
          callback(new Error('Please enter the complete 6 - digit verification code.'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: 'Please set a new password.', trigger: 'blur' },
    { min: 8, message: 'The password length should not be less than 8 characters.', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm the password.', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error('The passwords entered twice do not match.'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 验证码输入处理
const handleCodeInput = (index) => {
  // 自动聚焦到下一个输入框
  if (form.code[index] && index < 5) {
    const nextInput = document.querySelectorAll('.code-input')[index + 1]
    nextInput?.focus()
  }
}

const handleCodeFocus = (index) => {
  focusedIndex.value = index
}

// 重新发送验证码
const handleResendCode = async () => {
  try {
    if (!email.value) {
      message.value = 'Email information is missing. Please go back to the previous step.'
      messageType.value = 'error'
      return
    }

    const { error } = await supabase.functions.invoke(
      'send-password-reset-email',
      { body: { email: email.value } }
    )

    if (error) throw error
    
    messageType.value = 'success'
    message.value = 'The verification code has been resent.'
    startCountdown() // 开始倒计时
  } catch (err) {
    messageType.value = 'error'
    message.value = err.message || 'The sending failed. Please try again.'
  }
}

// 倒计时逻辑
const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// 确认重置密码
const handleResetPassword = async () => {
  try {
    await formRef.value.validate()
    loading.value = true
    message.value = ''

    const code = form.code.join('') // 拼接6位验证码
    
    // 1. 验证验证码
    const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
      'verify-reset-code',
      { body: { email: email.value, code } }
    )

    if (verifyError) throw verifyError
    if (!verifyData.valid) throw new Error('The verification code is incorrect or has expired.')

    // 2. 更新密码
    const { error: updateError } = await supabase.functions.invoke(
      'update-password',
      { body: { userId: verifyData.userId, newPassword: form.password } }
    )

    if (updateError) throw updateError

    messageType.value = 'success'
    message.value = 'Password reset was successful. You will be redirected to the login page shortly.'
    
    setTimeout(() => {
      router.push('/login')
    }, 2000)
    
  } catch (err) {
    messageType.value = 'error'
    message.value = err.message || 'Reset failed. Please try again.'
  } finally {
    loading.value = false
  }
}

const handlePaste = (e) => {
  e.preventDefault();
  const pastedText = e.clipboardData.getData('text').trim();
  if (/^\d{6}$/.test(pastedText)) { // 验证是否为6位数字
    form.code = pastedText.split(''); // 拆分到数组
    // 自动聚焦到密码框
    setTimeout(() => {
      document.querySelector('.reset-input')?.focus();
    }, 300);
  }
};

// 页面加载时自动聚焦第一个验证码输入框
onMounted(() => {
  setTimeout(() => {
    const firstInput = document.querySelectorAll('.code-input')[0]
    firstInput?.focus()
  }, 300)
  startCountdown() // 初始化倒计时

  const codeContainer = document.querySelector('.code-inputs');
  codeContainer?.addEventListener('paste', handlePaste);
})
</script>

<style scoped>
.reset-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf1 100%);
  padding: 20px;
}

.reset-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 30px 40px;
  transition: transform 0.3s ease;
}

.reset-card:hover {
  transform: translateY(-5px);
}

.reset-header {
  text-align: center;
  margin-bottom: 30px;
}

.reset-title {
  font-size: 24px;
  font-weight: 600;
  color: #1d2129;
  margin-bottom: 8px;
}

.reset-desc {
  color: #86909c;
  font-size: 14px;
}

.code-item {
  margin-bottom: 25px;
}

.code-inputs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.code-input {
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  border-radius: 8px;
  border: 1px solid #e5e6eb;
  transition: all 0.2s;
}

.code-input:focus, .code-focused {
  border-color: #4096ff;
  box-shadow: 0 0 0 2px rgba(64, 150, 255, 0.2);
  outline: none;
}

.code-actions {
  text-align: right;
}

.resend-btn {
  color: #4096ff;
  font-size: 14px;
  padding: 0;
}

.resend-btn:disabled {
  color: #c9cdD4;
  cursor: not-allowed;
}

.reset-form {
  margin-bottom: 20px;
}

.reset-input {
  height: 50px;
  border-radius: 8px;
  border-color: #e5e6eb;
  transition: all 0.3s;
}

.reset-input:focus {
  border-color: #4096ff;
  box-shadow: 0 0 0 2px rgba(64, 150, 255, 0.2);
}

.reset-btn {
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
  background: #4096ff;
  border: none;
  transition: background 0.3s;
}

.reset-btn:hover {
  background: #1677ff;
}

.reset-alert {
  margin-bottom: 20px;
  animation: fadeIn 0.3s ease;
}

.reset-footer {
  text-align: center;
  margin-top: 10px;
}

.back-link {
  color: #4096ff;
  transition: color 0.2s;
}

.back-link:hover {
  color: #1677ff;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>