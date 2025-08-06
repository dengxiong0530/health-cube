<template>
  <div class="callback-container">
    <h2>Logging in is in progress...</h2>
    <p v-if="error">{{ error }}</p>
    <div v-else class="spinner"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const error = ref('')
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  try {
    // 处理登录回调
    const { data, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      error.value = `Login failed: ${authError.message}`
      return
    }
    
    if (data.session) {
      // 登录成功，更新authStore中的用户信息
      authStore.user = data.session.user
      
      // 重定向到设置页面
      router.push('/settings')
    } else {
      error.value = 'The login process was not completed. Please try again.'
    }
  } catch (err) {
    console.error('Error during authentication callback:', err)
    error.value = 'An unexpected error occurred during login.'
  }
})
</script>

<style scoped>
.callback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #9146ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
