<template>
  <div ref="chartRef" class="w-full h-full" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import * as echarts from 'echarts'

const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  autoResize: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['chart-ready'])

const chartRef = ref(null)
let chartInstance = null
let resizeObserver = null // 声明resizeObserver变量

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption(props.options)
  
  // 图表准备就绪后触发事件
  emit('chart-ready', chartInstance)
  
  // 监听窗口大小变化，自动调整图表
  if (props.autoResize) {
    resizeObserver = new ResizeObserver(() => {
      chartInstance?.resize()
    })
    resizeObserver.observe(chartRef.value)
  }
}

// 使用IntersectionObserver实现懒加载
const { stop } = useIntersectionObserver(
  chartRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      nextTick(() => {
        initChart()
      })
      stop()
    }
  },
  { threshold: 0.1 }
)

// 监听props变化，更新图表
watch(
  () => props.options,
  (newOptions) => {
    chartInstance?.setOption(newOptions)
  },
  { deep: true }
)

// 组件卸载时清理资源
onUnmounted(() => {
  // 停止懒加载监听
  stop()
  
  // 断开resizeObserver
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  
  // 销毁图表实例
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<style scoped>
div {
  min-height: 300px;
}
</style>