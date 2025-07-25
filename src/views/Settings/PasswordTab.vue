<template>
    <div class="password-container">
      <!-- 密码修改表单 -->
      <form class="password-form" @submit.prevent="handleChangePassword">
        <div class="form-group">
          <label class="form-label">Current Password</label>
          <el-input
            v-model="currentPassword"
            type="password"
            placeholder="Please enter your current password."
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label class="form-label">New Password</label>
          <el-input
            v-model="newPassword"
            type="password"
            placeholder="Please enter a new password."
            class="form-input"
            :minlength="6"
            @input="validatePassword"
          />
          <p class="error-message" v-if="newPasswordError">{{ newPasswordError }}</p>
        </div>
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <el-input
            v-model="confirmPassword"
            type="password"
            placeholder="Please confirm the new password."
            class="form-input"
            @input="validateConfirmPassword"
          />
          <p class="error-message" v-if="confirmPasswordError">{{ confirmPasswordError }}</p>
        </div>
        <el-button
          type="primary"
          class="submit-btn"
          :disabled="!isFormValid" 
          native-type="submit"
          >Change Password</el-button
        >
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useAuthStore } from '@/stores/auth' // 引入 Pinia 的 auth Store
  
  const authStore = useAuthStore()
  
  // 表单数据
  const currentPassword = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')
  
  // 错误提示
  const newPasswordError = ref('')
  const confirmPasswordError = ref('')
  
  // 密码验证逻辑
  const validatePassword = () => {
    if (newPassword.value.length < 6) {
      newPasswordError.value = 'The new password should be at least 6 characters long.'
    } else {
      newPasswordError.value = ''
    }
  }
  
  const validateConfirmPassword = () => {
    if (confirmPassword.value!== newPassword.value) {
      confirmPasswordError.value = 'The passwords entered twice do not match.'
    } else {
      confirmPasswordError.value = ''
    }
  }
  
  // 表单整体校验
  const isFormValid = computed(() => {
    return (
      currentPassword.value.trim()!== '' &&
      newPassword.value.trim()!== '' &&
      confirmPassword.value.trim()!== '' &&
      newPasswordError.value === '' &&
      confirmPasswordError.value === ''
    )
  })
  
  // 提交修改密码
  const handleChangePassword = async () => {
    console.log(isFormValid.value,111111);
  if (!isFormValid.value) return

  try {
    const { error } = await authStore.updateUser(
      { password: newPassword.value },
      { currentPassword: currentPassword.value }
    )

    if (error) {
      // 显示错误提示
      ElMessage.error(error.message || '密码更新失败')
      return
    }

    // 更新成功
    ElMessage.success('密码已成功更新')
    
    // 清空表单
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    console.error('更新密码异常:', err)
    ElMessage.error('更新密码时发生异常')
  }
}
  </script>
  
  <style scoped>
  .password-container {
    padding: 24px;
  }
  .password-form {
    max-width: 500px;
  }
  .form-group {
    margin-bottom: 16px;
  }
  .form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
  .form-input {
    width: 100%;
  }
  .error-message {
    color: #ff4d4f;
    font-size: 12px;
    margin-top: 4px;
  }
  .submit-btn {
    margin-top: 8px;
  }
  </style>