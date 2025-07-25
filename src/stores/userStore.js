import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabase'
import { round } from '@/utils/common'



export const useUserStore = defineStore('user', () => {
    const userInfoStore = ref(null)
    const loading = ref(true);

    const fetchUserInfo = async (userId, forceRefresh = false) => {

        // if (!forceRefresh && userInfoStore.value) {
        //     console.log('Using cached user data');
        //     return userInfoStore.value;
        // }



        loading.value = true;

        try {
            const { data, error } = await supabase
                .from('user_info')
                .select('*')
                .eq('user_id', userId)
                .single()

            if (error) {
                if (error.code === 'PGRST116') {
                    // 记录不存在

                } else {
                    throw error
                }
            }

            if (error) throw error
            userInfoStore.value = data
            return data
        } catch (error) {
            console.error('Failed to obtain user information', error)

            ElMessage.error('Failed to obtain user information,Please try again later.')
            return null
        } finally {
            loading.value = false;
        }
    }
    const upsetUserInfo = async (data, userId) => {
        loading.value = true;

        try {

            userInfoStore.value = data
            const currentDate = new Date().toISOString()
            const { error } = await supabase
                .from('user_info')
                .upsert(
                    {
                        user_id: userId,
                        age: round(data.value.age, 0),
                        gender: data.value.gender,
                        height: round(data.value.height, 1),
                        weight: round(data.value.weight, 1),
                        waist: round(data.value.waist, 1),
                        hip: round(data.value.hip, 1),
                        neck: round(data.value.neck, 1),
                        updated_at: currentDate
                    },
                    { onConflict: 'user_id' }
                )
                .select() // 返回更新后的数据（可选）

            if (error) {
                throw error
            }

            ElMessage.success('save successfully')
        } catch (error) {
            console.error('fail to save:', error)
            ElMessage.error(error.message || 'fail to save')
        } finally {
            // cancelEditing()
            loading.value = false;
        }
    }


    const updateWeight = async (weight, userId) => {
        loading.value = true;

        try {


            const currentDate = new Date().toISOString()
            const { error } = await supabase
                .from('user_info')
                .update(
                    {
                    
                        weight: round(weight, 1),
                        updated_at: currentDate
                    }
                ).eq('user_id', userId) 
              

            if (error) {
                throw error
            }

            ElMessage.success('save successfully')
        } catch (error) {
            console.error('fail to save:', error)
            ElMessage.error(error.message || 'fail to save')
        } finally {
            // cancelEditing()
            loading.value = false;
        }



    }
    const useUserInfoStore = () => {
        return computed(() => userInfoStore.value);
    };

    return {
        userInfoStore,
        fetchUserInfo,
        upsetUserInfo,
        updateWeight,
        useUserInfoStore

    }
})  