<template>
    <div id="div-add_weight">
        <el-card shadow="hover">

            <h2 class="form-title">Weight data entry</h2>
            <p class="form-subtitle">Please enter your current weight. You can also input your weight from the previous
                month as a supplement.</p>

            <el-form :model="formData">
                <el-form-item label="Data Range">
                    <el-date-picker v-model="formData.day" type="date" placeholder="Pick a day" size="default"
                        :disabled-date="disabledDate" value-format="YYYY-MM-DD" />
                </el-form-item>

                <el-form-item label="Weight(kg)">
                    <el-input-number v-model.number="formData.weight" :min="10" :max="500" :step="0.1" />
                </el-form-item>

                <el-form-item>
                    <el-button style="background-color:#f2125e;border-color:#f2125e; color:#fff;" @click="handleSubmit"
                        :disabled="isDisabled">
                        Submit
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
// 按需引入 Element Plus 组件（若全局引入可省略）
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { upsertUserWeight } from '@/services/userWeightService.js';
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/userStore'
import { round } from '@/utils/common'

const authStore = useAuthStore()
const userId = authStore.user.id
const userDataStore = useUserStore()

// 表单数据
const formData = reactive({
    user_id: userId,
    day: new Date().toISOString().split('T')[0],
    weight: null
})

const fetchUserInfo = async () => {
    const userInfo = await userDataStore.fetchUserInfo(userId)
    formData.weight = userInfo.weight
}

onMounted(async () => {
    await fetchUserInfo();

})

const disabledDate = (time) => {

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // 日期减30天
    thirtyDaysAgo.setHours(0, 0, 0, 0); // 重置为当天0点，忽略时刻

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); 

    return time.getTime() < thirtyDaysAgo.getTime() || time.getTime() >= tomorrow.getTime();
}

let lastClickTime = 0; // 上次点击时间戳
const isDisabled = ref(false); // 按钮禁用状态

const handleSubmit = async () => {
    const now = Date.now();
    // 检查是否在1秒内重复点击
    if (now - lastClickTime < 1000) {
        return; // 1秒内直接返回，不执行操作
    }

    lastClickTime = now;
    // 禁用按钮
    isDisabled.value = true;


    try {

        const result = await upsertUserWeight(formData);

        if (result.success) {
            ElMessage.success('save successfully');
            if (formData.day === new Date().toISOString().split('T')[0]) {
                await userDataStore.updateWeight(formData.weight, userId);
            }


        }
    } catch (error) {
        ElMessage.error(error.message || 'fail to save')
    } finally {
        // 1秒后自动启用按钮
        setTimeout(() => {
            isDisabled.value = false;
        }, 2000);
    }
}


</script>

<style scoped>

#div-add_weight {

    margin-bottom: 20px;
    position: relative;
    z-index: 0;
}

.form-title {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 8px;
}

.form-subtitle {
    font-size: 14px;
    color: #999;
    margin: 0 0 16px;
}
</style>