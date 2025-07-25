<template>
    <div id="dashboard-bmi-chart"> 
        <el-card :bordered="false" shadow="hover">
           <!-- <template #header>xx</template>  -->
            <ECharts :options="chartOptions" />
     
            <!-- <template #footer>BMI xxxx</template> -->
        </el-card>
    </div>

</template>

<script setup>
import { computed, ref } from 'vue'
import ECharts from '@/components/ECharts.vue'
import { useUserTargetStore } from '@/stores/userTargetStore'
const userTargetStore = useUserTargetStore();

const bmi =  computed(() => {

    // console.log( userTargetStore.targets.find(item => item.name === 'BMI'))
     
    return  userTargetStore.targets.find(item => item.name === 'BMI')?.tagValue || {};
    // return '';
     
});


// userTargetStore.targets.find(item => item.name === name) || {};

const chartOptions = ref({
    series: [
        {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '75%'],
            radius: '95%',
            min: 0,
            max: 50,
            splitNumber: 5,
            axisLine: {
                lineStyle: {
                    width: 9,
                    color: [
                        [0.376, '#1E90FF',],
                        [0.5, '#32CD32'],
                        [0.6, '#FFA500'],
                        [1, '#FF0000']
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
                fontSize: 10,
                distance: -60,
                rotate: 'tangential',
                formatter: function (value) {
                    if (value === 40) {
                        return 'Obesity';
                    } else if (value === 30) {
                        return 'Overweight';
                    } else if (value === 20) {
                        return 'Normal';
                    }
                    else if (value === 10) {
                        return 'Underweight';
                    }

                    return value;
                }
            },
            title: {
                offsetCenter: [0, '-10%'],
                fontSize: 20
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

<style scoped>
#dashboard-bmi-chart {
    margin-bottom: 35px;
}

</style>
