<template>
    <div id='dashbord' class="center-sm">
        <el-row class='one-row' :gutter="15">
            <el-col class="one-row-col" :xs="24" :sm="8" :md="8" :lg="6" :xl="6" :offset="2" >
                <!-- <el-card> -->
                <PersonalDetails />
                <TargetList/>
                <!-- </el-card> -->
            </el-col>
            <el-col class="one-row-col" :xs="24" :sm="12" :md="12" :lg="14" :xl="14">
                <el-card style="max-width: 100%" shadow="hover">
                    <!-- <template #header>xx</template> -->
                    <ECharts :options="chartOptions" />
                    <!-- <template #footer>xx</template> -->
                </el-card>
                <TargetDetails/>

            </el-col>
            <!-- <el-col :span="8" class="one-row-col"><el-card style="max-width: 100%"></el-card> </el-col> -->
        </el-row>

        <!-- <el-row class='two-row' :gutter="20">
            <el-col  class="one-row-col" :xs="24" :sm="8" :md="8" :lg="6" :xl="6" :offset="2" > </el-col>
            <el-col :span="12">4444 </el-col>
        </el-row> -->
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
    text-align: center;
}



.header {
    display: flex;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #ff6a00, #ee0979);
    color: white;
}

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
import ECharts from '@/components/ECharts.vue'
import { useAuthStore } from '@/stores/auth'
import PersonalDetails from '@/views/dashboard/PersonalDetails.vue'
import Target from '@/views/dashboard/Target.vue'
import TargetList from '@/views/dashboard/TargetList.vue'
import TargetDetails from '@/views/dashboard/TargetDetail.vue'

const authStore = useAuthStore()


const userId = authStore.user.id

const handleClick = () => {
    console.log(userId)


}



const bmi = 24.9;

const chartOptions = ref({
    series: [
        {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '75%'],
            radius: '100%',
            min: 0,
            max: 50,
            splitNumber: 5,
            axisLine: {
                lineStyle: {
                    width: 9,
                    color: [
                        [0.376, '#58D9F9',],
                        [0.5, '#7CFFB2'],
                        [0.6, '#FDDD60'],
                        [1, '#FF6E76']
                    ]
                }
            },
            pointer: {
                icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                length: '12%',
                width: 18,
                offsetCenter: [0, '-60%'],
                itemStyle: {
                    color: 'auto'
                }
            },
            axisTick: {
                length: 12,
                lineStyle: {
                    color: 'auto',
                    width: 2
                }
            },
            splitLine: {
                length: 20,
                lineStyle: {
                    color: 'auto',
                    width: 5
                }
            },
            axisLabel: {
                color: '#464646',
                fontSize: 15,
                distance: -60,
                rotate: 'tangential',
                formatter: function (value) {
                    if (value === 40) {
                        return 'Obese Class';
                    } else if (value === 30) {
                        return 'Overweight';
                    } else if (value === 20) {
                        return 'Normal';
                    }
                    else if (value === 10) {
                        return 'Thinness';
                    }

                    return value;
                }
            },
            title: {
                offsetCenter: [0, '-10%'],
                fontSize: 18
            },
            detail: {
                fontSize: 30,
                offsetCenter: [0, '-35%'],
                valueAnimation: true,
                formatter: function (value) {
                    return value;
                },
                color: 'inherit'
            },
            data: [
                {
                    value: bmi,
                    name: 'BMI'
                }
            ]
        }
    ]
})




</script>
