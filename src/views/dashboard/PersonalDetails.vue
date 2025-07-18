<template>
    <div class="user-profile-container">
        <!-- 信息卡片 -->
        <el-card class="profile-card" shadow="hover">

            <h3 class="card-title">Personal Details</h3>
            <!-- 查看模式 -->
            <div v-if="!isEditing" class="profile-view">
                <div class="info-row" v-for="(value, key) in userInfo" :key="key">
                    <span class="label">{{ formatLabel(key) }}:</span>
                    <span class="value">{{ formatValue(key, value) }}</span>
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
                        :min="80" :max="300" :step="0.2"></el-input-number>
                </el-form-item>
                <el-form-item label="Age" prop="age">
                    <el-input-number v-model.number="userInfo.age" placeholder="Please enter your age." :min="18"
                        :max="120"></el-input-number>
                </el-form-item>
                <el-form-item label="Weight(kg)" prop="weight">
                    <el-input-number v-model.number="userInfo.weight" placeholder="Please enter your weight (kg)."
                        :min="10" :max="500" :step="0.2"></el-input-number>
                </el-form-item>
                <el-form-item label="Waist(cm)" prop="waist">
                    <el-input-number v-model.number="userInfo.waist" placeholder="Please enter your Waist (cm)."
                        :min="10" :max="500" :step="0.2"></el-input-number>
                </el-form-item>

                <el-form-item label="Hip(cm)" prop="hip">
                    <el-input-number v-model.number="userInfo.hip" placeholder="Please enter your Hip (cm)." :min="10"
                        :max="500" :step="0.2"></el-input-number>
                </el-form-item>

                <el-form-item label="Neck(cm)" prop="neck">
                    <el-input-number v-model.number="userInfo.neck" placeholder="Please enter your Neck (cm)." :min="10"
                        :max="500" :step="0.2"></el-input-number>
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
    margin-top: 20px;

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
import { useUserStore } from '@/stores/userStore'


const authStore = useAuthStore()
const userId = authStore.user.id

// 表单引用
const editFormRef = ref(null)
// const router = useRouter()

const userDataStore = useUserStore()

// 用户信息状态
const userInfo = ref({
    height: null,
    age: null,
    weight: null,
    gender: null,
    waist: null, //腰围
    hip: null, //臀围
    neck: null // 脖围
})

// 编辑状态
const isEditing = ref(false)

// 检查是否有缺失的信息
const hasMissingInfo = computed(() => {
    return !userInfo.value.height ||
        !userInfo.value.age ||
        !userInfo.value.weight ||
        !userInfo.value.gender || !userInfo.value.waist || !userInfo.value.hip || !userInfo.value.neck
})

// 格式化标签显示
const formatLabel = (key) => {
    const labels = {
        height: 'Height',
        age: 'Age',
        weight: 'Weight',
        gender: 'Gender',
        waist: 'Waist',
        hip: 'Hip',
        neck: 'Neck'
    }
    return labels[key] || key
}

// 格式化值显示
const formatValue = (key, value) => {
    if (value === null || value === undefined || value === '') {
        return 'Not set up'
    }

    // if (['Height', 'Weight'].includes(value)) {
    //     return `${value}cm`
    // }



    if (key == 'gender') {
        if (value === 1) {
            return 'Female'
        }

        if (value === 2) {
            return 'Male'
        }

    }

    if (['waist', 'height', 'hip', 'neck'].includes(key)) {
        return `${value} cm`
    }


    if (['weight'].includes(key)) {
        return `${value} kg`
    }

    return value
}

// 生命周期钩子：页面加载时获取用户信息
onMounted(() => {
    fetchUserInfo()
})

function userMapping(data1, data2) {
    data1.value.weight = data2.weight;
    data1.value.height = data2.height;
    data1.value.age = data2.age;
    data1.value.gender = data2.gender;
    data1.value.waist = data2.waist;
    data1.value.hip = data2.hip;
    data1.value.neck = data2.neck;
}

const fetchUserInfo = async () => {
    await userDataStore.fetchUserInfo(userId)
    userMapping(userInfo, userDataStore.userInfoStore)
    // console.log(userInfo)
}

// 模拟获取用户信息
// const fetchUserInfo = async () => {

//     try {

//         const { data, error } = await supabase
//             .from('user_info')
//             .select('*')
//             .eq('user_id', userId)
//             .single()

//         if (error) {
//             if (error.code === 'PGRST116') {
//                  // 记录不存在

//             } else {
//                 throw error
//             }
//         } else {
//              userInfo.value.height = data.height;
//              userInfo.value.age = data.age;
//              userInfo.value.gender = data.gender;
//              userInfo.value.weight = data.weight;
//         }
//     } catch (error) {
//         console.error('Failed to obtain user information', error)

//         ElMessage.error('Failed to obtain user information,Please try again later.')
//     }
// }

// 开始编辑
const startEditing = () => {
    // console.log(fetchUserInfo.data)
    //   console.log(userInfo);
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
    await userDataStore.upsetUserInfo(userInfo, userId)
    isLoading.value = false
    cancelEditing()
}



</script>
