<template>
  <div class="weight-trend-card">
    <el-card shadow="hover">
      <div class="weight-tag">
      </div>
      <div class="custom-tabs">
        <div v-for="tab in tabs" :key="tab.name"
          :class="['custom-tab', { 'custom-tab--active': activeTab === tab.name }]" @click="activeTab = tab.name">
          {{ tab.label }}
        </div>
      </div>
      <div class="chart-wrapper">
        <div ref="chartRef" class="chart"></div>
      </div>
      <div v-if="hasMissingInfo" class="missing-info-tip">
        <p class="form-subtitle">
          In the past <span class="span-size"> {{ extractNumberFromPeriod(activeTab) }} days </span>, you recorded your
          weight data for <span class="span-size">{{ weightData.days }} days.</span><br>
          Your weight change is <span :style="{ color: getNumberColor(weightData.weightChange), fontSize: '18px' }"> {{
            weightData.weightChange || 0 }} kg. </span> <br>
          <span :style="{ color: getNumberColor(weightData.weightChange), fontSize: '18px' }"> {{ textSpan(
            weightData.weightChange) }} </span>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { getUserWeightByDateRange } from '@/services/userWeightService.js';
import { getDateRange } from '@/utils/common'
import { useAuthStore } from '@/stores/auth'
import { processWeightData } from '@/utils/processWeightData'


const activeTab = ref('7d');
const tabs = [
  { name: '7d', label: 'Past 7 Days' },
  { name: '30d', label: 'Past 30 Days' },
  { name: '90d', label: 'Past 90 Days' },
  { name: '180d', label: 'Past 180 Days' }
];

const authStore = useAuthStore();
const userId = authStore.user.id;
const hasMissingInfo = ref(false);



// const spanInfo = ref('');

const weightData = ref([]);

let chartInstance = null;

const chartRef = ref(null);

const initChart = () => {
  if (chartRef.value && !chartInstance) {
    chartInstance = echarts.init(chartRef.value);

    chartInstance.setOption({
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: [] }]
    });
  }
};

const updateChart = (data) => {
  if (!chartInstance) return;


  const xAxisData = data.value.xAxisData
  const seriesData = data.value.seriesData

  chartInstance.setOption({
    xAxis: {
      boundaryGap: false,
      data: xAxisData,
      axisLine: { lineStyle: { color: '#ECECEC' } },
      axisTick: false,
      axisLabel: {
        color: '#999',
        rotate: 30, // 日期标签旋转，避免重叠
        formatter: (value) => value.split('-').slice(1).join('-') // 简化日期显示（如 07-08）
      },
      splitLine: {
        show: false // 设为 false 即可去掉虚线
      }
    },
    yAxis: {
      min: data.value.minWeight - 0.5,
      max: data.value.maxWeight + 1,
      // interval: 0.5,
      axisLine: false,
      axisTick: false,
      axisLabel: { color: '#999' },
      splitLine: {
        show: false,
        lineStyle: { color: '#ECECEC', type: 'dashed' }
      }
    },
    series: [{
      data: seriesData,
      smooth: true, // 平滑曲线
      areaStyle: { color: 'rgba(75, 92, 196, 0.1)' },
      lineStyle: { color: '#4B5CC4' }, // 深蓝色
      markPoint: {
        data: [
          {
            type: 'max', name: 'maxWeight', itemStyle: {
              color: '#FF0000' // 标记点颜色
            },
            // 可选：设置标签文字颜色
            // label: {
            //   color: 'red'
            // }
          },
          {
            type: 'min', name: 'minWeight', itemStyle: {
              color: '#32CD32' // 标记点颜色
            },
            // label: {
            //   color: 'green'
            // }
          },
        ],
      }
    }],
    // 关键配置：显示每个数据点的数值
    label: {
      show: true, // 强制显示标签
      position: 'top', // 标签位置（top/bottom/left/right）
      distance: 10, // 与点的距离
      fontSize: 12, // 字体大小
      color: '#cee0fa' // 字体颜色
    },
    // 优化：鼠标 hover 时高亮当前点
    emphasis: {
      label: {
        show: true,
        fontSize: 14,
        color: '#0c63e4' // 高亮颜色
      }
    },
    grid: { left: '40px', right: '15px', bottom: '30px', top: '10px' },
    // tooltip: { trigger: 'axis' }
  });
};

const extractNumberFromPeriod = (period) => {
  const match = period.match(/\d+/);
  return match ? Number(match[0]) : null;
};



watch(activeTab, async (newTab) => {

  try {
    const { startDate, endDate } = getDateRange(newTab);

    const data = await getUserWeightByDateRange(userId, startDate, endDate);


    //  console.log(data);

    weightData.value = processWeightData(data);
    updateChart(weightData);

    // if (weightData.value.days >= 5) {
    //   hasMissingInfo.value = true
    // }
    hasMissingInfo.value = weightData.value.days >= 3;

    // console.log(weightData.value.days);
  } catch (error) {
    console.error('watch error:', error);
     hasMissingInfo.value = false;
  }

}, { immediate: true });


onMounted(() => {
  // if (weightData.value.days >= 5) {
  //   hasMissingInfo.value = true
  // }
  // console.log(hasMissingInfo.value);
  initChart();
  window.addEventListener('resize', () => {
    chartInstance?.resize();
  });



});


onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
  window.removeEventListener('resize', () => { });
});


const textSpan = (data) => {
  if (data > 0) {
    return "Oh no, your weight has increased. Come on!"
  }
  if (data === 0) {
    return "There's no change in your weight. Keep up the good work!"
  }
  if (data < 0) {
    return "Your weight has decreased. That's great! Please keep it up!"
  }
}

const getNumberColor = (num) => {
  if (num > 0) {
    return '#FF0000'
  } else if (num < 0) {
    return ' #32CD32'
  } else {
    return 'gray'
  }
}


</script>

<style scoped>
.weight-trend-card {
  background: #fff;
  border-radius: 8px;
  /* padding: 24px; */
  /* box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); */
}

.stats-section {
  margin-bottom: 20px;
}

.stat-label {
  font-size: 16px;
  color: #999;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #6273e1;

}

.chart-wrapper {
  height: 300px;

}

.chart {
  width: 100%;
  height: 100%;
}

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
  /* margin-bottom: 20px; */
}

.custom-tab:hover {
  color: var(--el-color-primary);
}

.custom-tab--active {
  color: var(--el-color-primary);
  border-bottom-color: var(--el-color-primary);
}

.weight-tag {
  margin-top: 10px;
}

.missing-info-tip {
  margin-top: 20px;
  background-color: rgb(245, 245, 245);
  padding: 15px;
}

.form-subtitle {
  font-size: 16px;
  color: #999;
  margin: 0 0 16px;
}

.span-size {
  font-size: 18px;
  color: #5860fa;
}
</style>