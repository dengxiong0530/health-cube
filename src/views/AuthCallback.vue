<template>
  <div class="callback-container">
    <h2>Logging in is in progress...</h2>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'

const error = ref('')
const router = useRouter()

onMounted(async () => {
  // 处理登录回调
  const { data, error: authError } = await supabase.auth.getSession()
  
  if (authError) {
    error.value = `Login failed: ${authError.message}`
    return
  }
  
  if (data.session) {
    // 登录成功，获取用户信息
    const user = data.session.user
    // console.log('Login successful. User information:', user)
    
    // 可以在这里保存用户信息到全局状态
    
    // 重定向到首页或之前的页面
    router.push('/settings')

  } else {
    error.value = 'The login process was not completed. Please try again.'
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
</style>
