<template>
  <div id="div-pensonal-card">
    <!-- <el-card shadow="hover"> -->
    <h3>Welcome to Health Cubes !</h3>

    <div class="class-data-card">

      <div v-if="height" class="grid grid-cols-2 gap-4">

        <el-row :gutter="15">
          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" style="margin-bottom: 10px;">
            <DataCard title=" Height " :value="height" valueUnit="cm" cardColor="#7DA0FA" />
          </el-col>

          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
            <DataCard title=" Weight " :value="weight" valueUnit="kg" cardColor="#7978E9" />
          </el-col>

          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
            <DataCard title=" Waist " :value="waist" valueUnit="cm" cardColor="#4747A1" />
          </el-col>

          <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
            <DataCard title=" Hip " :value="hip" valueUnit="cm" cardColor="#F3797E" />
          </el-col>


        </el-row>
      </div>
      <div v-else> Loading user data...</div>

    </div>
    <span> Here is your basic information. We will calculate your health indicators based on this information. You can
      click the button below to go to the information modification page. </span>
    <br>
    <div class="button">
      <el-button type="primary"> <router-link to="/settings" active-class="current">
          <span><el-icon>
              <Setting />
            </el-icon> Settings </span>
        </router-link></el-button>
    </div>



    <!-- </el-card> -->

  </div>


</template>
<script setup>
import DataCard from '@/components/DataCard.vue';
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/userStore'
import { ElMessageBox } from 'element-plus' // 引入ElMessageBox
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const userId = authStore.user.id
// const userId = computed(() => authStore.user.id);
const userDataStore = useUserStore()
const router = useRouter()

const userInfo = ref({})

const height = computed(() => {
  return userInfo.value?.height || 'N/A'; // 使用可选链和默认值
});

const weight = computed(() => {
  return userInfo.value?.weight || 'N/A'; // 使用可选链和默认值
});


const hip = computed(() => {
  return userInfo.value?.hip || 'N/A'; // 使用可选链和默认值
});


const waist = computed(() => {
  return userInfo.value?.waist || 'N/A'; // 使用可选链和默认值
});

const neck = computed(() => {
  return userInfo.value?.neck || 'N/A'; // 使用可选链和默认值
});

// 检查用户信息是否完整
const checkUserInfoComplete = () => {
  // 检查height, weight, hip, waist, neck是否都存在且有有效值
  // console.log(userInfo.value)

  return !!(userInfo.value?.height &&
    userInfo.value?.weight &&
    userInfo.value?.hip &&
    userInfo.value?.waist &&
    userInfo.value?.neck);
}

const fetchUserInfo = async () => {
  userInfo.value = await userDataStore.fetchUserInfo(userId)
}


onMounted(async () => {
  await fetchUserInfo();

  // 检查用户信息是否完整，如果不完整则显示提示
  if (!checkUserInfoComplete()) {
    ElMessageBox.alert(
      'Your health data is incomplete. Please complete your personal information first.',
      'Prompt for Information Completion',
      {
        confirmButtonText: 'Go to complete it',
        callback: (action) => {
          // 点击确认按钮后跳转到设置页面


          // 在ElMessageBox的callback中
          if (action === 'confirm') {
            // 使用router.push跳转到设置页面
            router.push('/settings')
          }
        }
      }
    );
  }
})
</script>
<style scoped>
#div-pensonal-card {
  margin-bottom: 35px;
}

#div-pensonal-card .button {
  margin-top: 10px;
  /* margin-left: 80%; */
}

.class-data-card {
  /* height: 10px; */
  /* width: 160px; */
  margin-top: 35px;
  margin-bottom: 15px;

}
</style>