<template>
    <div class="user-profile-container">
        <!-- 信息卡片 -->
        <el-card class="profile-card" shadow="hover">

            <h3 class="card-title">Personal Details</h3>
            <!-- 查看模式 -->
            <div v-if="!isEditing" class="profile-view">
                <div class="info-row" v-for="(value, key) in userInfo" :key="key">
                    <span class="label">{{ formatLabel(key) }}:</span>
                    <span class="value">{{ formatValue(value) }}</span>
                </div>

                <!-- 信息缺失提示 -->
                <div v-if="hasMissingInfo" class="missing-info-tip">
                    <el-alert title="Please complete your personal information." type="warning" show-icon
                        effect="light" />
                </div>
            </div>

            <!-- 编辑模式 -->
            <el-form v-else :model="userInfo" ref="editFormRef" label-width="100px" class="profile-form">
                <el-form-item label="Height(cm)" prop="height">
                    <el-input-number v-model.number="userInfo.height" placeholder="Please enter your height(cm)."
                        :min="80" :max="300"></el-input-number>
                </el-form-item>
                <el-form-item label="Age" prop="age">
                    <el-input-number v-model.number="userInfo.age" placeholder="Please enter your age." :min="18"
                        :max="120"></el-input-number>
                </el-form-item>
                <el-form-item label="Weight(kg)" prop="weight">
                    <el-input-number v-model.number="userInfo.weight" placeholder="Please enter your weight (kg)."
                        :min="10" :max="500"></el-input-number>
                </el-form-item>
                <el-form-item label="Gender" prop="gender">
                    <el-radio-group v-model="userInfo.gender">
                        <el-radio :value="1">Female</el-radio>
                        <el-radio :value="2">Male</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="saveUserInfo">
                        {{ isLoading ? 'Loading...' : 'Save' }}
                    </el-button>
                    <!-- <el-button @click="cancelEditing">Cancel</el-button> -->
                </el-form-item>
            </el-form>

            <div class="div-card-footer">
                <el-button v-if="!isEditing" type="primary" link icon="Edit" @click="startEditing" class="float-right">
                    Edit
                </el-button>
                <el-button v-else icon="Close" type="primary" link @click="cancelEditing" class="float-right">
                    Cancel
                </el-button>
            </div>

        </el-card>
    </div>
</template>
<style scoped>
.div-card-footer {
    margin-bottom: 50px;

}

.user-profile-container {

    /* margin: 20px auto; */
    /* padding: 0 15px; */

}

.card-title {
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 30px;
}


.info-row {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.label {
    width: 100px;
    /* line-height: 24px; */
    color: #999;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0px;
}

.value {
    background-color: #409eff;
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
}
</style>


<script setup>

import { ref, computed, onMounted, reactive } from 'vue'
// import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/utils/supabase'

const authStore = useAuthStore()
const userId = authStore.user.id

// 表单引用
const editFormRef = ref(null)
// const router = useRouter()

// 用户信息状态
const userInfo = ref({
    height: null,
    age: null,
    weight: null,
    gender: null
})

// 编辑状态
const isEditing = ref(false)

// 检查是否有缺失的信息
const hasMissingInfo = computed(() => {
    return !userInfo.value.height ||
        !userInfo.value.age ||
        !userInfo.value.weight ||
        !userInfo.value.gender
})

// 格式化标签显示
const formatLabel = (key) => {
    const labels = {
        height: 'Height(cm)',
        age: 'Age',
        weight: 'Weight(kg)',
        gender: 'Gender'
    }
    return labels[key] || key
}

// 格式化值显示
const formatValue = (value) => {
    if (value === null || value === undefined || value === '') {
        return 'Not set up'
    }

    // if (['Height', 'Weight'].includes(value)) {
    //     return `${value}cm`
    // }

    if (value === 1) {
        return 'Female'
    }

    if (value === 2) {
        return 'Male'
    }

    return value
}

// 生命周期钩子：页面加载时获取用户信息
onMounted(() => {
    fetchUserInfo()
})

// 模拟获取用户信息
const fetchUserInfo = async () => {

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
        } else {
             userInfo.value.height = data.height;
             userInfo.value.age = data.age;
             userInfo.value.gender = data.gender;
             userInfo.value.weight = data.weight;
        }
    } catch (error) {
        console.error('Failed to obtain user information', error)
        
        ElMessage.error('Failed to obtain user information,Please try again later.')
    }
}

// 开始编辑
const startEditing = () => {
    // console.log(fetchUserInfo.data)
    isEditing.value = true
}

// 取消编辑
const cancelEditing = () => {
    // 重置为原始数据
    fetchUserInfo()
    isEditing.value = false
}

// 保存用户信息
const saveUserInfo = () => {
    // 表单验证
    editFormRef.value?.validate((valid) => {
        if (valid) {
            submitForm()
        } else {
            ElMessage.error('Please fill in all the information completely.')
            return false
        }
    })
}

const isLoading = ref(false)


const submitForm = async () => {
    isLoading.value = true

    try {

        const currentDate = new Date().toISOString()
        const { error } = await supabase
            .from('user_info')
            .upsert(
                {
                    user_id: userId,
                    age: userInfo.value.age,
                    gender: userInfo.value.gender,
                    height: userInfo.value.height,
                    weight: userInfo.value.weight,
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
        isLoading.value = false
        cancelEditing()
    }
}


</script>
