<template>
  <div class="profile-container">

    <h2 class="section-title">About</h2>
      <p class="about-content">
        You can view and modify your personal information here, as well as change your password.
        <br>Please try to complete your information as fully as possible. It will help calculate the health indicators of your body.
      </p>


    <!-- 自定义标签栏，若不需要可删除，这里保留方便整体结构 -->
    <div class="custom-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="['custom-tab', { 'custom-tab--active': activeTab === tab.name }]"
        @click="activeTab = tab.name"
      >
        {{ tab.label }}
      </div>
    </div>

 

    <!-- 关于信息 -->
    <div class="about-section" v-if="activeTab === 'overview'">
 
      <div v-if="hasMissingInfo" class="missing-info-tip">
        <el-alert title="Please complete your personal information." type="warning" show-icon
                        effect="light" />
                </div>

      <h2 class="section-title">Profile</h2>
      <!-- 手动实现的表格区域 -->
      <div class="custom-table">
        <div 
          class="table-row" 

          v-for="(value, key) in userInfo" 
          :key="key" 
          
          
          >

          <div class="table-cell label-cell">{{ formatLabel(key) }}</div>
                    <div class="table-cell value-cell">{{ formatValue(key, value) }}</div>
          <!-- <div class="table-cell label-cell">{{ item.label }}</div>
          <div class="table-cell value-cell">{{ item.value }}</div> -->
        </div>
      </div>
    </div>
    
    <el-form v-if="activeTab === 'profile'" :model="userInfo" ref="editFormRef" label-width="100px" class="profile-form">
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

    <div class="tab-content" v-if="activeTab === 'password'">
      <!-- 引入 PasswordTab 组件 -->
      <PasswordTab />
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/userStore'
import PasswordTab from './PasswordTab.vue' // 引入密码修改组件

const authStore = useAuthStore()
const userId = authStore.user.id

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

const activeTab = ref('overview');
const tabs = [
  { name: 'overview', label: 'Overview' },
  { name: 'profile', label: 'Profile' },
  // { name: 'emails', label: 'Emails' },
  { name: 'password', label: 'Password' }
];

const editFormRef = ref(null)

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
    activeTab.value = 'overview';
}

</script>

<style scoped>
.profile-container {
  padding: 20px;
}
/* 标签栏样式，可根据需求调整或删除 */
.custom-tabs {
  display: flex;
  border-bottom: 1px solid var(--el-border-color);
  margin-bottom: 20px;
}
.custom-tab {
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 500;
  color: var(--el-text-color-secondary);
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}
.custom-tab:hover {
  color: var(--el-color-primary);
}
.custom-tab--active {
  color: var(--el-color-primary);
  border-bottom-color: var(--el-color-primary);
}
.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.about-content {
  line-height: 1.6;
  margin-bottom: 20px;
}
/* 自定义表格样式 */
.custom-table {
  width: 100%;
  border-collapse: collapse; /* 合并边框，让线条显示清晰 */
  border: 1px solid #fff; /* 表格外层边框，可根据需要调整 */
}
.table-row {
  display: flex;
  border-bottom: 2px solid #fff; /* 加大底部横线宽度，调整为2px */
}
.table-cell {
  flex: 1;
  padding: 8px 12px;
  background-color: #f5f7fa; /* 灰色格子背景，可根据需求微调色调 */
  border-right: 2px solid #fff; /* 添加竖线，宽度2px，颜色白色 */
}
/* 去掉最后一个单元格的右边框，避免与表格外层边框重复 */
.table-cell:last-child {
  border-right: none; 
}
.label-cell {
  font-weight: 500;
}
.tab-content {
  padding: 16px 0;
}
</style>