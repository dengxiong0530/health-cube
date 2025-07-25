import { supabase } from '@/utils/supabase';
import { round } from '@/utils/common'

/**
 * 插入或更新用户体重数据
 * @param {Object} data 包含user_id, day和weight的对象
 * @returns {Object} 操作结果
 */
export const upsertUserWeight = async (data) => {
  try {
    const { error } = await supabase
      .from('user_weight_day')
      .upsert(
        { user_id:data.user_id,
          day:data.day,
          weight: round(data.weight,2) 
        }
        , 
        
        { 
        onConflict: 'user_id, day' // 当user_id和day组合存在时更新
      });
      
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error upserting user weight:', error);
    ElMessage.error(error.message || 'fail to save')
    return { success: false, error };
  }
};

/**
 * 根据user_id和日期范围查询体重数据
 * @param {string} userId 用户ID
 * @param {string} startDay 开始日期（包含）
 * @param {string} endDay 结束日期（包含）
 * @returns {Array} 包含多条day和weight的对象数组
 */
export const getUserWeightByDateRange = async (userId, startDay, endDay) => {
  try {
    const { data, error } = await supabase
      .from('user_weight_day')
      .select('day, weight')
      .eq('user_id', userId)
      .gte('day', startDay) // 大于等于开始日期
      .lte('day', endDay)  // 小于等于结束日期
      .order('day', { ascending: true }); // 按日期升序排列
      
    if (error) throw error;
    return data || []; // 如果没有数据，返回空数组
  } catch (error) {
    console.error('Error fetching user weight range:', error);
    return [];
  }
};

