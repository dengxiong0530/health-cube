import { supabase } from '@/utils/supabase';
import { round } from '@/utils/common'

/**
 * Upsert user weight data
 * @param {Object} data Weight data object
 * @returns {Object} Operation result
 */
export const upsertUserWeight = async (data) => {
  try {
    const { error } = await supabase
      .from('user_weight_day')
      .upsert(
        {
          user_id: data.user_id,
          day: data.day,
          weight: round(data.weight, 2) 
        }
        , 
        {
          onConflict: 'user_id, day' // Update when user_id and day combination exists
        });
      
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error upserting user weight:', error);
    ElMessage.error(error.message || 'Failed to save weight data');
    return { success: false, error };
  }
};

/**
 * Query weight data by user ID and date range
 * @param {string} userId User ID
 * @param {string} startDay Start date (inclusive)
 * @param {string} endDay End date (inclusive)
 * @returns {Array} Array of objects containing day and weight
 */
export const getUserWeightByDateRange = async (userId, startDay, endDay) => {
  try {
    const { data, error } = await supabase
      .from('user_weight_day')
      .select('day, weight')
      .eq('user_id', userId)
      .gte('day', startDay) // Greater than or equal to start date
      .lte('day', endDay)  // Less than or equal to end date
      .order('day', { ascending: true }); // Order by date ascending
      
    if (error) throw error;
    return data || []; // Return empty array if no data
  } catch (error) {
    console.error('Error fetching user weight range:', error);
    return [];
  }
};

