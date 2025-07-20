// src/stores/auth.js
import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
    
  }),
  actions: {
    // 登录方法
    async signIn(email, password) {
     
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        }, { disableEmailConfirmation: true  })
        
        if (error) {
          this.error = error.message
          return { error }
        }
         Cookies.set('user', JSON.stringify(data.user), { expires: 7 })
        this.user = data.user
        return { data }
      } catch (err) {
        this.error = '登录请求失败'
        console.error(err)
        return { error: err }
      } 
    },
    
    // 登出方法
    async signOut() {
      this.loading = true
      try {
        const { error } = await supabase.auth.signOut()
        if (error) {
          this.error = error.message
        } else {
          Cookies.remove('user')
          this.user = null
        
        }
      } catch (err) {
        this.error = '登出失败'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    // 检查用户会话（用于页面加载时）
    async checkSession() {
      const { data: { user } } = await supabase.auth.getUser()
      this.user = user
    },

    // 新增：更新用户密码
    async updateUser({ password }, { currentPassword }) {
      this.loading = true
      this.error = null

      try {
        // 简化版：直接调用 Supabase 更新密码 API
        const { error } = await supabase.auth.updateUser({
          password: password
        }, {
          currentPassword: currentPassword
        })

        if (error) {
          this.error = error.message
          console.error('更新密码失败:', error)
          return { error }
        }

        // 更新成功
        this.error = null
        return { data: { user: this.user } }
      } catch (err) {
        this.error = '更新密码时发生错误'
        console.error('更新密码异常:', err)
        return { error: err }
      } finally {
        this.loading = false
      }
    },


    
    // 路由跳转
    redirectToDashboard() {
      const router = useRouter()
      router.push('/dashboard')
    },
    redirectToLogin() {
      const router = useRouter()
      router.push('/login')
    },
    init() {
      const user = Cookies.get('user')
      if (user) {
        this.user = JSON.parse(user)
      }
    }  
  },
  persist: true // 启用本地存储，保持会话状态
})