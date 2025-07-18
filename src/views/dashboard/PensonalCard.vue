<template>
    <div id="div-pensonal-card">
        <!-- <el-card shadow="hover"> -->
            <h3>Welcome to Health Cubes !</h3>
           
            <div class="class-data-card">

                <el-row :gutter="25">
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <DataCard title="Your Height is" value={{userInfo.value.age}}    cardColor="#7DA0FA" />
                    </el-col>

                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <DataCard title="Your Weight is" value="167 cm" cardColor="#7978E9" />
                    </el-col>

                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <DataCard title="Your Waist is" value="67 cm" cardColor="#4747A1" />
                    </el-col>

                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <DataCard title="Your Hip is" value="80 cm" cardColor="#F3797E" />
                    </el-col>

                </el-row>

            </div>
             <span> Here is your basic information. We will calculate your health indicators based on this information. You can click the button below to go to the information modification page. </span>
             <br>
             <div class="button">
             <el-button type="primary"   > <router-link to="/settings" active-class="current">
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

import { ref, onMounted} from 'vue'

const authStore = useAuthStore()
const userId = authStore.user.id
const userDataStore = useUserStore()

const userInfo = ref({})



const fetchUserInfo = async () => {
  userInfo.value =   await userDataStore.fetchUserInfo(userId)
  
    // console.log(userInfo)
}


onMounted(() => {
    fetchUserInfo();
    console.log(userInfo.age)
    console.log(userInfo.value)
    console.log(userInfo)

})
</script>
<style scoped>
#div-pensonal-card {
    margin-bottom: 35px;
}

#div-pensonal-card .button{
    margin-top: 10px;
    margin-left: 80%;
}

.class-data-card {
    /* height: 10px; */
    /* width: 160px; */
    margin-top: 35px;
    margin-bottom: 35px;

}
</style>