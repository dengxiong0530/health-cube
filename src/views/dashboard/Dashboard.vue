<template>
    <div id='dashbord' class="center-sm">
        <el-row class='one-row' :gutter="55">
            <el-col class="one-row-col" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <BmiChart />
            </el-col>
            <el-col class="one-row-col" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                <PensonalCard/>
            </el-col>
            <!-- <el-col :span="8" class="one-row-col"><el-card style="max-width: 100%"></el-card> </el-col> -->
        </el-row>

        <el-row class='two-row' :gutter="55">
            <el-col class="one-row-col" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                

                <TargetList />
                <!-- <PersonalDetails /> -->

            </el-col>
            <el-col class="one-row-col" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">

                <TargetDetails />



            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
#dashbord {
    margin-top: 80px;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    margin-left: 7%;
    margin-right: 7%
}

.el-col {
    /* background-color: #f0f2f5; */
    /* border-radius: 4px; */
    /* padding: 10px; */
    /* text-align: center; */
}



/* .header {
    display: flex;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #ff6a00, #ee0979);
    color: white;
} */

.avatar {
    /* width: 80px; */
    /* height: 80px; */
    /* border-radius: 50%; */
    /* overflow: hidden; */
    /* margin-right: 20px; */
}

.avatar-placeholder {
    /* width: 100%;
    height: 100%;
    background-color: red; */
}

.info {
    flex: 1;
}

.name {
    margin: 0;
    font-size: 20px;
}

.title {
    margin-top: 5px;
    font-size: 14px;
    font-weight: normal;
}

.content {
    padding: 10px 20px;
}

.activity-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.label {
    flex: 1;
    margin-left: 10px;
}

.count {
    background-color: #409eff;
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
}

/* .footer {
    display: flex;
    justify-content: space-around;
    padding: 10px 20px;
} */

.follow-button {
    background-color: #ff6a00;
    border-color: #ff6a00;
}

.message-button {
    background-color: #409eff;
    border-color: #409eff;
}
</style>


<script setup>
import { ref } from 'vue'
// import ECharts from '@/components/ECharts.vue'
import { useAuthStore } from '@/stores/auth'
import PersonalDetails from '@/views/dashboard/PersonalDetails.vue'
import TargetList from '@/views/dashboard/TargetList.vue'
import TargetDetails from '@/views/dashboard/TargetDetail.vue'
import BmiChart from '@/views/dashboard/BmiChart.vue'
import PensonalCard from '@/views/dashboard/PensonalCard.vue'
const authStore = useAuthStore()


const userId = authStore.user.id







</script>
