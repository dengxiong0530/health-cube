// src/lib/auth.js
import { supabase } from '@/utils/supabase'

// 发送验证码到邮箱
export const sendResetCode = async (email) => {
  try {
    // 使用 supabase.functions.invoke 调用函数
    const { data, error } = await supabase.functions.invoke(
      'send-password-reset-email', // 函数名称
      {
        body: { email } // 传递参数（自动序列化为JSON）
      }
    )

    if (error) throw error
    return { success: true, message: data.message }
  } catch (error) {
    console.error('发送验证码失败:', error)
    return { 
      success: false, 
      message: error.message || '发送验证码失败，请稍后重试' 
    }
  }
}

// 验证验证码并重置密码
export const verifyCodeAndResetPassword = async (email, code, newPassword) => {
  try {
    // 验证验证码
    const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
      'verify-reset-code',
      { body: { email, code } }
    )
    if (verifyError) throw verifyError
    if (!verifyData.valid) throw new Error('The verification code is incorrect or has expired.')

    // 更新密码
    const { data: updateData, error: updateError } = await supabase.functions.invoke(
      'update-password',
      { body: { userId: verifyData.userId, newPassword } }
    )
    if (updateError) throw updateError

    return { success: true }
  } catch (error) {
    console.error('The password reset has failed.:', error)
    return { 
      success: false, 
      message: error.message || 'The password reset has failed.' 
    }
  }
}