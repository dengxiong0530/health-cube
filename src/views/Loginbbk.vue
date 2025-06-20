<template>
  <div class="login-container">
    <div class="login-card">
      <!-- 登录/注册切换选项卡 -->
      <div class="tabs">
        <div 
          class="tab-item" 
          :class="{ active: currentTab === 'login' }"
          @click="currentTab = 'login'"
        >
          登录
        </div>
        <div 
          class="tab-item" 
          :class="{ active: currentTab === 'register' }"
          @click="currentTab = 'register'"
        >
          注册
        </div>
      </div>
      
      <!-- 登录表单 -->
      <el-form 
        v-if="currentTab === 'login'" 
        :model="loginForm" 
        :rules="loginRules" 
        ref="loginFormRef"
        class="form-container"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input 
            v-model="loginForm.email" 
            prefix-icon="el-icon-email"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="loginForm.password" 
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            class="w-full"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
        
        <div class="text-center">
          <el-link type="primary" @click="currentTab = 'register'">
            还没有账号？立即注册
          </el-link>
        </div>
      </el-form>
      
      <!-- 注册表单 -->
      <el-form 
        v-else 
        :model="registerForm" 
        :rules="registerRules" 
        ref="registerFormRef"
        class="form-container"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input 
            v-model="registerForm.email" 
            prefix-icon="el-icon-email"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="registerForm.password" 
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input 
            v-model="registerForm.confirmPassword" 
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请再次输入密码"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            class="w-full"
            @click="handleRegister"
          >
            注册
          </el-button>
        </el-form-item>
        
        <div class="text-center">
          <el-link type="primary" @click="currentTab = 'login'">
            已有账号？立即登录
          </el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 路由实例
const router = useRouter()

// 状态管理
const currentTab = ref('login')
const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const loginFormRef = ref(null)
const registerFormRef = ref(null)

// 表单验证规则
const loginRules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
})

const registerRules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: (rule, value) => {
        if (value !== registerForm.password) {
          return new Error('两次输入的密码不一致')
        }
        return true
      }, trigger: 'blur' }
  ]
})

// 登录处理
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      // 模拟登录请求
      simulateLogin(loginForm.email, loginForm.password)
        .then(() => {
          ElMessage.success('登录成功')
          router.push('/home')
        })
        .catch(error => {
          ElMessage.error(error.message || '登录失败，请重试')
        })
    }
  })
}

// 注册处理
const handleRegister = () => {
  registerFormRef.value.validate((valid) => {
    if (valid) {
      // 模拟注册请求
      simulateRegister(registerForm.email, registerForm.password)
        .then(() => {
          ElMessage.success('注册成功，请登录')
          currentTab.value = 'login'
        })
        .catch(error => {
          ElMessage.error(error.message || '注册失败，请重试')
        })
    }
  })
}

// 模拟API请求
const simulateLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟验证逻辑
      if (email && password) {
        // 保存用户状态到本地存储
        localStorage.setItem('user', JSON.stringify({ email, token: 'mock_token_' + Date.now() }))
        resolve()
      } else {
        reject(new Error('邮箱或密码不正确'))
      }
    }, 1000)
  })
}

const simulateRegister = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟注册逻辑
      if (email && password) {
        resolve()
      } else {
        reject(new Error('注册失败，请检查信息'))
      }
    }, 1500)
  })
}

// 检查用户状态
onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    router.push('/home')
  }
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ebeef5;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 16px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-item.active {
  color: #409eff;
  font-weight: 600;
  border-bottom: 2px solid #409eff;
}

.form-container {
  padding: 30px;
}
</style>    