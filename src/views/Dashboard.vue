<template>
    <div id='dashbord' class="center-sm">
        <el-row class='one-row' :gutter="20">
            <el-col :span="6" class="one-row-col">
                <el-card >
                    <div class="header">
                        <div class="avatar">
                            <!-- 用红色矩形代替图片 -->
                            <div class="avatar-placeholder"></div>
                        </div>
                        <div class="info">
                            <h2 class="name">{{ name }}</h2>
                            <p class="title">{{ title }}</p>
                        </div>
                    </div>
                    <div class="content">
                        <div class="activity-item">
                            <el-icon :size="18"><clock-circle-outline /></el-icon>
                            <span class="label">{{ 'Recent Activities' }}</span>
                            <span class="count">{{ recentActivitiesCount }}</span>
                        </div>
                        <div class="activity-item">
                            <el-icon :size="18"><people-outline /></el-icon>
                            <span class="label">{{ 'Current Employees' }}</span>
                            <span class="count">{{ currentEmployeesCount }}</span>
                        </div>
                        <div class="activity-item">
                            <el-icon :size="18"><user-outline /></el-icon>
                            <span class="label">{{ 'Following' }}</span>
                            <span class="count">{{ followingCount }}</span>
                        </div>
                        <div class="activity-item">
                            <el-icon :size="18"><picture-outline /></el-icon>
                            <span class="label">{{ 'Pictures' }}</span>
                            <span class="count">{{ picturesCount }}</span>
                        </div>
                    </div>
                    <div >
                        <el-button type="primary" class="follow-button">FOLLOWS</el-button>
                        <el-button class="message-button">MESSAGE</el-button>
                    </div>
                </el-card > </el-col>
            <el-col :span="10" class="one-row-col">
                <el-card style="max-width: 100%">
                    <template #header>xx</template>
                    <ECharts :options="chartOptions" />
                    <template #footer>xx</template>
                </el-card>

            </el-col>
            <el-col :span="8" class="one-row-col"><el-card style="max-width: 100%"></el-card> </el-col>
        </el-row>

        <el-row class='two-row' :gutter="20">
            <el-col :span="12">3333 </el-col>
            <el-col :span="12">4444 </el-col>
        </el-row>
    </div>
</template>

<style scoped>
#dashbord {
    margin-top: 105px;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    /* width: 30%; */
    margin-left: 7%;
    margin-right: 7%
}

.el-col {
    /* background-color: #f0f2f5; */
    border-radius: 4px;
    padding: 10px;
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
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    background-color: red;
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
// import {
//   ClockCircle,
//   PeopleOutline,
//   UserOutline,
//   PictureOutline
// } from '@element-plus/icons-vue';
import ECharts from '@/components/ECharts.vue'
// 模拟数据
const name = ref('Josephin Villa');
const title = ref('Software Engineer');
const recentActivitiesCount = ref(480);
const currentEmployeesCount = ref(390);
const followingCount = ref(485);
const picturesCount = ref(506);

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
