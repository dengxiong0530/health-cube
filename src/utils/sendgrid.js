import { supabase } from '@/utils/supabase'

// 调用Supabase Edge Function发送重置密码邮件
export const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    // 调用Edge Function
    const { data, error } = await supabase.functions.invoke(
      'send-password-reset-email',
      {
        body: JSON.stringify({ email, resetUrl })
      }
    )

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending password reset email:', error)
    return { 
      success: false, 
      error: error.message || '发送邮件失败'
    }
  }
}
