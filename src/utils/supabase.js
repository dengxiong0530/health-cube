// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// 从环境变量获取（也可直接填写）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)